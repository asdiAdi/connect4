# syntax=docker/dockerfile:1

# base node
ARG NODE_VERSION=20
FROM node:${NODE_VERSION} AS nodebase
WORKDIR /usr/local/app

FROM nodebase AS frontend
# Copy the rest of the source files into the image.
COPY ./frontend ./

FROM frontend AS frontend-dev
RUN npm install
# change permission of cache to read, write, and executable by everyone
RUN mkdir node_modules/.cache && chown -R node:node ./
# Run the application as a non-root user.
USER node
CMD ["npm", "run", "dev"]

FROM frontend AS frontend-build
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into this layer
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# npm ci is clean install on package lock json for speed
# --omit=dev doesn't install dev dependencies
RUN --mount=type=bind,source=frontend/package.json,target=package.json \
    --mount=type=bind,source=frontend/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev \
RUN mkdir node_modules/.cache && chown -R node:node ./
USER node
CMD ["npm", "run", "build"]

FROM nodebase AS backend
COPY ./backend ./

FROM backend AS backend-dev
RUN npm install
RUN mkdir node_modules/.cache && chown -R node:node ./
USER node
CMD ["npm", "run", "dev"]

FROM backend AS backend-build
RUN --mount=type=bind,source=backend/package.json,target=package.json \
    --mount=type=bind,source=backend/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
RUN mkdir node_modules/.cache && chown -R node:node ./
USER node
CMD ["npm", "run", "build"]
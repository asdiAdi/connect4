# syntax=docker/dockerfile:1

# base node
ARG NODE_VERSION=22
FROM node:${NODE_VERSION} AS nodebase
WORKDIR /usr/local/app

FROM nodebase AS frontend
# Copy the rest of the source files into the image.
COPY ./frontend ./

FROM frontend AS frontend-dev
RUN npm install
# change permission of cache to read, write, and executable by everyone
# RUN mkdir node_modules/.cache && chown -R node:node ./
# Run the application as a non-root user.
USER node
CMD ["npm", "run", "dev"]


FROM nodebase AS backend
COPY ./backend ./

FROM backend AS backend-dev
RUN npm install
RUN #mkdir node_modules/.cache && chown -R node:node ./
USER node
CMD ["npm", "run", "dev"]

FROM node:22 AS frontend-build
WORKDIR /app
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

# Serve files
FROM nginx:latest AS nginx
COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]


FROM node:22 AS backend-build
WORKDIR /app
COPY ./backend ./
RUN npm install
RUN npm run build
CMD ["node", "./dist/index.js"]
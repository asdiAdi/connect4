import { request } from "src/utils/crud.ts";

const getRoom = () =>
  request<{ roomId: string }>({ method: "GET", url: "/create-room" });

export { getRoom };

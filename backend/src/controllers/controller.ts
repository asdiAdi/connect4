import { Request, Response } from "express";
import { hasRoomId } from "../utils/room";
import { Rooms } from "../types/global";

const rooms: Rooms = { tstR: [] };

const createRoom = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ text: "wahadfdfdfdhaha" });
    // let randomRoomId = randomString();
    // while (hasRoomId(randomRoomId)) {
    //   randomRoomId = randomString();
    // }
    // // rooms.push({ roomId: randomRoomId, users: [] });
    // // Object.assign(rooms, { [randomRoomId]: [] });
    // rooms[randomRoomId] = [];
    //
    // res.status(200).send({ roomId: randomRoomId });
  } catch (err) {
    console.log(err);
    res.status(500).send({ text: "Something went wrong" });
  }
};

const getRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!hasRoomId(roomId)) {
      res.status(404).send({ text: `No room with id ${roomId}` });
    }

    // connect to socket
    // const ids = await io.of
    res.send();
  } catch (err) {
    res.status(500).send({ text: "Something went wrong" });
  } finally {
    res.send();
  }
};

export { createRoom, getRoom, rooms };

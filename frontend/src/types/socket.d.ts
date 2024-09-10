// on
type ServerToClientEvents = {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  event: <T>(value: T) => void;
  error: () => void;
};

// emit
type ClientToServerEvents = {
  // hello: () => void;
  "join-room": (roomId: string) => void;
};

// store
type SocketStoreProps = {
  isConnected: boolean;
};
type SocketStore = SocketStoreProps & {
  setIsConnected: (connection: boolean) => void;
  connect: (roomId: string) => void;
  disconnect: () => void;
};

export {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketStoreProps,
  SocketStore,
};

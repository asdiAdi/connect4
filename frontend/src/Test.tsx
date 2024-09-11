import useSocketStore from "stores/useSocketStore.ts";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";
import { useGet } from "src/utils/crud.ts";

export default function Test() {
  const { connect, disconnect } = useSocketStore((state) => state);
  const { data, refetch } = useGet<string>(
    "user",
    "/create-room",
    {},
    {
      enabled: false,
    },
  );

  return (
    <SocketWrapper>
      <div style={{ width: "100vw", height: "100vh", background: "white" }}>
        <button onClick={() => {}}>create room</button>
        <button onClick={() => disconnect()}>connect test</button>
      </div>
    </SocketWrapper>
  );
}

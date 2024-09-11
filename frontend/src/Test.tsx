import useSocketStore from "stores/useSocketStore.ts";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "api/api.ts";

export default function Test() {
  const { connect, disconnect } = useSocketStore((state) => state);
  const { data, refetch } = useQuery({
    queryKey: ["room"],
    queryFn: getRoom,
    enabled: false,
  });

  return (
    <SocketWrapper>
      <div style={{ width: "100vw", height: "100vh", background: "white" }}>
        <button onClick={() => refetch()}>create room</button>
        <button onClick={() => disconnect()}>connect test</button>
      </div>
    </SocketWrapper>
  );
}

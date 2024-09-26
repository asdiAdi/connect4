import useSocketStore from "stores/useSocketStore.ts";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "api/api.ts";

export default function Test() {
  const { connect, disconnect, startGame, board, placeBoard } = useSocketStore(
    (state) => state,
  );
  const { data, refetch } = useQuery({
    queryKey: ["room"],
    queryFn: getRoom,
    enabled: false,
  });

  return (
    <SocketWrapper>
      <div style={{ width: "100vw", height: "100vh", background: "white" }}>
        {/*<button onClick={() => refetch()}>create room</button>*/}
        <div>
          <button onClick={() => connect()}>connect test</button>
          <button onClick={() => disconnect()}>disconnect test</button>
        </div>
        <div>
          <button onClick={() => startGame()}>start game</button>
        </div>

        <div style={{ marginTop: "50px", marginBottom: "10px" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => placeBoard(num)}>
              {num}
            </button>
          ))}
        </div>

        <div>
          {board
            .map((row, iRow) => (
              <div
                key={`row-${iRow}`}
                style={{
                  lineHeight: "0",
                }}
              >
                {row.map((cell, iCol) => (
                  <span
                    key={`row-${iRow}-col-${iCol}`}
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      border: "1px solid black",
                      backgroundColor:
                        cell === "p1"
                          ? "blue"
                          : cell === "p2"
                            ? "red"
                            : "white",
                    }}
                  />
                ))}
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </SocketWrapper>
  );
}

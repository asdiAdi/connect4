import useSocketStore from "stores/useSocketStore.ts";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "api/api.ts";
import { useEffect, useState } from "react";
import { generateBoard } from "src/utils/game.ts";

export default function Test() {
  const {
    isConnected,
    connect,
    disconnect,
    startGame,
    board,
    placeBoard,
    turnPlayer,
  } = useSocketStore((state) => state);

  const params = useParams();
  const { gameId = "" } = params;

  const { data } = useQuery({
    queryKey: ["history"],
    queryFn: async () => getHistory(gameId),
    enabled: true,
    staleTime: Infinity,
  });

  const [displayBoard, setDisplayBoard] = useState(board);

  useEffect(() => {
    if (data && data.board_history) {
      const { board_history } = data;
      setDisplayBoard(generateBoard(board_history));
    } else {
      setDisplayBoard(board);
    }
  }, [data, board]);

  return (
    <SocketWrapper>
      <div style={{ width: "100vw", height: "100vh", background: "white" }}>
        {/*<button onClick={() => refetch()}>create room</button>*/}
        <div>
          <button onClick={() => connect(gameId)}>connect test</button>
          <button onClick={() => disconnect()}>disconnect test</button>
        </div>
        <div>
          <button onClick={() => startGame(gameId, 30)}>start game</button>
        </div>

        <div style={{ marginTop: "50px", marginBottom: "10px" }}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <button
              key={num}
              onClick={() =>
                placeBoard(gameId, turnPlayer === "p1" ? num : num * -1)
              }
            >
              {num}
            </button>
          ))}
        </div>

        <div>
          {displayBoard
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
                        cell.value === "p1"
                          ? "blue"
                          : cell.value === "p2"
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

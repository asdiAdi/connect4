import ModalMenu from "components/Modals/ModalMenu.tsx";
import styles from "./styles.module.scss";

function GameRules() {
  return (
    <ModalMenu
      isOpen={true}
      toggle={() => void 0}
      className={styles["game-rules"]}
      dimBackGround={false}
      okButton={true}
    >
      <h2>Rules</h2>
      <h5>OBJECTIVE</h5>
      <p>
        Be the first player to connect 4 of the same colored discs in a row
        (either vertically, horizontally, or diagonally).
      </p>
      <h5>HOW TO PLAY</h5>
      <ol>
        <li>Red goes first in the first game.</li>
        <li>
          Players must alternate turns, and only one disc can be dropped in each
          turn.
        </li>
        <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
        <li>The starter of the previous game goes second on the next game.</li>
      </ol>
    </ModalMenu>
  );
}

export default GameRules;

import useModal from "components/Modals/useModal.ts";
import PauseModal from "components/Modals/PauseModal.tsx";
import BoardImage from "components/Images/BoardImage.tsx";
import styles from "./styles.module.scss";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import SimpleButton from "components/Buttons/SimpleButton.tsx";
import ScoreBoard from "views/game/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import { useState } from "react";

function Game() {
  const { isOpen, toggle } = useModal();
  const [pause, setPause] = useState<boolean>(false);

  return (
    <div className={styles["container"]}>
      <div className={styles["game"]}>
        <nav className={styles["game-nav"]}>
          <SimpleButton className={styles["game-nav-button"]} text="menu" />
          <LogoIcon className={styles["game-nav-logo"]} />
          <SimpleButton className={styles["game-nav-button"]} text="restart" />
        </nav>

        <ScoreBoard className={styles["game-score"]} />
        <BoardImage className={styles["game-board"]} />
        <PauseModal isOpen={isOpen} toggle={toggle} />
        <button onClick={() => setPause(!pause)}>hands up</button>
        <TimerCard pause={pause} maxCount={30} />
      </div>
    </div>
  );
}

export default Game;

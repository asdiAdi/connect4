import useModal from "components/Modals/useModal.ts";
import PauseModal from "components/Modals/PauseModal.tsx";
import BoardImage from "components/Images/BoardImage.tsx";
import styles from "./styles.module.scss";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import SimpleButton from "components/Buttons/SimpleButton.tsx";
import ScoreCard from "components/Cards/ScoreCard.tsx";

function Game() {
  const { isOpen, toggle } = useModal();

  return (
    <div className={styles["container"]}>
      <div className={styles["game"]}>
        <nav className={styles["game-nav"]}>
          <SimpleButton className={styles["game-nav-button"]} text="menu" />
          <LogoIcon className={styles["game-nav-logo"]} />
          <SimpleButton className={styles["game-nav-button"]} text="restart" />
        </nav>

        <div className={styles["game-score"]}></div>

        <BoardImage />
        <PauseModal isOpen={isOpen} toggle={toggle} />
      </div>
    </div>
  );
}

export default Game;

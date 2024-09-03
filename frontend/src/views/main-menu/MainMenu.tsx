import Button from "components/Buttons/Button.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import PvpIcon from "components/Icons/PvpIcon.tsx";
import PveIcon from "components/Icons/PveIcon.tsx";
import { redirect } from "react-router-dom";
import useGameStore from "src/stores/gameStore.ts";

import styles from "./styles.module.scss";

function MainMenu() {
  const setGameType = useGameStore((state) => state.setGameType);

  return (
    <div className={styles["main-menu"]}>
      <div className={styles["main-menu-box"]}>
        <div className={styles["main-menu-img"]}>
          <LogoIcon size="m" />
        </div>

        <Button
          text="play vs cpu"
          color="light-coral"
          icon={<PveIcon />}
          className={styles["main-menu-button"]}
          onClick={() => setGameType("pve")}
        />
        <Button
          text="play vs player"
          color="mustard-yellow"
          icon={<PvpIcon />}
          className={styles["main-menu-button"]}
          onClick={() => setGameType("pvp")}
        />
        <Button
          text="game rules"
          align="left"
          className={styles["main-menu-button"]}
          onClick={() => redirect("/game-rules")}
        />
      </div>
    </div>
  );
}

export default MainMenu;

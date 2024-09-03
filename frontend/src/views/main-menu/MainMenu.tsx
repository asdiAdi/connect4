import Button from "components/Buttons/Button.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import PvpIcon from "components/Icons/PvpIcon.tsx";
import PveIcon from "components/Icons/PveIcon.tsx";
import { useNavigate } from "react-router-dom";
import useGameStore from "src/stores/gameStore.ts";

import styles from "./styles.module.scss";

function MainMenu() {
  const setGameType = useGameStore((state) => state.setGameType);
  const navigate = useNavigate();

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
          onClick={() => {
            setGameType("pve");
            navigate("/game");
          }}
        />
        <Button
          text="play vs player"
          color="mustard-yellow"
          icon={<PvpIcon />}
          className={styles["main-menu-button"]}
          onClick={() => {
            setGameType("pvp");
            navigate("/game");
          }}
        />
        <Button
          text="game rules"
          align="left"
          className={styles["main-menu-button"]}
          onClick={() => navigate("/game-rules")}
        />
      </div>
    </div>
  );
}

export default MainMenu;

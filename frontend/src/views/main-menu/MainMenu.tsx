import Button from "components/Buttons/Button.tsx";
import styles from "./styles.module.scss";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import PvpIcon from "components/Icons/PvpIcon.tsx";
import PveIcon from "components/Icons/PveIcon.tsx";

function MainMenu() {
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
        />
        <Button
          text="play vs player"
          color="mustard-yellow"
          icon={<PvpIcon />}
          className={styles["main-menu-button"]}
        />
        <Button
          text="game rules"
          align="left"
          className={styles["main-menu-button"]}
        />
      </div>
    </div>
  );
}

export default MainMenu;

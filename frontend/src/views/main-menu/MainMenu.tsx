import Button from "components/Buttons/Button.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
// import PvpIcon from "components/Icons/PvpIcon.tsx";
// import PveIcon from "components/Icons/PveIcon.tsx";
import { useNavigate } from "react-router-dom";
import useGameStore from "stores/useGameStore.ts";
import OnlinePlayModal from "components/Modals/OnlinePlayModal.tsx";
import useModal from "components/Modals/useModal.ts";
import styles from "src/styles.module.scss";
import { postGame } from "api/api.ts";

function MainMenu() {
  const setGameType = useGameStore((state) => state.setGameType);

  const navigate = useNavigate();

  const { isOpen, toggle } = useModal();

  return (
    <div className={styles["main-menu"]}>
      <div className={styles["main-menu-box"]}>
        <div className={styles["main-menu-img"]}>
          <LogoIcon size="m" />
        </div>

        <Button
          text="local play"
          color="mustard-yellow"
          // icon={<PvpIcon />}
          className={styles["main-menu-button"]}
          onClick={() => {
            setGameType("pvp");
            navigate("/game");
          }}
        />
        <Button
          text="online play"
          color="mustard-yellow"
          // icon={<PvpIcon />}
          className={styles["main-menu-button"]}
          onClick={async () => {
            const { game_id } = await postGame();
            navigate(`/game/${game_id}`);
          }}
        />
        <Button
          text="play vs cpu"
          color="light-coral"
          // icon={<PveIcon />}
          className={styles["main-menu-button"]}
          onClick={() => {
            setGameType("pve");
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

      <OnlinePlayModal
        isOpen={isOpen}
        toggle={toggle}
        onCreateAccount={() => {
          // TODO: navigation to create user
        }}
        onPlayAsGuest={() => {
          // TODO: api for playing as guest
        }}
      />
    </div>
  );
}

export default MainMenu;

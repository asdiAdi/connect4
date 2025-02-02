import { useState } from "react";
import Button from "components/Buttons/Button.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import PvpIcon from "components/Icons/PvpIcon.tsx";
import PveIcon from "components/Icons/PveIcon.tsx";
import { useNavigate } from "react-router-dom";
import useGameStore from "stores/useGameStore.ts";
import styles from "./styles.module.scss";
import { postGame } from "api/api.ts";
import useAuthStore from "stores/useAuthStore.ts";
import InviteModal from "components/Modals/InviteModal.tsx";

function MainMenu() {
  const setGameType = useGameStore((state) => state.setGameType);
  const { username, logout } = useAuthStore();
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");

  return (
    <div className={styles["main-menu"]}>
      <div className={styles["main-menu__box"]}>
        <div className={styles["main-menu__img"]}>
          <LogoIcon size="m" />
        </div>

        <h2 className={styles["main-menu__title"]}>
          Welcome {username ?? "Guest"}
        </h2>

        {/*<Button*/}
        {/*  text="local play"*/}
        {/*  color="mustard-yellow"*/}
        {/*  icon={<PvpIcon />}*/}
        {/*  className={styles["main-menu__button"]}*/}
        {/*  onClick={() => {*/}
        {/*    setGameType("pvp");*/}
        {/*    navigate("/game");*/}
        {/*  }}*/}
        {/*/>*/}

        <Button
          text="invite player"
          color="mustard-yellow"
          icon={<PvpIcon />}
          className={styles["main-menu__button"]}
          onClick={async () => {
            const { game_id } = await postGame();
            setGameId(game_id);
          }}
          disabled={!username}
        />
        <Button
          text="online play"
          color="mustard-yellow"
          icon={<PvpIcon />}
          className={styles["main-menu__button"]}
          onClick={async () => {
            const { game_id } = await postGame();
            navigate(`/game/${game_id}`);
          }}
          disabled={true}
          tooltip="Coming soon!"
        />
        <Button
          text="play vs cpu"
          color="light-coral"
          icon={<PveIcon />}
          className={styles["main-menu__button"]}
          onClick={() => {
            setGameType("pve");
            navigate("/game");
          }}
        />
        <Button
          text="game rules"
          align="left"
          className={styles["main-menu__button"]}
          onClick={() => navigate("/game-rules")}
        />
        <Button
          text="logout"
          align="left"
          className={styles["main-menu__button"]}
          onClick={logout}
          disabled={true}
        />
      </div>

      <InviteModal isOpen={!!gameId} gameId={gameId} />
    </div>
  );
}

export default MainMenu;

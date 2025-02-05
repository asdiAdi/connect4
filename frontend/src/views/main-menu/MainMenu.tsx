import { useEffect, useState } from "react";
import Button from "components/Buttons/Button.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import PvpIcon from "components/Icons/PvpIcon.tsx";
// import PveIcon from "components/Icons/PveIcon.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import useGameStore from "stores/useGameStore.ts";
import styles from "./styles.module.scss";
import { postGame } from "api/api.ts";
import useAuthStore from "stores/useAuthStore.ts";
import InviteModal from "components/Modals/InviteModal.tsx";
import LoginModal from "components/Modals/LoginModal.tsx";
import { getCookie } from "src/utils/cookies.ts";
import RectangleBackground from "components/Background/RectangleBackground.tsx";

function MainMenu() {
  const setGameType = useGameStore((state) => state.setGameType);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(location.state === "openSignUp");
  const { isAuthenticated, verifyAuth, username, logout } = useAuthStore();
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      void verifyAuth(token);
    }
  }, [isAuthenticated, verifyAuth]);

  return (
    <div className={styles["main-menu"]}>
      <RectangleBackground fullscreen={true} />
      <div className={styles["main-menu__box"]}>
        <div className={styles["main-menu__img"]}>
          <LogoIcon size="m" />
        </div>

        <h2 className={styles["main-menu__title"]}>
          Welcome {username ?? "Guest"}
        </h2>

        <Button
          text="local play"
          color="mustard-yellow"
          icon={<PvpIcon />}
          className={styles["main-menu__button"]}
          onClick={() => {
            setGameType("pvp");
            navigate("/game");
          }}
        />

        {/*<Button*/}
        {/*  text="online play"*/}
        {/*  color="mustard-yellow"*/}
        {/*  icon={<PvpIcon />}*/}
        {/*  className={styles["main-menu__button"]}*/}
        {/*  onClick={async () => {*/}
        {/*    const { game_id } = await postGame();*/}
        {/*    navigate(`/game/${game_id}`);*/}
        {/*  }}*/}
        {/*  disabled={true}*/}
        {/*  tooltip="Coming soon!"*/}
        {/*/>*/}

        <Button
          text="invite player"
          color="mustard-yellow"
          icon={<PvpIcon />}
          className={styles["main-menu__button"]}
          onClick={async () => {
            if (isAuthenticated) {
              const { game_id } = await postGame();
              setGameId(game_id);
            } else {
              setIsOpen(true);
            }
          }}
        />

        {/*<Button*/}
        {/*  text="play vs cpu"*/}
        {/*  color="light-coral"*/}
        {/*  icon={<PveIcon />}*/}
        {/*  className={styles["main-menu__button"]}*/}
        {/*  onClick={() => {*/}
        {/*    setGameType("pve");*/}
        {/*    navigate("/game");*/}
        {/*  }}*/}
        {/*  disabled={true}*/}
        {/*  tooltip="Coming soon!"*/}
        {/*/>*/}

        <Button
          text="game rules"
          align="left"
          className={styles["main-menu__button"]}
          onClick={() => navigate("/game-rules")}
        />
        {isAuthenticated ? (
          <Button
            text="logout"
            align="left"
            color="light-coral"
            className={styles["main-menu__button"]}
            onClick={logout}
          />
        ) : (
          <Button
            text="login / register"
            align="left"
            color="mustard-yellow"
            className={styles["main-menu__button"]}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      <LoginModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <InviteModal
        isOpen={!!gameId}
        gameId={gameId}
        toggle={() => setGameId("")}
      />
    </div>
  );
}

export default MainMenu;

import Button from "components/Buttons/Button.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
// import PvpIcon from "components/Icons/PvpIcon.tsx";
// import PveIcon from "components/Icons/PveIcon.tsx";
import { useNavigate } from "react-router-dom";
import useGameStore from "stores/useGameStore.ts";
import styles from "src/styles.module.scss";
import { postGame } from "api/api.ts";
import useAuthStore from "stores/useAuthStore.ts";

function MainMenu() {
  const setGameType = useGameStore((state) => state.setGameType);
  const { username, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className={styles["main-menu"]}>
      <div className={styles["main-menu-box"]}>
        <div className={styles["main-menu-img"]}>
          <LogoIcon size="m" />
        </div>

        <h2>Welcome {username ?? "Guest"}</h2>

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
        <Button
          text="logout"
          className={styles["main-menu-button"]}
          onClick={logout}
        />
      </div>
    </div>
  );
}

export default MainMenu;

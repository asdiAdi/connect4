import SimpleButton from "components/Buttons/SimpleButton.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import useGameStore from "stores/useGameStore.ts";
import cx from "classnames";
import styles from "views/game/styles.module.scss";

type NavbarProps = {
  toggle: (val: boolean) => void;
  onRestart: () => void;
  className?: string;
};

function Navbar(props: NavbarProps) {
  const { toggle, onRestart, className = undefined } = props;

  const gameType = useGameStore((state) => state.gameType);
  const setPause = useGameStore((state) => state.setPause);

  return (
    <nav className={cx(styles["navbar"], className)}>
      <SimpleButton
        className={styles["navbar-button"]}
        text="menu"
        onClick={() => {
          toggle(true);
          if (gameType === "pve") {
            setPause(true);
          }
        }}
      />
      <LogoIcon className={styles["navbar-logo"]} />
      {gameType === "pve" ? (
        <SimpleButton
          className={styles["navbar-button"]}
          text="restart"
          onClick={onRestart}
        />
      ) : (
        <div className={styles["navbar-button"]} />
      )}
    </nav>
  );
}

export default Navbar;

import SimpleButton from "components/Buttons/SimpleButton.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import useGameStore from "stores/useGameStore.ts";
import cx from "classnames";
import styles from "./navbar.module.scss";

type NavbarProps = {
  toggle: (val: boolean) => void;
  onRestart: () => void;
  className?: string;
};

function Navbar(props: NavbarProps) {
  const { toggle, onRestart, className = undefined } = props;
  const setPause = useGameStore((state) => state.setPause);

  return (
    <nav className={cx(styles["navbar"], className)}>
      <SimpleButton
        className={styles["navbar__button"]}
        text="menu"
        onClick={() => {
          toggle(true);
          setPause(true);
        }}
      />

      <LogoIcon className={styles["navbar__logo"]} />
      <SimpleButton
        className={styles["navbar__button"]}
        text="restart"
        onClick={onRestart}
      />
    </nav>
  );
}

export default Navbar;

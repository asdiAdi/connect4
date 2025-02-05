import SimpleButton from "components/Buttons/SimpleButton.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import cx from "classnames";
import styles from "./navbar.module.scss";

type NavbarProps = {
  toggleLeft?: () => void;
  textLeft?: string;
  toggleRight?: () => void;
  textRight?: string;
  className?: string;
};

function Navbar(props: NavbarProps) {
  const {
    toggleLeft,
    textLeft,
    toggleRight,
    textRight,
    className = undefined,
  } = props;

  return (
    <nav className={cx(styles["navbar"], className)}>
      <span>
        {toggleLeft && (
          <SimpleButton
            className={styles["navbar__button"]}
            text={textLeft}
            onClick={toggleLeft}
          />
        )}

        {!toggleLeft && textLeft}
      </span>

      <LogoIcon className={styles["navbar__logo"]} />

      <span>
        {toggleRight && (
          <SimpleButton
            className={styles["navbar__button"]}
            text={textRight}
            onClick={toggleRight}
          />
        )}

        {!toggleRight && textRight}
      </span>
    </nav>
  );
}

export default Navbar;

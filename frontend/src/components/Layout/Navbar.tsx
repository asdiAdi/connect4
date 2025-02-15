import { useNavigate } from "react-router-dom";
import SimpleButton from "components/Buttons/SimpleButton.tsx";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import classNames from "classnames";
import styles from "./navbar.module.scss";

type NavbarProps = {
  onToggleLogo?: () => void;
  toggleLeft?: () => void;
  textLeft?: string;
  toggleRight?: () => void;
  textRight?: string;
  className?: string;
};

function Navbar(props: NavbarProps) {
  const navigate = useNavigate();
  const {
    onToggleLogo = () => navigate("/"),
    toggleLeft,
    textLeft,
    toggleRight,
    textRight,
    className,
  } = props;

  return (
    <nav className={classNames(styles["navbar"], className)}>
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

      <div onClick={onToggleLogo}>
        <LogoIcon className={styles["navbar__logo"]} />
      </div>

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

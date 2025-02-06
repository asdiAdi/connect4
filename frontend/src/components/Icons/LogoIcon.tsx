import classNames from "classnames";
import logo from "assets/logo.svg";
import { IconSize } from "types/game";
import styles from "./styles.module.scss";

type Props = { size?: IconSize; className?: string };

function LogoIcon(props: Props) {
  const { size = "s", className = undefined } = props;
  return (
    <img
      src={logo}
      alt="logo"
      className={classNames(styles[`logo-icon--${size}`], className)}
    />
  );
}

export default LogoIcon;

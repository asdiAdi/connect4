import logo from "assets/logo.svg";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = { size?: "s" | "m" | "l"; className?: string };

function LogoIcon(props: Props) {
  const { size = "s", className = undefined } = props;
  return (
    <img
      src={logo}
      alt="logo"
      className={cx(styles[`logo-icon-${size}`], className)}
    />
  );
}

export default LogoIcon;

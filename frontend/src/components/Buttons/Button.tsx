import styles from "./styles.module.scss";
import cx from "classnames";
import { ReactElement } from "react";

type Props = {
  text?: string;
  color?: "black" | "light-coral" | "mustard-yellow";
  align?: "left" | "center" | "right";
  icon?: ReactElement;
  className?: string;
};

function Button(props: Props) {
  const {
    text = "Quit Game",
    color = "black",
    align = "center",
    icon = undefined,
    className = undefined,
  } = props;

  return (
    <button
      className={cx(styles["button"], className, {
        [styles[`button-${color}`]]: !!color,
        [styles[`button-${align}`]]: !!align && !icon,
        [styles["button-icon"]]: !!icon,
      })}
    >
      {text?.toUpperCase()}
      {icon}
    </button>
  );
}

export default Button;

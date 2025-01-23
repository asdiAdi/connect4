import styles from "src/styles.module.scss";
import cx from "classnames";
import { ReactElement } from "react";

type Props = {
  text?: string;
  color?: "black" | "light-coral" | "mustard-yellow";
  align?: "left" | "center" | "right";
  icon?: ReactElement;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
  disabled?: boolean;
};

function Button(props: Props) {
  const {
    text = "Quit Local",
    color = "black",
    align = "center",
    icon = undefined,
    className = undefined,
    onClick = undefined,
    type = undefined,
    name = undefined,
    value = undefined,
    disabled = undefined,
  } = props;

  return (
    <button
      className={cx(styles["button"], className, {
        [styles[`button-${color}`]]: !!color,
        [styles[`button-${align}`]]: !!align && !icon,
        [styles["button-icon"]]: !!icon,
      })}
      onClick={onClick}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
    >
      {text?.toUpperCase()}
      {icon}
    </button>
  );
}

export default Button;

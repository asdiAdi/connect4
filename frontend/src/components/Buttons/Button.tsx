import { ReactElement } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { ColorName } from "types/game";

type Props = {
  text?: string;
  color?: ColorName;
  align?: "left" | "center" | "right";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  value?: string;
  icon?: ReactElement;
  className?: string;
  name?: string;
  tooltip?: string;
  disabled?: boolean;
};

function Button(props: Props) {
  const {
    text = "Quit Local",
    color = "black",
    align = "center",
    type,
    onClick,
    value,
    icon,
    className,
    name,
    tooltip,
    disabled,
  } = props;

  return (
    <button
      className={classNames(styles["button"], className, {
        [styles[`button--${color}`]]: !!color,
        [styles[`button--${align}`]]: !!align,
        [styles["button--icon"]]: !!icon,
        [styles["button--disabled"]]: disabled,
      })}
      onClick={onClick}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
    >
      {text}
      {icon}
      {tooltip && <div className={styles["button__tooltip"]}>{tooltip}</div>}
    </button>
  );
}

export default Button;

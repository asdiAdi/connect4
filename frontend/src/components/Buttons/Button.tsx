import styles from "./styles.module.scss";
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
  tooltip?: string;
};

function Button(props: Props) {
  const {
    text = "Quit Local",
    color = "black",
    align = "center",
    icon,
    className,
    onClick,
    type,
    name,
    value,
    disabled,
    tooltip,
  } = props;

  return (
    <button
      className={cx(styles["button"], className, {
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

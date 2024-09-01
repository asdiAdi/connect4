import check from "assets/icon-check.svg";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = { size?: "s" | "m" | "l"; className?: string };

function CheckIcon(props: Props) {
  const { size = "l", className = undefined } = props;
  return (
    <img
      src={check}
      alt="check-icon"
      className={cx(styles[`check-icon-${size}`], className)}
    />
  );
}

export default CheckIcon;

import check from "assets/icon-check.svg";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = {
  size?: "s" | "m" | "l";
  className?: string;
  onClick?: () => void;
};

function CheckIcon(props: Props) {
  const { size = "l", className = undefined, onClick } = props;
  return (
    <img
      src={check}
      alt="check-icon"
      className={cx(styles[`check-icon-${size}`], className)}
      onClick={onClick}
    />
  );
}

export default CheckIcon;

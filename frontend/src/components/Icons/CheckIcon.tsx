import classNames from "classnames";
import check from "assets/icon-check.svg";
import styles from "./styles.module.scss";

type Props = {
  size?: "s" | "m" | "l";
  className?: string;
  onClick?: () => void;
};

function CheckIcon(props: Props) {
  const { size = "l", className, onClick } = props;
  return (
    <img
      src={check}
      alt="check-icon"
      className={classNames(styles[`check-icon--${size}`], className)}
      onClick={onClick}
    />
  );
}

export default CheckIcon;

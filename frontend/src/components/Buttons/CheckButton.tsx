import { ReactElement } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import CheckIcon from "components/Icons/CheckIcon.tsx";

type Props = {
  icon?: ReactElement;
  className?: string;
  onClick?: () => void;
};

function CheckButton(props: Props) {
  const { icon = <CheckIcon />, className = undefined, onClick } = props;
  return (
    <button className={cx(styles["check-button"], className)} onClick={onClick}>
      {icon}
    </button>
  );
}

export default CheckButton;

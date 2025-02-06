import { ReactElement } from "react";
import classNames from "classnames";
import CheckIcon from "components/Icons/CheckIcon.tsx";
import styles from "./styles.module.scss";

type Props = {
  icon?: ReactElement;
  className?: string;
  onClick?: () => void;
};

function CheckButton(props: Props) {
  const { icon = <CheckIcon />, className = undefined, onClick } = props;
  return (
    <button
      className={classNames(styles["check-button"], className)}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default CheckButton;

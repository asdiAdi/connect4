import { ReactElement } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import CheckIcon from "components/Icons/CheckIcon.tsx";

type Props = {
  icon?: ReactElement;
  className?: string;
};

function CircleButton(props: Props) {
  const { icon = <CheckIcon />, className = undefined } = props;
  return (
    <button className={cx(styles["circle-button"], className)}>{icon}</button>
  );
}

export default CircleButton;

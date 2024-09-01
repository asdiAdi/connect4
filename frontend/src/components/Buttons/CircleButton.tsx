import { ReactElement } from "react";
import styles from "./styles.module.scss";

type Props = {
  icon?: ReactElement;
};

function ButtonCircle(props: Props) {
  const { icon = undefined } = props;
  return <button className={styles["button-circle"]}>{icon}</button>;
}

export default ButtonCircle;

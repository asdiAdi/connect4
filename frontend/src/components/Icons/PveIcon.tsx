import classNames from "classnames";
import pve from "assets/player-vs-cpu.svg";
import styles from "./styles.module.scss";
import { IconSize } from "types/game";

type Props = { size?: IconSize; className?: string };

function PveIcon(props: Props) {
  const { size = "m", className } = props;
  return (
    <img
      src={pve}
      alt="player-vs-cpu"
      className={classNames(styles[`pve-icon--${size}`], className)}
    />
  );
}

export default PveIcon;

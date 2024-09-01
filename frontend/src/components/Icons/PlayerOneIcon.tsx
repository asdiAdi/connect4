import pve from "assets/player-vs-cpu.svg";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = { size?: "s" | "m" | "l"; className?: string };

function PveIcon(props: Props) {
  const { size = "m", className = undefined } = props;
  return (
    <img
      src={pve}
      alt="player-vs-cpu"
      className={cx(styles[`pve-icon-${size}`], className)}
    />
  );
}

export default PveIcon;

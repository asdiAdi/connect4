import pvp from "assets/player-vs-player.svg";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = { size?: "s" | "m" | "l"; className?: string };

function PvpIcon(props: Props) {
  const { size = "m", className = undefined } = props;
  return (
    <img
      src={pvp}
      alt="player-vs-player"
      className={cx(styles[`pvp-icon-${size}`], className)}
    />
  );
}

export default PvpIcon;

import classNames from "classnames";
import pvp from "assets/player-vs-player.svg";
import styles from "./styles.module.scss";
import { IconSize } from "types/game";

type Props = { size?: IconSize; className?: string };

function PvpIcon(props: Props) {
  const { size = "m", className } = props;
  return (
    <img
      src={pvp}
      alt="player-vs-player"
      className={classNames(styles[`pvp-icon--${size}`], className)}
    />
  );
}

export default PvpIcon;

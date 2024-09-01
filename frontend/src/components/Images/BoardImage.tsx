import boardLayerWhiteSmall from "assets/board-layer-white-small.svg";
import boardLayerWhiteLarge from "assets/board-layer-white-large.svg";
import boardLayerBlackSmall from "assets/board-layer-black-small.svg";
import boardLayerBlackLarge from "assets/board-layer-black-large.svg";
import cx from "classnames";
import styles from "./styles.module.scss";

type Props = { className?: string };

function BoardImage(props: Props) {
  const { className = undefined } = props;
  return (
    <div className={cx(styles["board-image"], className)}>
      <img
        className={cx(styles["board-image-white"], styles["board-image-small"])}
        src={boardLayerWhiteSmall}
        alt="board-white-small-icon"
      />
      <img
        className={cx(styles["board-image-white"], styles["board-image-large"])}
        src={boardLayerWhiteLarge}
        alt="board-white-large-icon"
      />
      <img
        className={cx(styles["board-image-black"], styles["board-image-small"])}
        src={boardLayerBlackSmall}
        alt="board-black-small-icon"
      />
      <img
        className={cx(styles["board-image-black"], styles["board-image-large"])}
        src={boardLayerBlackLarge}
        alt="board-black-large-icon"
      />
    </div>
  );
}

export default BoardImage;

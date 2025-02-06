import { useEffect, useState } from "react";
import classNames from "classnames";
import boardLayerWhiteSmall from "assets/board-layer-white-small.svg";
import boardLayerWhiteLarge from "assets/board-layer-white-large.svg";
import boardLayerBlackSmall from "assets/board-layer-black-small.svg";
import boardLayerBlackLarge from "assets/board-layer-black-large.svg";
import styles from "./styles.module.scss";

type Props = { className?: string; onLoad?: () => void };

function BoardImage(props: Props) {
  const { className, onLoad } = props;

  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    if (loadCount >= 4 && onLoad) {
      onLoad();
    }
  }, [onLoad, loadCount]);

  return (
    <div className={classNames(styles["board-image"], className)}>
      <img
        className={classNames(
          styles["board-image--white"],
          styles["board-image--small"],
        )}
        src={boardLayerWhiteSmall}
        alt="board-white-small-icon"
        onLoad={() => setLoadCount((prev) => prev + 1)}
      />
      <img
        className={classNames(
          styles["board-image--white"],
          styles["board-image--large"],
        )}
        src={boardLayerWhiteLarge}
        alt="board-white-large-icon"
        onLoad={() => setLoadCount((prev) => prev + 1)}
      />
      <img
        className={classNames(
          styles["board-image--black"],
          styles["board-image--small"],
        )}
        src={boardLayerBlackSmall}
        alt="board-black-small-icon"
        onLoad={() => setLoadCount((prev) => prev + 1)}
      />
      <img
        className={classNames(
          styles["board-image--black"],
          styles["board-image--large"],
        )}
        src={boardLayerBlackLarge}
        alt="board-black-large-icon"
        onLoad={() => setLoadCount((prev) => prev + 1)}
      />
    </div>
  );
}

export default BoardImage;

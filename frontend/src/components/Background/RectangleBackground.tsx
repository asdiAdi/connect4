import classNames from "classnames";
import styles from "./styles.module.scss";
import { ColorName } from "types/game";

type RectangleBackgroundProps = {
  color?: ColorName;
  fullscreen?: boolean;
};

export default function RectangleBackground(props: RectangleBackgroundProps) {
  const { color = "indigo", fullscreen = false } = props;

  return (
    <div
      className={classNames(
        styles["rectangle"],
        styles[`rectangle--${color}`],
        { [styles["rectangle--fullscreen"]]: fullscreen },
      )}
    />
  );
}

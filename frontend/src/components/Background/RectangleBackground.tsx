import styles from "./styles.module.scss";
import classNames from "classnames";

type RectangleBackgroundProps = {
  color?: "indigo" | "light-coral" | "mustard-yellow";
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

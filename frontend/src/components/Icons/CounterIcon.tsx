import counterRedSmall from "assets/counter-red-small.svg";
import counterRedLarge from "assets/counter-red-large.svg";
import counterYellowSmall from "assets/counter-yellow-small.svg";
import counterYellowLarge from "assets/counter-yellow-large.svg";
import cx from "classnames";
import styles from "./styles.module.scss";

type Props = { color?: "red" | "yellow"; className?: string };

function CounterIcon(props: Props) {
  const { color = "red", className = undefined } = props;
  return (
    <div className={cx(styles["counter"], className)}>
      {color === "red" && (
        <>
          <img
            className={styles["counter-small"]}
            src={counterRedSmall}
            alt="counter red small"
          />
          <img
            className={styles["counter-large"]}
            src={counterRedLarge}
            alt="counter red large"
          />
        </>
      )}

      {color === "yellow" && (
        <>
          <img
            className={styles["counter-small"]}
            src={counterYellowSmall}
            alt="counter yellow small"
          />
          <img
            className={styles["counter-large"]}
            src={counterYellowLarge}
            alt="counter yellow large"
          />
        </>
      )}
    </div>
  );
}

export default CounterIcon;

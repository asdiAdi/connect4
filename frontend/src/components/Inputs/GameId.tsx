import styles from "./styles.module.scss";
import classNames from "classnames";

type GameIdProps = {
  value: string;
  className?: string;
};
function GameId(props: GameIdProps) {
  const { value, className } = props;

  return (
    <input
      type="text"
      value={value}
      readOnly
      className={classNames(styles["input"], className)}
    />
  );
}

export default GameId;

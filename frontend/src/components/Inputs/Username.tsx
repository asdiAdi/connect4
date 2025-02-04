import styles from "./styles.module.scss";
import classNames from "classnames";

type UsernameProps = {
  className?: string;
};

function Username(props: UsernameProps) {
  const { className } = props;
  return (
    <input
      type="text"
      placeholder="USERNAME"
      name="username"
      required
      className={classNames(styles["input"], className)}
    />
  );
}

export default Username;

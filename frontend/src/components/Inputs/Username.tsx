import classNames from "classnames";
import styles from "./styles.module.scss";

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
      maxLength={16}
      minLength={4}
    />
  );
}

export default Username;

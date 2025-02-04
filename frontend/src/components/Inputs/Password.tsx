import styles from "./styles.module.scss";
import classNames from "classnames";

type PasswordProps = {
  className?: string;
};

function Password(props: PasswordProps) {
  const { className } = props;

  return (
    <input
      type="password"
      placeholder="PASSWORD"
      name="password"
      required
      className={classNames(styles["input"], className)}
    />
  );
}

export default Password;

import classNames from "classnames";
import styles from "./styles.module.scss";

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
      maxLength={16}
      minLength={8}
    />
  );
}

export default Password;

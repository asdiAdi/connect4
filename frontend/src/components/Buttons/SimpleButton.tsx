import styles from "./styles.module.scss";
import cx from "classnames";

type Props = {
  text?: string;
  className?: string;
};

function SimpleButton(props: Props) {
  const { text = "menu", className = undefined } = props;
  return (
    <button className={cx(styles["simple-button"], className)}>
      {text?.toUpperCase()}
    </button>
  );
}

export default SimpleButton;

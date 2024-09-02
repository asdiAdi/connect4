import styles from "./styles.module.scss";
import cx from "classnames";

type Props = {
  text?: string;
  className?: string;
  onClick?: () => void;
};

function SimpleButton(props: Props) {
  const { text = "menu", className = undefined, onClick = undefined } = props;
  return (
    <button
      className={cx(styles["simple-button"], className)}
      onClick={onClick}
    >
      {text?.toUpperCase()}
    </button>
  );
}

export default SimpleButton;

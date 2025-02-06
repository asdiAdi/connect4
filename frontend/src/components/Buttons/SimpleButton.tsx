import styles from "./styles.module.scss";
import classNames from "classnames";

type Props = {
  text?: string;
  className?: string;
  onClick?: () => void;
};

function SimpleButton(props: Props) {
  const { text = "menu", className, onClick } = props;
  return (
    <button
      className={classNames(styles["simple-button"], className)}
      onClick={onClick}
    >
      {text?.toUpperCase()}
    </button>
  );
}

export default SimpleButton;

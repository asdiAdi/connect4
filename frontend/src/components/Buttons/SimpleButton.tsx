import styles from "./styles.module.scss";

type Props = {
  text?: string;
};

function ButtonSimple(props: Props) {
  const { text = "menu" } = props;
  return (
    <button className={styles["button-simple"]}>{text?.toUpperCase()}</button>
  );
}

export default ButtonSimple;

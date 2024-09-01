import ModalMenu from "components/Modals/ModalMenu.tsx";
import styles from "./styles.module.scss";
import Button from "components/Buttons/Button.tsx";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

function PauseModal(props: Props) {
  const { isOpen, toggle } = props;

  return (
    <ModalMenu
      isOpen={isOpen}
      toggle={toggle}
      className={styles["pause-modal"]}
    >
      <h2>Pause</h2>

      <Button className={styles["pause-modal-button"]} text="continue game" />
      <Button className={styles["pause-modal-button"]} text="restart" />
      <Button
        className={styles["pause-modal-button"]}
        text="quit game"
        color="light-coral"
      />
    </ModalMenu>
  );
}

export default PauseModal;

import ModalMenu from "components/Modals/ModalMenu.tsx";
import styles from "./styles.module.scss";
import Button from "components/Buttons/Button.tsx";

type Props = {
  isOpen: boolean;
  toggle: () => void;
  onContinue: () => void;
  onRestart: () => void;
  onQuit: () => void;
};

function PauseModal(props: Props) {
  const { isOpen, toggle, onContinue, onRestart, onQuit } = props;

  return (
    <ModalMenu
      isOpen={isOpen}
      toggle={toggle}
      className={styles["pause-modal"]}
    >
      <h2>Pause</h2>

      <Button
        className={styles["pause-modal-button"]}
        text="continue game"
        onClick={onContinue}
      />
      <Button
        className={styles["pause-modal-button"]}
        text="restart"
        onClick={onRestart}
      />
      <Button
        className={styles["pause-modal-button"]}
        text="quit game"
        color="light-coral"
        onClick={onQuit}
      />
    </ModalMenu>
  );
}

export default PauseModal;

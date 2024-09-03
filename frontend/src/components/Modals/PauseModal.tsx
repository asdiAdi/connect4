import ModalMenu from "components/Modals/ModalMenu.tsx";
import styles from "./styles.module.scss";
import Button from "components/Buttons/Button.tsx";

export type PropsPause = {
  isOpen: boolean;
  toggle: () => void;
  onQuit: () => void;
  onContinue?: () => void;
  onRestart?: () => void;
};

function PauseModal(props: PropsPause) {
  const {
    isOpen,
    toggle,
    onContinue = undefined,
    onRestart = undefined,
    onQuit,
  } = props;

  return (
    <ModalMenu
      isOpen={isOpen}
      toggle={toggle}
      className={styles["pause-modal"]}
    >
      <h2>Pause</h2>

      {onContinue && (
        <Button
          className={styles["pause-modal-button"]}
          text="continue game"
          onClick={onContinue}
        />
      )}

      {onRestart && (
        <Button
          className={styles["pause-modal-button"]}
          text="restart"
          onClick={onRestart}
        />
      )}

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

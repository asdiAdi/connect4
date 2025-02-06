import ModalMenu from "components/Modals/ModalMenu.tsx";
import Button from "components/Buttons/Button.tsx";
import styles from "./styles.module.scss";

export type PropsPause = {
  isOpen: boolean;
  toggle: () => void;
  onQuit: () => void;
  title?: string;
  description?: string;
  onContinue?: () => void;
  onRestart?: () => void;
};

function PauseModal(props: PropsPause) {
  const {
    isOpen,
    toggle,
    onQuit,
    title = "Pause",
    description,
    onContinue,
    onRestart,
  } = props;

  return (
    <ModalMenu
      isOpen={isOpen}
      toggle={toggle}
      className={styles["pause-modal"]}
    >
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}

      {onContinue && (
        <Button
          className={styles["pause-modal__button"]}
          text="continue game"
          onClick={onContinue}
        />
      )}

      {onRestart && (
        <Button
          className={styles["pause-modal__button"]}
          text="restart"
          onClick={onRestart}
        />
      )}

      <Button
        className={styles["pause-modal__button"]}
        text="quit game"
        color="light-coral"
        onClick={onQuit}
      />
    </ModalMenu>
  );
}

export default PauseModal;

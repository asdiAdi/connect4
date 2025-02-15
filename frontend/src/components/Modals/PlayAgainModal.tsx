import ModalMenu from "components/Modals/ModalMenu.tsx";
import styles from "./styles.module.scss";
import Button from "components/Buttons/Button.tsx";

export type PlayAgainModalProps = {
  isOpen: boolean;
  isWon: boolean;
  onContinue: () => void;
  onQuit: () => void;
};

function PlayAgainModal(props: PlayAgainModalProps) {
  const { isOpen, isWon, onContinue, onQuit } = props;

  return (
    <ModalMenu isOpen={isOpen} className={styles["play-again-modal"]}>
      <h2>{isWon ? "You Won!" : "Continue?"}</h2>
      {isWon && <h3>Waiting for other player...</h3>}

      {!isWon && (
        <Button
          className={styles["play-again-modal__button"]}
          text="Yes"
          color="mustard-yellow"
          onClick={onContinue}
        />
      )}

      {!isWon && (
        <Button
          className={styles["play-again-modal__button"]}
          text="No"
          color="light-coral"
          onClick={onQuit}
        />
      )}
    </ModalMenu>
  );
}

export default PlayAgainModal;

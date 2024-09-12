import ModalMenu from "./ModalMenu.tsx";
import Button from "components/Buttons/Button.tsx";
import styles from "./styles.module.scss";

export type OnlinePlay = {
  isOpen: boolean;
  toggle: () => void;
  onCreateAccount: () => void;
  onPlayAsGuest: () => void;
};

function OnlinePlayModal(props: OnlinePlay) {
  const { isOpen, toggle, onCreateAccount, onPlayAsGuest } = props;

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
        onClick={onCreateAccount}
      />

      <Button
        className={styles["pause-modal-button"]}
        text="restart"
        onClick={onPlayAsGuest}
      />
    </ModalMenu>
  );
}

export default OnlinePlayModal;

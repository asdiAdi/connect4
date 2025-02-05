import ModalMenu from "components/Modals/ModalMenu.tsx";
import Button from "components/Buttons/Button.tsx";
import styles from "./styles.module.scss";
import GameId from "components/Inputs/GameId.tsx";
import { useNavigate } from "react-router-dom";
import useAlertStore from "stores/useAlertStore.ts";

export type InviteModalProps = {
  isOpen: boolean;
  gameId: string;
  toggle?: () => void;
};

function InviteModal(props: InviteModalProps) {
  const { isOpen, gameId, toggle } = props;
  const navigate = useNavigate();
  const { setAlert } = useAlertStore();

  return (
    <ModalMenu
      isOpen={isOpen}
      toggle={toggle}
      className={styles["invite-modal"]}
    >
      <GameId
        value={`${window.location.href}game/${gameId}`}
        className={styles["invite-modal__button"]}
      />
      <Button
        type="button"
        className={styles["invite-modal__button"]}
        onClick={() => {
          void navigator.clipboard.writeText(
            `${window.location.href}game/${gameId}`,
          );

          setAlert("Copied!");
        }}
        text="Copy"
      />

      <Button
        onClick={() => {
          navigate(`game/${gameId}`);
        }}
        className={styles["invite-modal__button"]}
        text="Start Game"
      />
    </ModalMenu>
  );
}

export default InviteModal;

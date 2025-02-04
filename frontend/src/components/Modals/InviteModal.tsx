import ModalMenu from "components/Modals/ModalMenu.tsx";
import Button from "components/Buttons/Button.tsx";
import styles from "components/Background/styles.module.scss";
import GameId from "components/Inputs/GameId.tsx";
import { useNavigate } from "react-router-dom";

export type InviteModalProps = {
  isOpen: boolean;
  gameId: string;
};

function InviteModal(props: InviteModalProps) {
  const { isOpen, gameId } = props;
  const navigate = useNavigate();

  return (
    <ModalMenu isOpen={isOpen} className={styles["invite-modal"]}>
      <GameId value={`${window.location.href}game/${gameId}`} />
      <button
        type="button"
        onClick={() => {
          void navigator.clipboard.writeText(
            `${window.location.href}game/${gameId}`,
          );

          alert("Copied!");
        }}
      >
        Copy
      </button>
      <Button
        onClick={() => {
          navigate(`game/${gameId}`);
        }}
        className={styles["invite-modal-button"]}
        text="Start Game"
      />
    </ModalMenu>
  );
}

export default InviteModal;

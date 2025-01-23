import ModalMenu from "components/Modals/ModalMenu.tsx";
import styles from "src/styles.module.scss";
import { useNavigate } from "react-router-dom";

export type PlayAgainModalProps = {
  isOpen: boolean;
  onPlayAgain: () => void;
  checkedP1: boolean;
  checkedP2: boolean;
};

function PlayAgainModal(props: PlayAgainModalProps) {
  const { isOpen, onPlayAgain, checkedP1, checkedP2 } = props;
  const navigate = useNavigate();

  return (
    <ModalMenu isOpen={isOpen} className={styles["invite-modal"]}>
      <h3>Play Again</h3>

      <input type="checkbox" readOnly checked={checkedP1} />
      <input type="checkbox" readOnly checked={checkedP2} />

      <button type="button" onClick={onPlayAgain}>
        Yes
      </button>
      <button onClick={() => navigate("/")}>No</button>
    </ModalMenu>
  );
}

export default PlayAgainModal;

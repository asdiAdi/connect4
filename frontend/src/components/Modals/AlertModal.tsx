import ModalMenu from "components/Modals/ModalMenu.tsx";
import styles from "./styles.module.scss";
import useAlertStore from "stores/useAlertStore.ts";

function AlertModal() {
  const { close, isOpen, message } = useAlertStore();

  return (
    <ModalMenu
      isOpen={isOpen}
      toggle={close}
      className={styles["alert-modal"]}
      containerClassName={styles["alert-container"]}
      okButton
    >
      <h3>{message}</h3>
    </ModalMenu>
  );
}

export default AlertModal;

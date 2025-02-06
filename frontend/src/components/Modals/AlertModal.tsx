import ModalMenu from "components/Modals/ModalMenu.tsx";
import useAlertStore from "stores/useAlertStore.ts";
import styles from "./styles.module.scss";

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

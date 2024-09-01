import styles from "./styles.module.scss";
import { ReactElement } from "react";
import cx from "classnames";
import CheckIcon from "components/Icons/CheckIcon.tsx";

type Props = {
  isOpen: boolean;
  toggle: () => void;
  children?: ReactElement | ReactElement[];
  className?: string;
  dimBackGround?: boolean;
  okButton?: boolean;
  color?: "white" | "medium-purple";
};

function ModalMenu(props: Props) {
  const {
    children = undefined,
    isOpen = false,
    toggle,
    className = undefined,
    dimBackGround = true,
    okButton = false,
  } = props;

  if (!isOpen) return null;

  return (
    <div
      className={cx(styles["modal-menu"], {
        [styles["modal-menu--dim"]]: dimBackGround,
      })}
      onClick={toggle}
    >
      <div className={cx(styles["modal-menu-box"], className)}>
        {children}
        {okButton && <CheckIcon className={styles["modal-menu-ok-button"]} />}
      </div>
    </div>
  );
}

export default ModalMenu;

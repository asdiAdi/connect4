import styles from "./styles.module.scss";
import { ReactNode } from "react";
import cx from "classnames";
import CheckButton from "components/Buttons/CheckButton.tsx";

type Props = {
  isOpen: boolean;
  toggle?: () => void;
  children?: ReactNode;
  className?: string;
  dimBackGround?: boolean;
  scroll?: boolean;
  okButton?: boolean;
  color?: "white" | "medium-purple";
};

function ModalMenu(props: Props) {
  const {
    children = undefined,
    isOpen = false,
    toggle = () => {},
    className = undefined,
    dimBackGround = true,
    okButton = false,
    scroll = false,
    color = "medium-purple",
  } = props;

  if (!isOpen) return null;

  return (
    <div
      className={cx(styles["modal-menu"], {
        [styles["modal-menu--dim"]]: dimBackGround,
        [styles["modal-menu--scroll"]]: scroll,
      })}
      onClick={toggle}
    >
      <div
        className={cx(
          className,
          styles["modal-menu__box"],
          styles[`modal-menu__box--${color}`],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {okButton && (
          <CheckButton
            className={styles["modal-menu__ok-button"]}
            onClick={toggle}
          />
        )}
      </div>
    </div>
  );
}

export default ModalMenu;

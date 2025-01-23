import styles from "src/styles.module.scss";
import { ReactNode } from "react";
import cx from "classnames";
import CheckIcon from "components/Icons/CheckIcon.tsx";

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
      style={{
        border: "1px solid grey",
        width: "min-content",
        padding: ".5rem",
        backgroundColor: "#d1d1d1",
      }}
    >
      <div
        className={cx(
          styles["modal-menu-box"],
          styles[`modal-menu-box--${color}`],
          className,
        )}
      >
        {children}
        {okButton && (
          <CheckIcon
            className={styles["modal-menu-ok-button"]}
            onClick={toggle}
          />
        )}
      </div>
    </div>
  );
}

export default ModalMenu;

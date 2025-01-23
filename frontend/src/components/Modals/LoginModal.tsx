import ModalMenu from "components/Modals/ModalMenu.tsx";
import Button from "components/Buttons/Button.tsx";
import styles from "src/styles.module.scss";
import Username from "components/Inputs/Username.tsx";
import Password from "components/Inputs/Password.tsx";
import useAuthStore from "stores/useAuthStore.ts";

export type PropsLogin = {
  isOpen: boolean;
};

function LoginModal(props: PropsLogin) {
  const { isOpen } = props;

  const { login, register } = useAuthStore();

  return (
    <ModalMenu isOpen={isOpen} className={styles["login-modal"]}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const formData = new FormData(e.currentTarget);
            if (e.nativeEvent instanceof SubmitEvent) {
              const element = e.nativeEvent.submitter;

              if (element instanceof HTMLButtonElement) {
                const submitName = element.name;

                if (submitName === "login") {
                  await login(formData);
                } else if (submitName === "register") {
                  await register(formData);
                }
              }
            }
          } catch (error) {
            alert(error);
          }
        }}
      >
        <Username />
        <Password />

        <Button
          className={styles["login-modal-button"]}
          text="login"
          type="submit"
          name="login"
        />

        <Button
          className={styles["login-modal-button"]}
          text="register"
          type="submit"
          name="register"
        />
      </form>
    </ModalMenu>
  );
}

export default LoginModal;

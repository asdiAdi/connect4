import { create } from "zustand";
import { AuthState } from "types/auth.ts";
import { getUser, postLogin, postRegister } from "api/api.ts";
import { deleteCookie, setCookie } from "src/utils/cookies.ts";

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  token: null,

  register: async (formData: FormData) => {
    if (formData.has("username") && formData.has("password")) {
      const username = formData.get("username");
      const password = formData.get("password");

      if (typeof username === "string" && typeof password === "string") {
        const { token, message } = await postRegister(username, password);
        if (token) {
          setCookie("token", token, 30);
          set({
            isAuthenticated: true,
            username,
            token,
          });
        } else {
          throw new Error(message);
        }
      }
    }
  },

  login: async (formData: FormData) => {
    if (formData.has("username") && formData.has("password")) {
      const username = formData.get("username");
      const password = formData.get("password");

      if (typeof username === "string" && typeof password === "string") {
        const { token, message } = await postLogin(username, password);
        if (token) {
          setCookie("token", token, 30);
          set({
            isAuthenticated: true,
            username,
            token,
          });
        } else {
          throw new Error(message);
        }
      }
    }
  },

  verifyAuth: async () => {
    const { username } = await getUser();
    set({
      isAuthenticated: true,
      username,
    });
  },

  logout: async () => {
    deleteCookie("token");

    set({
      isAuthenticated: false,
      username: null,
      token: null,
    });
  },
}));

export default useAuthStore;

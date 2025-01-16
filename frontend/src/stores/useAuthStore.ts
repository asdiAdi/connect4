import { create } from "zustand";
import { AuthState } from "types/auth.ts";
import { postLogin, postRegister } from "api/api.ts";

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  token: null,

  register: async (formData: FormData) => {
    if (formData.has("username") && formData.has("password")) {
      const username = formData.get("username");
      const password = formData.get("password");

      if (typeof username === "string" && typeof password === "string") {
        const { token } = await postRegister(username, password);
        set({
          isAuthenticated: true,
          username,
          token,
        });
      }
    }
  },

  login: async (formData: FormData) => {
    if (formData.has("username") && formData.has("password")) {
      const username = formData.get("username");
      const password = formData.get("password");

      if (typeof username === "string" && typeof password === "string") {
        const { token } = await postLogin(username, password);
        set({
          isAuthenticated: true,
          username,
          token,
        });
      }
    }
  },

  logout: async () => {
    // delete token cookie
    set({
      isAuthenticated: false,
      username: null,
      token: null,
    });
  },

  verifyAuth: (token: string) => {
    set({
      isAuthenticated: true,
    });
  },
}));

export default useAuthStore;

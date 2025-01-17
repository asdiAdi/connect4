export type AuthState = {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  register: (data: FormData) => Promise<void>;
  login: (data: FormData) => Promise<void>;
  logout: () => Promise<void>;
  verifyAuth: (token: string) => Promise<void>;
};

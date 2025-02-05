import { create } from "zustand";

type AlertStore = {
  type: "success" | "danger" | "warning" | "info";
  message: string;
  isOpen: boolean;
  setAlert: (message: string, type?: AlertStore["type"]) => void;
  close: () => void;
};

const useAlertStore = create<AlertStore>((set) => ({
  type: "success",
  message: "",
  isOpen: false,
  setAlert: (message, type) => set({ type, message, isOpen: true }),
  close: () => set({ isOpen: false, message: "", type: "success" }),
}));

export default useAlertStore;

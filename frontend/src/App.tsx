import { RouterProvider } from "react-router-dom";
import router from "src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuthStore from "stores/useAuthStore.ts";
import { getCookie } from "src/utils/cookies.ts";
import AlertModal from "components/Modals/AlertModal.tsx";
import useAlertStore from "stores/useAlertStore.ts";

function App() {
  const queryClient = new QueryClient();

  const { verifyAuth } = useAuthStore();
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      void verifyAuth(token);
    }
  }, [verifyAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <AlertModal />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

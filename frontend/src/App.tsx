import { RouterProvider } from "react-router-dom";
import router from "src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuthStore from "stores/useAuthStore.ts";
import { getCookie } from "src/utils/cookies.ts";
import LoginModal from "components/Modals/LoginModal.tsx";

// TODO: Match History Page
// TODO: User Stats Page
// TODO: Rankings using tables
// TODO: more assets

// TODO: Local play logic
// TODO: VS CPU logic
// TODO: Unit Testing for logic
// TODO: animations

function App() {
  const queryClient = new QueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { register } = useAuthStore();

  useEffect(() => {
    const session = getCookie("session");
    if (session) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <LoginModal isOpen={isOpen} />
    </QueryClientProvider>
  );
}

export default App;

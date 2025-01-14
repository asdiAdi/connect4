import { RouterProvider } from "react-router-dom";
import router from "src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCookie } from "src/utils/cookies.ts";

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

  useEffect(() => {
    const name = getCookie("name");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <div>{/*modal for applying name*/}</div>
    </QueryClientProvider>
  );
}

export default App;

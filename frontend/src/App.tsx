import { RouterProvider } from "react-router-dom";
import router from "src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

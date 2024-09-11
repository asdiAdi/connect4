import { RouterProvider } from "react-router-dom";
import router from "src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  console.log(import.meta.env.VITE_PORT);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import router from "src/router";

function App() {
  console.log(import.meta.env.VITE_PORT);

  return <RouterProvider router={router} />;
}

export default App;

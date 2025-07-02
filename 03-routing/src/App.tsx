import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ErrorBoundary } from "./utils/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;

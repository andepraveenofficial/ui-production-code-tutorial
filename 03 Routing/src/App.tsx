import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* -----> Router <---- */
import router from "./routes";
import Loading from "./pages/Loading";
import { ErrorBoundary } from "./utils/ErrorBoundary";

/* -----> Loading Fallback <---- */
// const Loading = () => <div>Loading...</div>;

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/app">
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Routes>
            {router.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

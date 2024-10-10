// App.tsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Loading from "./pages/Loading";
import Header from "./layouts/Header";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/app">
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children?.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

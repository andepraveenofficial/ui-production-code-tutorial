import React from "react";
import SignupOld from "./components/SignupOld";
import Signup from "./components/Signup";

const App: React.FC = () => {
  return (
    <div>
      <h1>My App</h1>
      <SignupOld />
      <hr />
      <Signup />
    </div>
  );
};

export default App;

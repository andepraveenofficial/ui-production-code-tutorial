import React from "react";
import Card from "../components/Card";
import { ErrorBoundary } from "../utils/ErrorBoundary";

const About: React.FC = () => {
  return (
    <div>
      <h1>I am About Component</h1>
      <ErrorBoundary>
        <Card name="Ande Praveen" job="Software Engineer" />
      </ErrorBoundary>
    </div>
  );
};

export default About;

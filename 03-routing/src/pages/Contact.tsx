import React from "react";

const Contact: React.FC = () => {
  const numbers = [1, 2];
  const selectNumber = numbers[Math.floor(Math.random() * numbers.length)];
  if (selectNumber === 1) {
    throw new Error("Number is 1");
  }
  return <div>I am Contact Component</div>;
};

export default Contact; // Checking ErrorBoundary

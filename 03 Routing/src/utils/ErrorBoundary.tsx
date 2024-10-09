import React, { Component, ErrorInfo } from "react";
import ErrorPage from "../pages/ErrorPage"; // Custom error page component

interface ErrorBoundaryProps {
  children: React.ReactNode; // Type for children prop
}

interface ErrorBoundaryState {
  error: Error | null; // Type for error state
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Update state to indicate an error has occurred
    this.setState({ error });
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    // Optionally log the error to an error reporting service
  }

  render() {
    if (this.state.error) {
      // You can pass the error details to your ErrorPage if needed
      return <ErrorPage error={this.state.error} />;
    }
    return this.props.children; // Render children if no error
  }
}

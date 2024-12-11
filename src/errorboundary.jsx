import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';


function FallbackComponent({ error, resetErrorBoundary }) {



  return (
    <div role="alert">
      <h1>Something went wrong:</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
      {console.log(error)}
    </div>
    
  );
}

function BuggyComponent() {
  // Simulate a crash
  throw new Error("This is a test error! Please be patient \n while we rectify.");
}

function ErrorComponent() {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // Reset any state or perform any cleanup
        console.log("Resetting...");
        
      }}
    >
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default ErrorComponent;

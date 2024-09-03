import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  // const { statusText, message } = error as {
  //   [name: string]: string;
  // };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/*<p>*/}
      {/*  <i>{statusText || message}</i>*/}
      {/*</p>*/}
    </div>
  );
}

export default ErrorBoundary;

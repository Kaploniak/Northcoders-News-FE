import React from "react";
import error from "../images/error.png";
const ErrorPage = ({ text, err }) => {
  const {
    response: {
      data: { msg },
      status
    }
  } = err;
  if (err === undefined) {
    return (
      <div className="errorPage">
        <h1>{"Something went wrong..."}</h1>
        {!!err && <p>{err.message}</p>}
        <img src={error} alt={"error"} />
      </div>
    );
  } else {
    return (
      <div className="errorPage">
        <h1>{"Something went wrong..."}</h1>
        {err && <h2>Status: {status}</h2>}
        {err && <h2>{msg}</h2>}
        <img className="errorPic" src={error} alt={"error"} />
      </div>
    );
  }
};
export default ErrorPage;

import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = ({ text }) => {
  return (
    <>
      <div className="loading">
        <Spinner animation="border" variant="danger" />
        <h2>{text || "Loading..."}</h2>
      </div>
    </>
  );
};

export default Loading;

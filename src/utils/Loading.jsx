import React from "react";

const Loading = ({ text }) => {
  return (
    <>
      <div className="loading">
        <h2>{text || "Loading..."}</h2>
      </div>
    </>
  );
};

export default Loading;

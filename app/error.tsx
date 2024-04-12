"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  console.log(error);

  return (
    <>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
      <div>An unexpected error has occured</div>
    </>
  );
};

export default Error;

"use client";

import { useFormStatus } from "react-dom";

export const Spinner = () => {
  return (
    <>
      <style>
        {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
      </style>
      <div
        style={{
          animation: "spin 0.5s linear infinite",
          borderRadius: "50%",
          height: "1rem",
          width: "1rem",
          border: "2px solid #d1d5db",
          borderTopColor: "#4b5563",
        }}
      />
    </>
  );
};

export const SpinnerInForm = () => {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return <Spinner />;
};

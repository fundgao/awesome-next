"use client";

import { ReactNode, useState } from "react";

export const WithIncreaseFontSize = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState(10);

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <button onClick={() => setFontSize((prev) => prev + 1)}>
        Increase Font Size
      </button>
      {children}
    </div>
  );
};

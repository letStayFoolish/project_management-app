// components/Error.tsx
import React from "react";

interface ErrorProps extends React.HTMLProps<HTMLDivElement> {
  text?: string;
}

const Error: React.FC<ErrorProps> = ({
  text = "An error occurred while fetching data.",
}) => {
  return (
    <div
      {...props}
      className="flex items-center justify-center rounded border border-red-400 bg-red-100 p-4 text-red-700"
    >
      <span className="mr-2">🚫</span>
      <span>{text}</span>
    </div>
  );
};

export default Error;

import React from "react";

type Props = {
  name: string;
  buttonComponent?: React.ReactNode;
  isSmallText?: boolean;
};

const Header: React.FC<Props> = ({ name, buttonComponent, isSmallText }) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;

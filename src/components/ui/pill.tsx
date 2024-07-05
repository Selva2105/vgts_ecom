import React from "react";

interface Props {
  children: React.ReactNode;
  productCount?: number | string;
}

const PillWithNumber: React.FC<Props> = ({ children,productCount=0 }) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-gray-600 rounded-full flex items-center justify-center text-white text-[0.60rem] font-bold leading-[0.5rem]">
        {productCount}
      </div>
    </div>
  );
};

export default PillWithNumber;
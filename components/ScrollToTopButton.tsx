import React from "react";
import { RiArrowUpSLine } from "react-icons/ri";

interface Props {
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ScrollToTopButton({ handleClick }: Props) {
  return (
    <button
      className="fixed bottom-4 right-4 flex justify-center items-center w-16 h-16 bg-white border-gray-200 shadow rounded-md hover:bg-gray-50"
      onClick={handleClick}
    >
      <RiArrowUpSLine className="text-3xl" />
    </button>
  );
}

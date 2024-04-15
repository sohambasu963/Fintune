import React, { useState } from "react";

interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex items-center">
      <div
        className="flex items-center cursor-help"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <img src={"/images/info.svg"} alt="Info" className="h-5 w-5 mr-2" />
      </div>
      {show && (
        <div
          className="absolute p-3 text-sm text-white bg-black rounded-lg shadow-lg z-10"
          style={{
            top: "150%",
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: "200px",
            whiteSpace: "normal",
            lineHeight: "1.5",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

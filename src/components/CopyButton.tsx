import { Button } from "antd";
import { FC, useEffect, useState } from "react";
import IconContentCopy from "./icons/IconContentCopy";
import IconCheck from "./icons/IconCheck";

interface CopyButtonProps {
  reportText: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ reportText }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleClick = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
  };

  return (
    <Button
      type="text"
      onClick={handleClick}
      className="text-gray-400 rounded ml-auto hover:bg-zinc-900 hover:text-gray-400 relative disabled:opacity-[0.65] disabled:hover:bg-transparent"
      disabled={reportText.trim() === ""}
    >
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <IconContentCopy />
      </span>
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <IconCheck />
      </span>
    </Button>
  );
};

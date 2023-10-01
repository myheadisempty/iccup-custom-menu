import { useState, useEffect, FC } from "react";
import { CopyButton } from "./CopyButton";

interface ReportTextAreaProps {
  reportText: string;
}

export const ReportTextArea: FC<ReportTextAreaProps> = ({ reportText }) => {
  const [updatedReportText, setUpdatedReportText] = useState(reportText);

  useEffect(() => setUpdatedReportText(reportText), [reportText]);

  return (
    <div className="flex flex-col my-auto">
      <div className="mb-4 border max-w-[800px] border-zinc-700 rounded-md bg-black">
        <div className="flex px-3 py-2 border-b dark:border-zinc-700">
          <CopyButton reportText={updatedReportText} />
        </div>
        <div className="px-4 py-2 rounded-b-md bg-[#0a0a0a]">
          <textarea
            readOnly
            cols={100}
            rows={20}
            value={updatedReportText}
            className="w-full resize-none px-0 text-sm text-white border-0 bg-[#0a0a0a] outline-0"
          />
        </div>
      </div>
    </div>
  );
};

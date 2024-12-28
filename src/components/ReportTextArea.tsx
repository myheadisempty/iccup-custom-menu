import { useState, useEffect } from "react";
import { CopyButton } from "./CopyButton";
import { useTournamentData } from "@/utils/context/TournamentContext";
import { generateReportText } from "@/utils/helpers/generateReportText";

export const ReportTextArea = () => {
  const [reportText, setReportText] = useState("");

  const { tournamentResults } = useTournamentData();

  useEffect(() => {
    if (tournamentResults) {
      setReportText(generateReportText(tournamentResults));
    }
  }, [tournamentResults]);

  return (
    <div className="mt-5">
      <div className="mb-4 border max-w-[800px] border-zinc-700 rounded-md bg-black">
        <div className="flex px-3 py-2 border-b dark:border-zinc-700">
          <CopyButton reportText={reportText} />
        </div>
        <div className="px-4 py-2 rounded-b-md bg-[#0a0a0a]">
          <textarea
            readOnly
            cols={100}
            rows={20}
            value={reportText}
            className="w-full resize-none text-sm text-white bg-[#0a0a0a] outline-0"
          />
        </div>
      </div>
    </div>
  );
};

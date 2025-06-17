import { useState, useEffect } from "react";
import { CopyButton } from "./CopyButton";
import { generateCustomTourReportText } from "@/utils/helpers/generateCustomTourReportText";
import { generateDotaTourReportText } from "@/utils/helpers/generateDotaTourReportText";
import useTournamentStore from "@/store/tournamentStore";
import useRoleStore from "@/store/roleStore";
import { DotaTournamentResults } from "@/utils/types";

export const ReportTextArea = () => {
  const [reportText, setReportText] = useState("");

  const { tournamentResults } = useTournamentStore();

  const { role } = useRoleStore();

  useEffect(() => {
    if (tournamentResults) {
      if (role === "custom") {
        setReportText(generateCustomTourReportText(tournamentResults));
      } else if (role === "dota") {
        setReportText(
          generateDotaTourReportText(tournamentResults as DotaTournamentResults)
        );
      }
    } else {
      setReportText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentResults]);

  return (
    <div>
      <div className="border max-w-full border-zinc-700 rounded-md bg-black">
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

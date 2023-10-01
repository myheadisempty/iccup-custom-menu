import { FC, useEffect, useState } from "react";
import { TournamentResults } from "@/utils/types";
import { Switch } from "antd";

interface OptionsMenuProps {
  tournamentResults: TournamentResults;
  onResultsChange: (tournamentResults: TournamentResults) => void;
  isModalOpen: boolean;
}

export const OptionsMenu: FC<OptionsMenuProps> = ({
  tournamentResults,
  onResultsChange,
  isModalOpen,
}) => {
  const [awardsApplied, setAwardsApplied] = useState(false);
  const [originalAwards, setOriginalAwards] = useState<number[]>([]);

  useEffect(() => {
    if (isModalOpen) {
      setAwardsApplied(false);
    }
  }, [isModalOpen]);

  const onChange = (checked: boolean) => {
    if (tournamentResults.awards !== undefined) {
      setOriginalAwards(tournamentResults.awards);

      if (checked && !awardsApplied) {
        const updatedAwards = tournamentResults.awards.map(
          (num, index) => num + [30, 20, 10][index]
        );

        const updatedResults: TournamentResults = {
          ...tournamentResults,
          awards: updatedAwards,
        };

        onResultsChange(updatedResults);
        setAwardsApplied(true);
      } else if (!checked && awardsApplied) {
        const updatedResults: TournamentResults = {
          ...tournamentResults,
          awards: originalAwards,
        };

        onResultsChange(updatedResults);
        setAwardsApplied(false);
      }
    }
  };

  return (
    <div className="flex flex-col pt-5 mb-5">
      <div className="space-y-5">
        <div className="flex justify-between">
          <label className="text-gray-300 mr-4">Повышенные капсы</label>
          <Switch
            onChange={onChange}
            checked={awardsApplied}
            disabled={tournamentResults === undefined}
          />
        </div>
      </div>
    </div>
  );
};

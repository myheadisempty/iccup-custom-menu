import { FC, useContext, useEffect, useState } from "react";
import { Switch } from "antd";
import { TournamentResultsContext } from "@/utils/context/TournamentResultsContext";

interface OptionsMenuProps {
  isModalOpen: boolean;
}

export const OptionsMenu: FC<OptionsMenuProps> = ({ isModalOpen }) => {
  const [awardsApplied, setAwardsApplied] = useState(false);
  const [originalAwards, setOriginalAwards] = useState<number[]>([]);

  const { tournamentResults, updateTournamentResults } = useContext(
    TournamentResultsContext
  );

  useEffect(() => {
    if (isModalOpen) {
      setAwardsApplied(false);
    }
  }, [isModalOpen]);

  const onChange = (checked: boolean) => {
    if (tournamentResults!.awards !== undefined) {
      setOriginalAwards(tournamentResults!.awards);

      if (checked && !awardsApplied) {
        const updatedAwards = tournamentResults!.awards.map(
          (num, index) => num + [30, 20, 10][index]
        );

        const updatedResults = {
          ...tournamentResults!,
          awards: updatedAwards,
        };

        updateTournamentResults(updatedResults);
        setAwardsApplied(true);
      } else if (!checked && awardsApplied) {
        const updatedResults = {
          ...tournamentResults!,
          awards: originalAwards,
        };

        updateTournamentResults(updatedResults);
        setAwardsApplied(false);
      }
    }
  };

  return (
    <div className="pt-5 mb-5">
      <div className="flex justify-between">
        <label className="text-gray-300 mr-4">Повышенные капсы</label>
        <Switch
          onChange={onChange}
          checked={awardsApplied}
          disabled={tournamentResults === undefined}
        />
      </div>
    </div>
  );
};

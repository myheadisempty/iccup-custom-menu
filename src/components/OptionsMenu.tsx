import { useEffect, useRef, useState } from "react";
import { Switch } from "antd";
import { useTournamentData } from "@/utils/context/TournamentContext";
import { TournamentResults } from "@/utils/types";

const AWARD_BOOSTS = [30, 20, 10] as const;

export const OptionsMenu = () => {
  const [isBoostedAwardsActive, setIsBoostedAwardsActive] = useState(false);
  const [baseAwards, setBaseAwards] = useState<number[] | null>(null);
  const previousResultsRef = useRef<TournamentResults | null>(null);

  const { tournamentResults, setTournamentResults } = useTournamentData();

  const haveResultsChanged = (
    prev: TournamentResults,
    current: TournamentResults
  ) => {
    return (
      prev.id !== current.id ||
      prev.participantStats.technicalLosses !==
        current.participantStats.technicalLosses ||
      prev.winners.thirdPlace.join() !== current.winners.thirdPlace.join()
    );
  };

  const getBoostedAwards = (baseAwards: number[]) =>
    baseAwards.map((num, index) => num + AWARD_BOOSTS[index]);

  const areAwardsMatchingState = (
    currentAwards: number[],
    baseAwards: number[],
    isBoostActive: boolean
  ) => {
    const expectedAwards = isBoostActive
      ? getBoostedAwards(baseAwards)
      : baseAwards;
    return JSON.stringify(currentAwards) === JSON.stringify(expectedAwards);
  };

  const resetState = () => {
    setIsBoostedAwardsActive(false);
    setBaseAwards(null);
  };

  useEffect(() => {
    if (!tournamentResults || !previousResultsRef.current) {
      previousResultsRef.current = tournamentResults;
      return;
    }

    const prevResults = previousResultsRef.current;

    if (haveResultsChanged(prevResults, tournamentResults)) {
      resetState();
    } else if (isBoostedAwardsActive && baseAwards) {
      const awardsMatch = areAwardsMatchingState(
        tournamentResults.awards,
        baseAwards,
        true
      );

      if (!awardsMatch) {
        resetState();
      }
    }

    previousResultsRef.current = tournamentResults;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentResults, baseAwards, isBoostedAwardsActive]);

  const handleSwitchChange = () => {
    if (!tournamentResults) return;

    if (!isBoostedAwardsActive) {
      const currentAwards = tournamentResults.awards;
      setBaseAwards(currentAwards);
      setTournamentResults({
        ...tournamentResults,
        awards: getBoostedAwards(currentAwards),
      });
      setIsBoostedAwardsActive(true);
    } else if (isBoostedAwardsActive && baseAwards) {
      setTournamentResults({
        ...tournamentResults,
        awards: baseAwards,
      });
      setIsBoostedAwardsActive(false);
    }
  };

  return (
    <div className="pt-5 mb-5">
      <div className="flex justify-between">
        <label className="text-gray-300 mr-4">Повышенные капсы</label>
        <Switch
          onChange={handleSwitchChange}
          checked={isBoostedAwardsActive}
          disabled={!tournamentResults}
        />
      </div>
    </div>
  );
};

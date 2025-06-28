import { FC, useEffect, useRef, useState } from "react";
import { Button, Divider, Switch } from "antd";
import {
  CustomTournamentResults,
  DotaTournamentResults,
  TournamentResultsUnion,
} from "@/utils/types";
import useTournamentStore from "@/store/tournamentStore";
import useRoleStore from "@/store/roleStore";
import useOutsideClick from "@/utils/hooks/useOutsideClick";

const AWARD_BOOSTS = [30, 20, 10] as const;

interface OptionsMenuProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (state: boolean) => void;
}

export const OptionsMenu: FC<OptionsMenuProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [isBoostedAwardsActive, setIsBoostedAwardsActive] = useState(false);
  const [baseAwards, setBaseAwards] = useState<number[] | null>(null);
  const previousResultsRef = useRef<TournamentResultsUnion | null>(null);
  const { role, toggleRole } = useRoleStore();

  const { tournamentResults, setTournamentResults } = useTournamentStore();

  const sidebarRef = useOutsideClick(() => setIsSidebarOpen(false));

  const haveResultsChanged = (
    prev: TournamentResultsUnion,
    current: TournamentResultsUnion
  ) => {
    return (
      prev.id !== current.id ||
      prev.participantStats.technicalLosses !==
        current.participantStats.technicalLosses ||
      prev.winners.thirdPlace.join() !== current.winners.thirdPlace.join()
    );
  };

  const extractCups = (
    awards: CustomTournamentResults["awards"] | DotaTournamentResults["awards"]
  ) => awards.map((award) => award.cups);

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
      const currentAwards = extractCups(tournamentResults.awards);
      const awardsMatch = areAwardsMatchingState(
        currentAwards,
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

    const currentAwards = extractCups(tournamentResults.awards);

    if (!isBoostedAwardsActive) {
      const boostedAwards = getBoostedAwards(currentAwards).map((cups) => ({
        cups,
      }));

      setBaseAwards(currentAwards);
      setTournamentResults({
        ...tournamentResults,
        awards: boostedAwards,
      });
      setIsBoostedAwardsActive(true);
    } else if (isBoostedAwardsActive && baseAwards) {
      const restoredAwards = baseAwards.map((cups) => ({
        cups,
      }));

      setTournamentResults({
        ...tournamentResults,
        awards: restoredAwards,
      });
      setIsBoostedAwardsActive(false);
    }
  };

  const handleClick = () => {
    toggleRole();
    resetState();
    setIsSidebarOpen(false);
    setTournamentResults(null);
  };

  return (
    <aside
      className={`sidebar${isSidebarOpen ? " open" : ""}`}
      ref={sidebarRef}
    >
      <div className="flex pt-6 justify-between">
        <label className="text-gray-300">Повышенные капсы</label>
        <Switch
          onChange={handleSwitchChange}
          checked={isBoostedAwardsActive}
          disabled={!tournamentResults || role === "dota"}
        />
      </div>
      <Divider className="mt-3 mb-5" />
      <Button onClick={handleClick} className="w-full">{`Переключиться на ${
        role === "custom" ? "DotA" : "Custom"
      } секцию`}</Button>
    </aside>
  );
};

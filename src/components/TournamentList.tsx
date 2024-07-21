import { getFinishedTours } from "@/utils/getFinishedTours";
import { Tournament } from "@/utils/types";
import { Input, Select, Spin } from "antd";
import { FC, useEffect, useState } from "react";

interface TournamentListProps {
  onTournamentClick: (tournamentId: string) => void;
}

const { Search } = Input;

export const TournamentList: FC<TournamentListProps> = ({
  onTournamentClick,
}) => {
  const [tournaments, setTournaments] = useState<Tournament[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFinishedTours()
      .then((data) => {
        setTournaments(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <div className="order-2 mt-5 xl:pl-8">
      <Search
        placeholder="Можно по ID турнира"
        onSearch={(value) => {
          if (value.trim() !== "") {
            onTournamentClick(value);
          }
        }}
        allowClear
      />
      <Select
        className="w-full mt-5 lg:hidden"
        defaultValue="Выбери турнир"
        onSelect={(value) => onTournamentClick(value)}
        options={tournaments?.map((tournament) => ({
          value: tournament.id,
          label: tournament.title,
        }))}
      />
      {loading ? (
        <div className="hidden lg:flex justify-center items-center min-h-full">
          <Spin size="large" />
        </div>
      ) : (
        <ul className="text-sm mt-5 font-medium text-gray-400 space-y-5 hidden xl:block">
          {tournaments?.map((tour) => (
            <li key={tour.id}>
              <a
                className="cursor-pointer text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                onClick={() => onTournamentClick(tour.id)}
              >
                {tour.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

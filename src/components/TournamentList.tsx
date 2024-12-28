import { getFinishedTours } from "@/utils/getFinishedTours";
import { TournamentList as TourList } from "@/utils/types";
import { Input, notification, Select, Spin } from "antd";
import { FC, useEffect, useState } from "react";

interface TournamentListProps {
  onTournamentSelect: (tournamentId: string) => void;
}

const { Search } = Input;

export const TournamentList: FC<TournamentListProps> = ({
  onTournamentSelect,
}) => {
  const [tournaments, setTournaments] = useState<TourList>([]);
  const [loading, setLoading] = useState(true);

  const [api, contextHolder] = notification.useNotification();

  const openErrorNotification = (error: string) => {
    api.error({
      message: "Не удалось своровать данные о турнирах",
      description: `Сообщение ошибки: ${error}`,
      showProgress: true,
    });
  };

  useEffect(() => {
    getFinishedTours()
      .then((data) => setTournaments(data))
      .catch((error) => openErrorNotification(error.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {contextHolder}
      <div className="order-2 mt-5 xl:pl-8">
        <Search
          placeholder="Можно по ID турнира"
          onSearch={(value) => {
            if (value.trim() !== "") {
              onTournamentSelect(value);
            }
          }}
          allowClear
        />
        <Select
          className="w-full mt-5 lg:hidden"
          defaultValue="Выбери турнир"
          onSelect={(value) => onTournamentSelect(value)}
          options={tournaments.map((tournament) => ({
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
            {tournaments.map((tour) => (
              <li key={tour.id}>
                <a
                  className="cursor-pointer text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                  onClick={() => onTournamentSelect(tour.id)}
                >
                  {tour.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

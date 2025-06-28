import { useFinishedToursStore } from "@/store/finishedToursStore";
import { Divider, Select, Skeleton } from "antd";
import { FC } from "react";
import { TournamentSearch } from "./TournamentSearch";

interface TournamentListProps {
  onTournamentSelect: (tournamentId: string) => void;
}

export const TournamentList: FC<TournamentListProps> = ({
  onTournamentSelect,
}) => {
  const { tournamentList, loading } = useFinishedToursStore();

  return (
    <div className="xl:pl-16 2xl:pl-24">
      <Select
        className="hidden lg:mb-5 lg:block xl:hidden"
        value={loading ? "Загружаем..." : "Выбери турнир"}
        loading={loading}
        onSelect={(value) => onTournamentSelect(value)}
        popupRender={(menu) => (
          <>
            <TournamentSearch onSearch={onTournamentSelect} />
            <Divider style={{ margin: "8px 0" }} />
            {menu}
          </>
        )}
        options={tournamentList.map((tournament) => ({
          value: tournament.id,
          label: tournament.title,
        }))}
      />
      <TournamentSearch
        className="hidden xl:block"
        onSearch={onTournamentSelect}
      />
      {loading ? (
        <div className="hidden mt-5 xl:block">
          <Skeleton
            loading={loading}
            active
            paragraph={{ rows: 10, width: 229 }}
            title={false}
            className="[&_.ant-skeleton-paragraph>li]:mb-6"
          />
        </div>
      ) : (
        <ul className="hidden text-sm w-[229px] mt-5 font-medium text-gray-400 space-y-5 xl:block">
          {tournamentList.map((tour) => (
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
  );
};

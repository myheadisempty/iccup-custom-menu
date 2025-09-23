import { Input } from "antd";
import { FC } from "react";

const { Search } = Input;

interface TournamentSearchProps {
  onSearch: (value: string) => void;
  className?: string;
}

export const TournamentSearch: FC<TournamentSearchProps> = ({
  onSearch,
  className,
}) => {
  return (
    <Search
      placeholder="Поиск по ID турнира"
      allowClear
      className={className}
      onSearch={(value) => {
        const trimmed = value.trim();
        if (trimmed !== "") {
          onSearch(trimmed);
        }
      }}
    />
  );
};

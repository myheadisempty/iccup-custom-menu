import { TournamentResults } from "../types";

const generatePlayerLinks = (players: string[]) =>
  players
    .map(
      (player) =>
        `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
          player
        )}.html]${player}[/url]`
    )
    .join(" & ");

const generatePlaceBlock = (
  place: number,
  players: string[],
  award: number,
  tourType: string
) => {
  const imageUrl = {
    1: "http://imgs.su/tmp/2013-05-24/1369417943-564.jpg",
    2: "http://imgs.su/tmp/2013-05-24/1369417968-564.jpg",
    3: "http://imgs.su/tmp/2013-05-24/1369417982-564.jpg",
  }[place];

  return `${place} место[img]${imageUrl}[/img] - ${generatePlayerLinks(
    players
  )} - получа${tourType !== "1x1" ? "ют по" : "ет"} ${award} капсов\n`;
};

export const generateReportText = ({
  id,
  title,
  tourType,
  winners,
  participantStats,
  tourStart,
  awards,
}: TournamentResults) => {
  const { firstPlace, secondPlace, thirdPlace } = winners;
  const { registered, confirmed, technicalLosses } = participantStats;

  const firstPlaceText = generatePlaceBlock(1, firstPlace, awards[0], tourType);
  const secondPlaceText = generatePlaceBlock(
    2,
    secondPlace,
    awards[1],
    tourType
  );
  const thirdPlaceText = thirdPlace.length
    ? generatePlaceBlock(3, thirdPlace, awards[2], tourType)
    : "";

  return `[url=https://iccup.com/tourney/view/${id}.html]${title} [${tourStart}][/url]
${firstPlaceText}${secondPlaceText}${thirdPlaceText}[url=https://iccup.com/tourney/grid/${id}.html]Сетка турнира[/url]
Количество зарегистрированных ${
    tourType !== "1x1" ? "команд" : "пользователей"
  }: ${registered}
Количество ${
    tourType !== "1x1" ? "команд" : "пользователей"
  } подтвердивших участие: ${confirmed}
Количество технических лузов: ${technicalLosses}
[img]https://iccup.com/upload/images/news/iCCup.Hardy/uzorchik.png[/img]`;
};

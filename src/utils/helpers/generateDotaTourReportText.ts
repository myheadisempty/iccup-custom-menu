import { DotaTournamentResults, TourType } from "../types";

const generatePlayerLinks = (players: string[], tourType: TourType) =>
  players
    .map(
      (player) =>
        `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
          player
        )}.html][b]${player}[/b][/url]`
    )
    .join(tourType === "1x1" || tourType === "2x2" ? "[b] & [/b]" : "\n");

const generatePlaceBlock = (
  place: number,
  players: string[],
  awards: DotaTournamentResults["awards"][number],
  tourType: TourType
) => {
  const imageUrl = {
    1: "https://iccup.com/upload/images/news/iCCup.222/1место.png",
    2: "https://iccup.com/upload/images/news/iCCup.222/2место.png",
    3: "https://iccup.com/upload/images/news/iCCup.222/3место.png",
  }[place];

  const { cups, pts } = awards;
  const isTeamTour = tourType === "3x3" || tourType === "5x5";

  if (isTeamTour) {
    return `[img]${imageUrl}[/img][b]место ${cups}[/b][img]https://i.imgur.com/nf7UDEX.png[/img][b] +${pts} ПТС каждому игроку команды![/b]\n${generatePlayerLinks(
      players,
      tourType
    )}\n`;
  } else {
    return `[img]${imageUrl}[/img][b]место [/b]${generatePlayerLinks(
      players,
      tourType
    )}[b] получа${
      tourType !== "1x1" ? "ют по" : "ет"
    } ${cups}[/b][img]https://i.imgur.com/nf7UDEX.png[/img][b] и ${pts} птс[/b]\n`;
  }
};

export const generateDotaTourReportText = ({
  tourType,
  winners,
  awards,
}: DotaTournamentResults) => {
  const { firstPlace, secondPlace, thirdPlace } = winners;

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

  return `[img]https://iccup.com/upload/images/news/Design_section/di-3JLKUG.png[/img]
[b][h2]Поздравляем победителей!!![/h2][/b]
${firstPlaceText}${secondPlaceText}${thirdPlaceText}[img]https://iccup.com/upload/images/news/Design_section/di-3JLKUG.png[/img]`;
};

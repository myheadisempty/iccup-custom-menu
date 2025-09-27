import { DotaTournamentResults, TourType } from "@/utils/types";
import { BaseTournamentReportGenerator } from "../core/baseGenerator";
import { Template } from "../core/template";
import { DOTA_TOURNAMENT_TEMPLATE } from "../constants/templates";
import { DOTA_TOURNAMENT_IMAGES } from "../constants/images";

export class DotaTournamentGenerator extends BaseTournamentReportGenerator<DotaTournamentResults> {
  protected getTemplate(): string {
    return DOTA_TOURNAMENT_TEMPLATE;
  }

  protected getPlaceTemplate(): string {
    return ""; // Not used for Dota, as there is different logic for a team and solo
  }

  protected getPlaceImages(): Record<number, string> {
    return DOTA_TOURNAMENT_IMAGES;
  }

  protected formatPlayerLinks(players: string[], tourType: TourType): string {
    const playerLinks = players.map((player) => {
      const encodedPlayer = encodeURIComponent(player);
      return `[url=https://iccup.com/dota/profile/view/${encodedPlayer}.html][b]${player}[/b][/url]`;
    });

    const separator =
      tourType === "1x1" || tourType === "2x2" ? "[b] & [/b]" : "\n";
    return playerLinks.join(separator);
  }

  protected formatPlaceBlock(
    place: number,
    players: string[],
    awards: DotaTournamentResults["awards"][number],
    tourType: TourType
  ): string {
    const imageUrl = this.getPlaceImages()[place];
    const { runes, pts } = awards;
    const isTeamTour = tourType === "3x3" || tourType === "5x5";
    const playerLinks = this.formatPlayerLinks(players, tourType);

    if (isTeamTour) {
      return `[img]${imageUrl}[/img][b]место ${runes}[/b][img]https://iccup.com/upload/images/news/kiber/runes-icon.png[/img][b] +${pts} ПТС каждому игроку команды![/b]\n${playerLinks}\n`;
    } else {
      const verbEnding = this.getVerbEnding(tourType);
      return `[img]${imageUrl}[/img][b]место [/b]${playerLinks}[b] получа${verbEnding} ${runes}[/b][img]https://iccup.com/upload/images/news/kiber/runes-icon.png[/img][b] и ${pts} птс[/b]\n`;
    }
  }

  generate(data: DotaTournamentResults): string {
    const { tourType, winners, awards } = data;
    const { firstPlace, secondPlace, thirdPlace } = winners;

    const places = [
      this.generatePlaceText(1, firstPlace, awards[0], tourType),
      this.generatePlaceText(2, secondPlace, awards[1], tourType),
      this.generatePlaceText(3, thirdPlace, awards[2], tourType),
    ];

    if (thirdPlace.length !== 0) {
      places.push(this.generatePlaceText(3, thirdPlace, awards[2], tourType));
    }

    return Template.render(this.getTemplate(), {
      places: places.join(""),
    });
  }
}

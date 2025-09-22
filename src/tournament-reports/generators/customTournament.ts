import { CustomTournamentResults, TourType } from "@/utils/types";
import { Template } from "../core/template";
import { BaseTournamentReportGenerator } from "../core/baseGenerator";
import {
  CUSTOM_PLACE_TEMPLATE,
  CUSTOM_TOURNAMENT_TEMPLATE,
} from "../constants/templates";
import { CUSTOM_TOURNAMENT_IMAGES } from "../constants/images";

export class CustomTournamentGenerator extends BaseTournamentReportGenerator<CustomTournamentResults> {
  protected getTemplate(): string {
    return CUSTOM_TOURNAMENT_TEMPLATE;
  }

  protected getPlaceTemplate(): string {
    return CUSTOM_PLACE_TEMPLATE;
  }

  protected getPlaceImages(): Record<number, string> {
    return CUSTOM_TOURNAMENT_IMAGES;
  }

  protected formatPlayerLinks(players: string[]): string {
    return players
      .map((player) => {
        const encodedPlayer = encodeURIComponent(player);
        return `[url=https://iccup.com/dota/profile/view/${encodedPlayer}.html]${player}[/url]`;
      })
      .join(" & ");
  }

  protected formatPlaceBlock(
    place: number,
    players: string[],
    awards: CustomTournamentResults["awards"],
    tourType: TourType
  ): string {
    return Template.render(this.getPlaceTemplate(), {
      place,
      imageUrl: this.getPlaceImages()[place],
      playerLinks: this.formatPlayerLinks(players),
      verbEnding: this.getVerbEnding(tourType),
      awards,
    });
  }

  generate(data: CustomTournamentResults): string {
    const {
      id,
      title,
      tourType,
      winners,
      participantStats,
      tourStart,
      awards,
    } = data;
    const { firstPlace, secondPlace, thirdPlace } = winners;
    const { registered, confirmed, technicalLosses } = participantStats;

    const places = [
      this.generatePlaceText(1, firstPlace, awards[0].runes, tourType),
      this.generatePlaceText(2, secondPlace, awards[1].runes, tourType),
      this.generatePlaceText(3, thirdPlace, awards[2].runes, tourType),
    ].join("");

    return Template.render(this.getTemplate(), {
      id,
      title,
      tourStart,
      places,
      participantType: this.getParticipantType(tourType),
      registered,
      confirmed,
      technicalLosses,
    });
  }
}

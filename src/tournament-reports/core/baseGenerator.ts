import { TourType } from "@/utils/types";

export abstract class BaseTournamentReportGenerator<T> {
  protected abstract getTemplate(): string;
  protected abstract getPlaceTemplate(): string;
  protected abstract getPlaceImages(): Record<number, string>;
  protected abstract formatPlayerLinks(
    players: string[],
    tourType: TourType
  ): string;
  protected abstract formatPlaceBlock(
    place: number,
    players: string[],
    awards: unknown,
    tourType: TourType
  ): string;

  protected getParticipantType(tourType: TourType): string {
    return tourType !== "1x1" ? "команд" : "пользователей";
  }

  protected getVerbEnding(tourType: TourType): string {
    return tourType !== "1x1" ? "ют по" : "ет";
  }

  protected generatePlaceText(
    place: number,
    players: string[],
    awards: unknown,
    tourType: TourType
  ): string {
    return this.formatPlaceBlock(place, players, awards, tourType);
  }

  abstract generate(data: T): string;
}

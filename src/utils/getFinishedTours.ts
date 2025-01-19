import * as cheerio from "cheerio";
import { Role, TournamentList } from "./types";

export const getFinishedTours = async (adminRole: Role) => {
  const gameType = adminRole === "custom" ? "warcraft" : "dota";
  const response = await fetch(
    `${window.location}api/${gameType}/tourney.html`
  );
  const data = await response.text();
  const $ = cheerio.load(data);
  const tournamentList: TournamentList = [];

  $(".tourney-info").each((_, el) => {
    const statusElement = $(el).find(".in-sgnt");
    if (
      statusElement.length === 0 ||
      statusElement.text().trim().length === 0
    ) {
      const tournamentTitle = $(el).find(".t-main-title").text().trim();
      const tournamentUrl = $(el).find(".t-main-title > a").attr("href");
      const id = tournamentUrl?.match(/\d+/)?.[0] || "";
      tournamentList.push({
        title: tournamentTitle,
        id: id,
      });
    }
  });

  return tournamentList;
};

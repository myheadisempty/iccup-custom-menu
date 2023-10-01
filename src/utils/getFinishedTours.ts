import * as cheerio from "cheerio";
import { Tournament } from "./types";

export const getFinishedTours = async () => {
  const response = await fetch(`${window.location}api/warcraft/tourney.html`);
  const data = await response.text();
  const $ = cheerio.load(data);
  const tournaments: Tournament[] = [];

  $(".tourney-info").each((_, el) => {
    const statusElement = $(el).find(".in-sgnt");
    if (
      statusElement.length === 0 ||
      statusElement.text().trim().length === 0
    ) {
      const tournamentTitle = $(el).find(".t-main-title").text().trim();
      const tournamentUrl = $(el).find(".t-main-title > a").attr("href");
      const id = tournamentUrl?.match(/\d+/)?.[0] || "";
      tournaments.push({
        title: tournamentTitle,
        id: id,
      });
    }
  });

  return tournaments;
};

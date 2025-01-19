import * as cheerio from "cheerio";
import { parseDate } from "./helpers/parseDate";
import type { Element } from "domhandler";
import { TourType } from "./types";

export const getTourData = async (id: string) => {
  const baseUrl = `${window.location}api/tourney/`;
  const viewUrl = `${baseUrl}view/${id}.html`;

  const [viewUrlResponse, playersResponse, gridResponse] = await Promise.all([
    fetch(viewUrl),
    fetch(`${baseUrl}viewplayers/${id}/page1.html`),
    fetch(`${baseUrl}grid/${id}/10.html`),
  ]);

  const [viewUrlData, playersData, gridData] = await Promise.all([
    viewUrlResponse.text(),
    playersResponse.text(),
    gridResponse.text(),
  ]);

  const $view = cheerio.load(viewUrlData);
  const confirmedCount = parseConfirmedCount(playersData);
  const registeredCount = parseRegisteredCount($view);
  const tourType = parseTourType($view) as TourType;
  const tourStart = parseTourStart($view);
  const { firstPlace, secondPlace, thirdPlaceCandidates, numOfRounds } =
    parseGridResults(gridData);

  return {
    id,
    tourType,
    tourStart,
    title: $view("div.league-start h1").text(),
    participantStats: {
      registered: registeredCount,
      confirmed: confirmedCount,
    },
    winners: {
      firstPlace,
      secondPlace,
      thirdPlaceCandidates,
    },
    numOfRounds,
  };
};

const parseConfirmedCount = (data: string) => {
  const $ = cheerio.load(data);
  let confirmedCount = 0;
  $("div.sort-row").each(function () {
    $(this)
      .children()
      .each(function () {
        if ($(this).text().trim() === "YES") {
          confirmedCount++;
        }
      });
  });
  return confirmedCount;
};

const parseRegisteredCount = ($: cheerio.CheerioAPI) => {
  return Number($(".pg-left .field2").eq(7).text().trim().split(" ")[0]);
};

const parseTourType = ($: cheerio.CheerioAPI) => {
  return $(".pg-left .t-corp3:nth-child(3) .field2").text().trim();
};

const parseTourStart = ($: cheerio.CheerioAPI) => {
  return parseDate($(".pg-left .t-corp3:nth-child(6) .field2").text().trim());
};

const parseGridResults = (data: string) => {
  const $ = cheerio.load(data);
  const stages = $('[id^="t"]').children();
  let latestStage: cheerio.Cheerio<Element> | null = null;
  stages.each((_, element) => {
    const classAttr = $(element).attr("class");
    if (classAttr && classAttr.startsWith("stage-")) {
      if (!latestStage || $(element).index() > $(latestStage).index()) {
        latestStage = $(element);
      }
    }
  });

  const latestStageClassName = latestStage!.attr("class");

  const firstPlace =
    latestStage!
      .find(".tplay a.profile-view-link")
      .map((_, elem) => $(elem).text())
      .get() ?? [];

  const secondPlace = $(
    `.${latestStageClassName?.replace(/\d$/, (num) =>
      String(Number(num) - 1)
    )} .looser .tplay a.profile-view-link`
  )
    .map((_, elem) => $(elem).text())
    .get();

  const thirdPlace = $(
    `.${latestStageClassName?.replace(/\d$/, (num) =>
      String(Number(num) - 2)
    )} .looser .tplay a.profile-view-link`
  )
    .map((_, elem) => $(elem).text())
    .get();

  const numOfRounds = Number(
    $(".round").last().find("a").text().match(/\d+/)![0]
  );

  const halfIndex = thirdPlace.length / 2;

  const thirdPlaceCandidates = {
    candidate1: thirdPlace.slice(0, halfIndex),
    candidate2: thirdPlace.slice(halfIndex),
  };

  return { firstPlace, secondPlace, thirdPlaceCandidates, numOfRounds };
};

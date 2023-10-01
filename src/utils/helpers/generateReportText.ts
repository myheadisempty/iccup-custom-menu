import { TournamentResults } from "../types";

export const generateReportText = ({
  id,
  title,
  tourType,
  registeredCount,
  confirmedCount,
  techLossesCount,
  tourStart,
  top1,
  top2,
  top3,
  awards,
}: TournamentResults) => {
  const top1Players = top1
    .map(
      (res) =>
        `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
          res
        )}.html]${res}[/url]`
    )
    .join(" & ");
  const top2Players = top2
    .map(
      (res) =>
        `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
          res
        )}.html]${res}[/url]`
    )
    .join(" & ");
  const thirdPlaceText =
    top3!.length !== 0
      ? `[color=green]3 место[/color][img]http://imgs.su/tmp/2013-05-24/1369417982-564.jpg[/img] - ${
          Array.isArray(top3)
            ? top3
                .map(
                  (res) =>
                    `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
                      res
                    )}.html]${res}[/url]`
                )
                .join(" & ")
            : `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
                top3!
              )}.html]${top3}[/url]`
        } - [color=green]получа${tourType !== "1x1" ? "ют по" : "ет"} ${
          awards![2]
        } капсов[/color]\n`
      : "";

  return `[url=https://iccup.com/tourney/view/${id}.html]${title} [${tourStart}][/url]\n[color=red]1 место[/color][img]http://imgs.su/tmp/2013-05-24/1369417943-564.jpg[/img] - ${top1Players} - [color=red]получа${
    tourType !== "1x1" ? "ют по" : "ет"
  } ${
    awards![0]
  } капсов[/color]\n[color=blue]2 место[/color][img]http://imgs.su/tmp/2013-05-24/1369417968-564.jpg[/img] - ${top2Players} - [color=blue]получа${
    tourType !== "1x1" ? "ют по" : "ет"
  } ${
    awards![1]
  } капсов[/color]\n${thirdPlaceText}[url=https://iccup.com/tourney/grid/${id}.html]Сетка турнира[/url]\nКоличество зарегистрированных ${
    tourType !== "1x1" ? "команд" : "пользователей"
  }: ${registeredCount}\nКоличество ${
    tourType !== "1x1" ? "команд" : "пользователей"
  } подтвердивших участие: ${confirmedCount}\nКоличество технических лузов: ${techLossesCount}\n[img]https://iccup.com/upload/images/news/iCCup.Hardy/uzorchik.png[/img]`;
};

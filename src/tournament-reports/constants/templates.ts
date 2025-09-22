export const CUSTOM_TOURNAMENT_TEMPLATE = `[url=https://iccup.com/tourney/view/{{id}}.html]{{title}} [{{tourStart}}][/url]
{{places}}[url=https://iccup.com/tourney/grid/{{id}}.html]Сетка турнира[/url]
Количество зарегистрированных {{participantType}}: {{registered}}
Количество {{participantType}} подтвердивших участие: {{confirmed}}
Количество технических лузов: {{technicalLosses}}
[img]https://iccup.com/upload/images/news/iCCup.Hardy/uzorchik.png[/img]`;

export const DOTA_TOURNAMENT_TEMPLATE = `[img]https://iccup.com/upload/images/news/Design_section/di-3JLKUG.png[/img]
[b][h2]Поздравляем победителей!!![/h2][/b]
{{places}}[img]https://iccup.com/upload/images/news/Design_section/di-3JLKUG.png[/img]`;

export const CUSTOM_PLACE_TEMPLATE = `{{place}} место[img]{{imageUrl}}[/img] - {{playerLinks}} - получа{{verbEnding}} {{awards}} [img]https://iccup.com/upload/images/news/kiber/runes-icon.png[/img]
`;

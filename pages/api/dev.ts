import { NextApiRequest, NextApiResponse } from "next";
import Card from "src/svgs/card";
import { getLanguageExtension, getTheme } from "src/utils";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", "image/svg+xml");
  let card = new Card({
    data: {
      title: "Gers2017 stats",
      totalIssues: 22,
      totalCommits: 829,
      totalPRs: 137,
      contributedTo: 102,
      languageExtension: getLanguageExtension("Typescript"),
      mostUsedLanguage: "Typescript",
    },
    colors: getTheme("glitch"),
  });

  res.send(card.render());
}

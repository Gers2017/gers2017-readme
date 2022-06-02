import { NextApiRequest, NextApiResponse } from "next";
import Card from "src/svgs/card";
import ErrorCard from "src/svgs/error";
import { getLanguageExtension, getTheme } from "src/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { language, theme } = req.query;
  language = (language ?? "Typescript") as string;
  theme = (theme ?? "glitch") as string;

  try {
    res.setHeader("Content-Type", "image/svg+xml");
    let card = new Card({
      data: {
        title: "Gers2017 stats",
        totalIssues: 22,
        totalCommits: 829,
        totalPRs: 137,
        contributedTo: 102,
        languageExtension: getLanguageExtension(language),
        mostUsedLanguage: language,
      },
      colors: getTheme(theme),
    });

    res.send(card.render());
  } catch (error) {
    const errorCard = new ErrorCard({ message: error.message });
    res.send(errorCard.render());
    console.error(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import Card from "src/svgs/card";
import {
  clamp,
  getGithubStatsForCard,
  getLanguageExtension,
  getMostUsedLanguage,
  getTheme,
  ParamError,
} from "src/utils";
import ErrorCard from "src/svgs/error";
import { TIME } from "src/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { username, cache_seconds, theme } = req.query;
  username = username as string;
  theme = theme as string;
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    if (!username) throw new ParamError("username");

    const githubStats = await getGithubStatsForCard(username);
    const mostUsedLanguage = await getMostUsedLanguage(username);
    const languageExtension = getLanguageExtension(mostUsedLanguage);
    const cardColors = getTheme(theme ?? "");
    const card = new Card({
      data: {
        title: `${username} stats`,
        ...githubStats,
        mostUsedLanguage,
        languageExtension,
      },
      colors: cardColors,
    });

    const cacheSeconds = clamp(
      parseInt(cache_seconds as string, 10),
      TIME.THIRTY_MINUTES,
      TIME.ONE_DAY
    );
    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    res.send(card.render());
  } catch (error) {
    const errorCard = new ErrorCard({ message: error.message });
    res.send(errorCard.render());
    console.error(error);
  }
}

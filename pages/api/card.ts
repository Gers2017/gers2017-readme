import { NextApiRequest, NextApiResponse } from "next";
import Card from "src/svgs/card";
import {
  clamp,
  getGithubStatsForCard,
  getLanguageExtension,
  getRepositoriesInfo,
  getTheme,
  ParamError,
} from "src/utils";
import ErrorCard from "src/svgs/error";
import { TIME } from "src/constants";

type Query = { username: string; theme: string; cache_seconds: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { username, cache_seconds, theme } = req.query as Query;
  theme = theme ?? "";
  let cache_time = parseInt(cache_seconds ?? "0", 10);

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    if (!username) throw new ParamError("username");

    const githubStats = await getGithubStatsForCard(username);
    const { totalCommitCount, mostUsedLanguage } = await getRepositoriesInfo(
      username
    );
    const languageExtension = getLanguageExtension(mostUsedLanguage);

    const cardColors = getTheme(theme);
    const card = new Card({
      data: {
        title: `${username} stats`,
        totalCommits: totalCommitCount,
        mostUsedLanguage,
        languageExtension,
        ...githubStats,
      },
      colors: cardColors,
    });

    const cacheSeconds = clamp(cache_time, TIME.THIRTY_MINUTES, TIME.ONE_DAY);

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    res.send(card.render());
  } catch (error) {
    const errorCard = new ErrorCard({ message: error.message });
    res.send(errorCard.render());
    console.error(error);
  }
}

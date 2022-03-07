import { NextApiRequest, NextApiResponse } from "next";
import Card from "src/svgs/card";
import { getStats, getUserRepos } from "src/fetch";

import { ParamError } from "src/utils";
import ErrorCard from "src/svgs/error";
import Circle from "src/svgs/circle";
import { TIME } from "src/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { username, cache_seconds } = req.query;
  username = username as string;
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    if (!username) throw new ParamError("username");

    const githubStats = await getGithubStatsForCard(username);
    const mostUsedLanguage = await getMostuserLanguage(username);
    const languageExtension = getLanguageExtension(mostUsedLanguage);

    const card = new Card({
      data: {
        title: `${username} stats`,
        ...githubStats,
        mostUsedLanguage,
        languageExtension,
      },
    });

    card.setCircle(new Circle({ text: languageExtension }));

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

function clamp(value: number, min: number, max: number) {
  value = Math.min(min, value);
  value = Math.max(value, max);
  return value;
}

async function getMostuserLanguage(username: string) {
  const userRepos = await getUserRepos(username);

  const { nodes } = userRepos.data.user.repositories;

  const langsMap = nodes
    .filter((node) => Boolean(node.primaryLanguage))
    .reduce((map, node) => {
      const { name } = node.primaryLanguage;

      if (map[name]) {
        map[name] += 1;
      } else {
        map[name] = 1;
      }

      return map;
    }, {});

  const tuples: [string, number][] = Object.keys(langsMap).map((key) => [
    key,
    langsMap[key],
  ]);
  const sorted = tuples.sort((a, b) => b[1] - a[1]);
  const [language] = sorted[0];
  return language;
}

async function getGithubStatsForCard(username: string) {
  const stats = await getStats(username);
  const user = stats.data.user;

  return {
    totalCommits:
      user.contributionsCollection.totalCommitContributions +
      user.contributionsCollection.restrictedContributionsCount,
    totalIssues: user.contributionsCollection.totalIssueContributions,
    totalPRs: user.pullRequests.totalCount,
    contributedTo: user.repositoriesContributedTo.totalCount,
  };
}

function getLanguageExtension(language: string) {
  switch (language.toLowerCase()) {
    case "typescript":
      return "TS";
    case "javascript":
      return "JS";
    case "rust":
      return "RS";
    default:
      return language.slice(0, 2).toUpperCase();
  }
}

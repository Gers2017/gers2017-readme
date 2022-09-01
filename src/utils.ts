import { getStats, getUserRepos } from "src/fetch";
import { defaultTheme, themes } from "src/colors";

export class ParamError extends Error {
  constructor(param: string) {
    let message = `Missing parameter "${param}"`;
    super(message);
  }
}

export function clamp(value: number, min: number, max: number) {
  if (value <= min) value = min;
  if (value >= max) value = max;
  return value;
}

export async function getRepositoriesInfo(username: string) {
  const userRepos = await getUserRepos(username);
  const { nodes } = userRepos.data.user.repositories;

  if (nodes.length === 0) {
    return { totalCommitCount: 0, mostUsedLanguage: "" };
  }

  const totalCommitCount = nodes.reduce((count, node) => {
    return node.defaultBranchRef.target.history.totalCount + count;
  }, 0);

  const langsMap = nodes
    .filter((node) => Boolean(node.primaryLanguage))
    .reduce((map, node) => {
      const name = node.primaryLanguage.name;

      if (map.has(name)) {
        let count = map.get(name);
        map.set(name, count + 1);
      } else {
        map.set(name, 1);
      }

      return map;
    }, new Map<string, number>());

  const tuples = [...langsMap.entries()];
  const sorted = tuples.sort((a, b) => b[1] - a[1]);
  const [mostUsedLanguage] = sorted[0];

  return {
    totalCommitCount,
    mostUsedLanguage,
  };
}

export async function getGithubStatsForCard(username: string) {
  const stats = await getStats(username);
  const user = stats.data.user;

  return {
    totalIssues: user.issues.totalCount,
    totalPRs: user.pullRequests.totalCount,
    contributedTo: user.repositoriesContributedTo.totalCount,
  };
}

const languageExtensions: Record<string, string> = {
  typescript: "ts",
  javascript: "js",
  rust: "rs",
  haskell: "hs",
  elixir: "ex",
  julia: "jl",
};

export function getLanguageExtension(language: string) {
  language = language.toLocaleLowerCase();
  if (language in languageExtensions) {
    return languageExtensions[language].toUpperCase();
  }
  return language.slice(0, 2).toUpperCase();
}

export function getTheme(themeName: string) {
  if (!(themeName in themes)) return defaultTheme;
  return themes[themeName];
}

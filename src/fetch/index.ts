import axios from "axios";
import { UserRepos } from "typedefs/repo";
import Stats from "typedefs/stats";

import { GITHUB_TOKEN } from "../constants";

async function requestGraphql(data: { query: string; variables?: object }) {
  const res = await axios.post("https://api.github.com/graphql", data, {
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
    },
  });
  return res.data;
}

export async function getStats(login: string) {
  const stats = await requestGraphql({
    query: `
    query userInfo($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
          totalIssueContributions
        }
        repositoriesContributedTo(
          first: 1
          contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
        ) {
          totalCount
        }
        pullRequests(first: 1) {
          totalCount
        }
      }
    }`,
    variables: { login },
  });

  return stats as Stats;
}

export async function getUserRepos(login: string) {
  return (await requestGraphql({
    query: `
    query userRepositories($login: String!) {
      user(login: $login) {
        repositories(
          first: 100
          ownerAffiliations: OWNER
          isFork: false
          orderBy: {field: UPDATED_AT, direction: DESC}
        ) {
          nodes {
            primaryLanguage {
              name
            }
          }
        }
      }
    }
    `,
    variables: { login },
  })) as UserRepos;
}

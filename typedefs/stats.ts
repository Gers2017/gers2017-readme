interface Stats {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        restrictedContributionsCount: number;
        totalIssueContributions: number;
      };
      repositoriesContributedTo: {
        totalCount: number;
      };
      pullRequests: {
        totalCount: number;
      };
    };
  };
}

export default Stats;

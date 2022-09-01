interface UserStats {
  data: {
    user: {
      repositoriesContributedTo: {
        totalCount: number;
      };
      issues: {
        totalCount: number;
      };
      pullRequests: {
        totalCount: number;
      };
    };
  };
}

export default UserStats;

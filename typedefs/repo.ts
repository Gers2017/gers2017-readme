export type Node = {
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  };
  primaryLanguage: {
    name: string | null;
  };
};

export interface UserRepos {
  data: {
    user: {
      repositories: {
        nodes: Node[];
      };
    };
  };
}

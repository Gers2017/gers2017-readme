export type Node = {
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
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

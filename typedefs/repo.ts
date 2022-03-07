export type Node = {
  primaryLanguage: {
    name: string;
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

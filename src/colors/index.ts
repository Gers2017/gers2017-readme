import Colors from "typedefs/colors";

const glitch: Colors = {
  primaryColor: "#1fd1a6",
  contentColor: "#f9377d",
  circleColor: "#1fd1a6",
  bgColor: "#172c3c",
};

const vscode: Colors = {
  primaryColor: "#4ec9b0",
  contentColor: "#ce9178",
  circleColor: "#569cd6",
  bgColor: "#1e1e1e",
};

const dracula: Colors = {
  primaryColor: "#9c93f9",
  contentColor: "#dc79c6",
  circleColor: "#8be9fd",
  bgColor: "#282a36",
};

const spectrum: Colors = {
  primaryColor: "#f3dd74",
  contentColor: "#f8f9f3",
  circleColor: "#d0567d",
  bgColor: "#1d1e18",
};

export const defaultTheme = glitch;

export const themes = {
  glitch,
  vscode,
  dracula,
  spectrum,
};

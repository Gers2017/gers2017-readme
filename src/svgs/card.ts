import Circle from "./circle";
import { defaultTheme } from "src/colors";
import CardData from "typedefs/cardData";
import Colors from "typedefs/colors";

export default class Card {
  width = 512;
  height = 288;
  padding = 10;
  borderRadius = 16;

  colors: Colors = defaultTheme;
  data: CardData;
  circle: Circle = new Circle({ colors: defaultTheme });

  constructor({ colors, data }: { colors: Colors; data: CardData }) {
    this.colors = colors;
    this.circle = new Circle({ colors });
    this.setCardData(data);
  }

  setColors(value: Colors) {
    this.colors = value;
    this.circle.setColors(value);
  }

  setCardData(data: CardData) {
    this.data = data;
  }

  setLanguageExtension(value: string) {
    this.circle.text = value;
  }

  render() {
    return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${this.width + this.padding}"
      height="${this.height + this.padding}"
    >
    <style>
      text {
        font: 600 16px "Segoe UI", Ubuntu, "Helvetica Neue", Sans-Serif;
      }
      .card rect {
        fill: ${this.colors.bgColor};
        stroke: ${this.colors.primaryColor};
        animation: rectDash 2s forwards ease-in-out;
      }
      .title {
        font-size: 32px;
        fill: ${this.colors.primaryColor};
      }
      .content {
        fill: ${this.colors.contentColor};
      }
      @keyframes rectDash {
        from {
          stroke-dashoffset: 0;
        }
        to {
          stroke-dashoffset: 425;
        }
      }
    </style>
    <g class="card">
      <rect
        class="card-rect"
        x="4"
        y="4"
        width="${this.width}"
        height="${this.height}"
        stroke-dasharray="250"
        stroke-width="3"
        stroke-linecap="round"
        ry="${this.borderRadius}"
      />

      <text x="30" y="70" class="title">${this.data.title}</text>
      <g class="content">
        <text x="30" y="120">Total commits:</text>
        <text x="30" y="150">Total issues:</text>
        <text x="30" y="180">Total PRs:</text>
        <text x="30" y="210">Contributed to:</text>
        <text x="30" y="240">Most used language:</text>

        <text x="220" y="120">${this.data.totalCommits}</text>
        <text x="220" y="150">${this.data.totalIssues}</text>
        <text x="220" y="180">${this.data.totalPRs}</text>
        <text x="220" y="210">${this.data.contributedTo}</text>
        <text x="220" y="240">${this.data.mostUsedLanguage}</text>
      </g>
    </g>
    
    ${this.circle.render()}

  </svg>`;
  }
}

import Circle from "./circle";
import { defaultTheme } from "src/colors";
import CardData from "typedefs/cardData";
import Colors from "typedefs/colors";
import { TextPercent } from "./text";

interface ICard {
  colors?: Colors;
  data: CardData;
}

export default class Card {
  width = 512;
  height = 180;
  borderRadius = 16;
  colors: Colors;
  data: CardData;
  circle: Circle;
  strokeWidth = 2;
  strokeArray = `${this.perimeter * 0.25} ${this.perimeter * 0.1}`;
  fontSizeText = 15;
  fontSizeTitle = 30;
  fonts = `"Trebuchet MS", Helvetica, Verdana, "Segoe UI", Ubuntu`;
  // Relative units
  titlePos = { x: "5%", y: "25%" };
  leftColStartX = 5;
  rightColStartX = 40;
  colStartY = 40;
  gap = 10;

  constructor({ colors = defaultTheme, data }: ICard) {
    this.colors = colors;
    this.setCardData(data);
    this.circle = new Circle({ x: 400, y: 90, colors });
    this.circle.text = data.languageExtension;

    let titleSize = data.title.length;

    if (titleSize >= 20) {
      this.fontSizeTitle = 24;
    } else if (titleSize >= 15) {
      this.fontSizeTitle = 28;
    }
  }

  setColors(value: Colors) {
    this.colors = value;
    this.circle.setColors(value);
  }

  setCardData(data: CardData) {
    this.data = data;
  }

  get perimeter() {
    return Math.round(this.width * 2 + this.height * 2);
  }

  get offset() {
    return Math.round(this.strokeWidth / 2);
  }

  render() {
    return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.width + this.offset * 2}"
      height="${this.height + this.offset * 2}"
    >
    <style>
      text {
        font: 600 ${this.fontSizeText}px ${this.fonts};
      }
      .card .background {
        fill: ${this.colors.bgColor};
      }
      .card .border {
        stroke: ${this.colors.primaryColor};
        animation: rectDash 2s forwards ease-in-out;
      }
      .card .title {
        font-size: ${this.fontSizeTitle}px;
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
        x="${this.offset}"
        y="${this.offset}"
        class="background border"
        width="${this.width}"
        height="${this.height}"
        ry="${this.borderRadius}"
        stroke-dasharray="${this.strokeArray}"
        stroke-width="${this.strokeWidth}"
        stroke-linecap="round"
      />
      <text x="${this.titlePos.x}" y="${this.titlePos.y}" class="title">${
      this.data.title
    }</text>
      <g class="content">
        ${[
          "Total commits:",
          "Total issues:",
          "Total PRs:",
          "Contributed to:",
          "Most used language:",
        ].map((value, i) =>
          TextPercent(this.leftColStartX, this.colStartY + i * this.gap, value)
        )}
        ${[
          this.data.totalCommits,
          this.data.totalIssues,
          this.data.totalPRs,
          this.data.contributedTo,
          this.data.mostUsedLanguage,
        ].map((value, i) =>
          TextPercent(this.rightColStartX, this.colStartY + i * this.gap, value)
        )}
      </g>
    </g>
    ${this.circle.render()}
  </svg>`;
  }
}

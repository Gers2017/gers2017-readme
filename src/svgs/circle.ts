import { defaultPalete } from "src/colors";
import Colors from "typedefs/colors";

export default class Circle {
  radius: number;
  text: string;
  colors: Colors;
  start: number;
  end: number;

  constructor({ radius = 65, text = "TS", colors = defaultPalete }) {
    this.radius = radius;
    this.text = text;
    this.colors = colors;
    this.start = this.calculateBorderPercent(0);
    this.end = this.calculateBorderPercent(60);
  }

  setColors(value: Colors) {
    this.colors = value;
  }

  private calculateBorderPercent(value: number) {
    const circunference = Math.PI * (this.radius * 2);

    if (value < 0) value = 0;
    if (value > 100) value = 100;

    return Math.round(((100 - value) / 100) * circunference);
  }

  render() {
    return `
    <style>
      .circle-group circle {
        fill: transparent;
      }
      .circle-group .top {
        stroke: ${this.colors.primaryColor};
        animation: dash 2s forwards ease-out;
      }
      .circle-group .bottom {
        stroke: ${this.colors.primaryColor};
        stroke-opacity: 0.33;
      }
      .circle-group text {
        font-size: 36px;
        font-weight: bold;
        fill: ${this.colors.primaryColor};
      }
      @keyframes dash {
        from {
          stroke-dashoffset: ${this.start};
        }
        to {
          stroke-dashoffset: ${this.end};
        }
      }
    </style>
    <g class="circle-group">
        <circle
        class="bottom"
        cx="410"
        cy="160"
        r="${this.radius}"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle
        class="top"
        cx="410"
        cy="160"
        r="${this.radius}"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="200"
      />
      <text x="390" y="175">${this.text}</text>
    </g>
    `;
  }
}

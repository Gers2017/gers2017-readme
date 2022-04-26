import Colors from "typedefs/colors";

export default class Circle {
  radius = 65;
  text: string;
  colors: Colors;
  start: number;
  end: number;

  constructor({ text = "TS", colors }) {
    this.text = text;
    this.colors = colors;
    this.start = this.calculateBorderPercent(0);
    this.end = this.calculateBorderPercent(60);
  }

  setColors(value: Colors) {
    this.colors = value;
  }

  private calculateBorderPercent(value: number) {
    const circumference = Math.PI * (this.radius * 2);

    if (value < 0) value = 0;
    if (value > 100) value = 100;

    return Math.round(((100 - value) / 100) * circumference);
  }

  render() {
    return `
    <style>
      .circle-group circle {
        fill: transparent;
      }
      .circle-group .top {
        stroke: ${this.colors.circleColor};
        animation: dash 2s forwards ease-out;
      }
      .circle-group .bottom {
        stroke: ${this.colors.circleColor};
        stroke-opacity: 0.33;
      }
      .circle-group text {
        font-size: 48px;
        font-weight: bold;
        fill: ${this.colors.circleColor};
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
      <text x="385" y="176">${this.text}</text>
    </g>
    `;
  }
}

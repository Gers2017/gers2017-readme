import Colors from "typedefs/colors";

interface ICircle {
  x?: number;
  y?: number;
  text?: string;
  colors: Colors;
}

export default class Circle {
  x: number = 0;
  y: number = 0;
  radius = 65;
  text: string;
  colors: Colors;
  start: number;
  end: number;
  fontSize = 48;
  textPos: { x: number; y: number };

  constructor({ x = 0, y = 0, text = "NA", colors }: ICircle) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.colors = colors;
    this.start = this.calculateBorderPercent(0);
    this.end = this.calculateBorderPercent(60);
    this.textPos = {
      x: this.x - Math.round(this.fontSize * 0.6),
      y: this.y + Math.round(this.fontSize * 0.4),
    };
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
        font-size: ${this.fontSize}px;
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
        cx="${this.x}"
        cy="${this.y}"
        r="${this.radius}"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle
        class="top"
        cx="${this.x}"
        cy="${this.y}"
        r="${this.radius}"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="200"
      />
      <text x="${this.textPos.x}" y="${this.textPos.y}">${this.text}</text>
    </g>`;
  }
}

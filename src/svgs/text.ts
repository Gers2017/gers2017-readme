import { SvgValue } from "typedefs/svg";

export function Text(x: SvgValue, y: SvgValue, value: SvgValue) {
  return `<text x="${x}" y="${y}">${value}</text>`;
}

export function TextPercent(x: number, y: number, value: SvgValue) {
  return Text(`${x}%`, `${y}%`, value);
}

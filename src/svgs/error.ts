export default class ErrorCard {
  public title: string;
  public message: string;
  constructor({ title = "We have an error", message }) {
    this.title = title;
    this.message = message;
  }
  render() {
    return `
    <svg
    width="550"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <style>
        .error text {
          font: 600 14px "Segoe UI", Ubuntu, "Helvetica Neue", Sans-Serif;
          fill: #f9377d;
        }
        .error rect {
          fill: #171717;
        }
        .error .title {
          font-size: 28px;
        }
      </style>
      <g class="error">
        <rect x="0" y="0" width="550" height="200" ry="16" />
        <text x="40" y="60" class="title">${this.title}</text>
        <text x="40" y="100">${this.message}</text>
      </g>
    </svg>
    `;
  }
}

//

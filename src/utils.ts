export class ParamError extends Error {
  constructor(param: string) {
    let message = `Missing parameter "${param}"`;
    super(message);
  }
}

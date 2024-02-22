export class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "Custom Error";
    }
  }
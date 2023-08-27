const { emit } = require("process");

class CustomError extends Error {
  constructor(mess) {
    super(mess);
  }
}
try {
  throw new CustomError("aaa");
} catch (e) {
  console.log(e.message);
}

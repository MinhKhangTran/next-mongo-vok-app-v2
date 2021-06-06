//extend the error class with own error handler
class ErrorHandler extends Error {
  message!: any;
  statusCode: number;
  //first function
  constructor(message: any, statusCode: number) {
    //inherit
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandler;

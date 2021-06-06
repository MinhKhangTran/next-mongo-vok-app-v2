//custom error middleware

import ErrorHandler from "@/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  //statuscode either statucode or 500
  err.statusCode = err.statusCode || 500;

  //copy err
  let error = { ...err };

  error.message = err.message;

  //mongoDB object id error
  if (err.name === "CastError") {
    const message = `Invalid: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }
  //mongose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (value: any) => value.message
    );
    error = new ErrorHandler(message, 400);
  }

  res
    .status(err.statusCode)
    .json({ error, message: error.message, stack: error.stack });
};

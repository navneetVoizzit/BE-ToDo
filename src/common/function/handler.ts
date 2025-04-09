import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export const successHandler = (data?: any, message?: string) => ({
  success: true,
  data,
  message,
});

export const errorHandler = (error: Error, logger?: Logger) => {
  const isHttpException = error instanceof HttpException;
  const errorMessage = isHttpException
    ? typeof error.getResponse() === 'string'
      ? error.getResponse()
      : error.getResponse()['message']
    : 'Something went wrong';
  const errorStatus = isHttpException
    ? error.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;

  logger?.error(error); // Log the error if a logger is provided

  throw new HttpException(
    { success: false, message: errorMessage },
    errorStatus,
  );
};

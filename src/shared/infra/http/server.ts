import 'reflect-metadata';
import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/ApError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'erros',
      message: err.message,
    });
  }
  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'erros',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀🇧🇷 App running on 3333 Port....');
});

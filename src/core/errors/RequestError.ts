import { IRequestError, RequestErrorCodes } from 'core/types';

export class RequestError extends Error implements IRequestError {
  message: string = '';
  name: string = 'RequestError';
  timestamp: number = 0;
  status: number = 0;
  error_code: RequestErrorCodes = '' as RequestErrorCodes;
  path: string = '';
  requestId: string = '';
  error: string = '';

  constructor(params: Omit<IRequestError, 'name'>) {
    super(params.message);
    Object.assign(this, params);
  }
}

RequestError.prototype.name = 'RequestError';

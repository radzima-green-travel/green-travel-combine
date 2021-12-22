export class NetworkError extends Error {
  message: string = '';

  status: number;

  constructor({message = 'Network Error'}: {message?: string} = {}) {
    super(message);
    this.name = this.constructor.name;
    this.status = -1;
  }
}

NetworkError.prototype.name = 'Network Error';

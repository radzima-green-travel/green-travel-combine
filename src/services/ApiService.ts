import axios from 'axios';

interface ICredentials {
  URL: string;
}

export class ApiService {
  protected _credentials?: ICredentials;

  protected _prefix: string = '';

  protected getCurrentUrl(path: string): string {
    if (this.credentials) {
      return this.prefix
        ? `${this.credentials.URL}${this.prefix}${path}`
        : `${this.credentials.URL}${path}`;
    }

    return `${this.prefix}${path}`;
  }

  protected get headers() {
    return {
      headers: {},
    };
  }

  public set credentials(credentials: ICredentials | undefined) {
    this._credentials = credentials;
  }

  public get credentials(): ICredentials | undefined {
    return this._credentials;
  }

  public set prefix(prefix: string | undefined) {
    this._prefix = prefix || '';
  }

  public get prefix(): string | undefined {
    return this._prefix;
  }

  protected async get(route: string, params: object = {}) {
    const url: string = this.getCurrentUrl(route);
    const result = await axios.get(url, {
      params,
      ...this.headers,
    });
    return result;
  }

  protected async post(route: string, data: any, params: object = {}) {
    const url: string = this.getCurrentUrl(route);
    const result = await axios.post(url, data, {
      params,
      ...this.headers,
    });
    return result;
  }

  protected async put(route: string, data: any, params: object = {}) {
    const url: string = this.getCurrentUrl(route);
    const result = await axios.put(url, data, {
      params,
      ...this.headers,
    });
    return result;
  }

  protected async patch(route: string, data: any, params: object = {}) {
    const url: string = this.getCurrentUrl(route);
    const result = await axios.patch(url, data, {
      params,
      ...this.headers,
    });
    return result;
  }

  protected async remove(route: string, params: object = {}) {
    const url: string = this.getCurrentUrl(route);
    const result = await axios.delete(url, {
      params,
      ...this.headers,
    });
    return result;
  }
}

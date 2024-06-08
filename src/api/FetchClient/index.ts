import { HttpMethod, HttpStatusCode, StatusCode } from "api/FetchClient/options";

interface HttpOptions {
  method: HttpMethod,
  httpHeader?: any,
  body?: any,
  cache?: any
}

export default class FetchClient {
  static resp: Response;
  static respBody: any;

  static async createRequest(url: string, options: HttpOptions): Promise<any> {
    try {
      const { method, httpHeader, body, cache } = options;
      const requestInit: RequestInit = { method };

      if (cache) {
        requestInit.cache = cache;
      }
      if (httpHeader) {
        requestInit.headers = httpHeader;
      }

      if (body) {
        requestInit.body = JSON.stringify(body);
      }

      this.resp = await fetch(url, requestInit);
      this.respBody = await this.resp.json();

      return FetchClient;
    }
    catch (error) {
      console.log(error);
    }
  }

  static statusCode(): HttpStatusCode {
    const statusCode = this.resp.status as StatusCode;
    const statusText = (StatusCode[this.resp.status] as any) as StatusCode;

    return {
      statusCode,
      statusText
    };
  }

  static getToken(): string {
    return this.respBody.token;
  }
 
  static isOk(): boolean {
    return this.resp.ok;
  }

  static responseData() {
    return this.respBody.data;
  }
}

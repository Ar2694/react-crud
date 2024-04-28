import { HttpMethod, HttpStatusCode, StatusCode } from "./options";

interface HttpOptions {
  method: HttpMethod,
  httpHeader?: any,
  data?: any,
  cache?: any
}

export default class FetchClient {
  static resp: Response;
  static respBody: any;

  static async createRequest(url: string, options: HttpOptions): Promise<any> {
    try {
      const { method, httpHeader, data, cache } = options;
      const requestInit: RequestInit = { method };

      if (cache) {
        requestInit.cache = cache;
      }
      if (httpHeader) {
        requestInit.headers = httpHeader;
      }

      if (data) {
        requestInit.body = JSON.stringify(data);
      }

      this.resp = await fetch(url, requestInit);
      console.log(this.resp, "createRequest")
      if(this.resp.ok){
        this.respBody = await this.resp.json();
        return this;
      }else{
        throw new Error(this.resp.status + " " +this.resp.statusText)
      }
 
    }
    catch (error) {
      console.log("Create request => " + error);
    }
  }


  static statusCode(): HttpStatusCode {
    const statusCode = this.resp.status as StatusCode;
    const statusText = (StatusCode[this.resp.status] as unknown) as StatusCode;

    return {
      statusCode,
      statusText
    };
  }

  static isOk(): boolean {
    return this.resp.ok;
  }

  static responseData() {
    return this.respBody.data;
  }
}

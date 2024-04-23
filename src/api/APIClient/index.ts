import { HttpMethod } from "../FetchClient/options";
import FetchClient from "../FetchClient";

export default class APIClient{
 
    // GET request
    static async get(url: string): Promise<any> {
        const options = {
            method: HttpMethod.GET,
            httpHeader: {
                "Content-Type": "application/json",
             
            },
            cache: "no-store"
        }

        const request = await FetchClient.createRequest(url, options);
 
        return {
            data: request.responseData(),
            isOk: request.isOk()
        };
    }

    // POST request
    static async post(url: string, data: any): Promise<any> {
        const options = {
            method: HttpMethod.POST,
            httpHeader: {
                "Content-Type": "application/json"
            },
            data: data
        }

        const request = await FetchClient.createRequest(url, options);

        return {
            data: request.responseData(),
            isOk: request.isOk()
        };
    }

    //PUT request
    static async put(url: string, data: any): Promise<any> {
        const options = {
            method: HttpMethod.PUT,
            httpHeader: {
                "Content-Type": "application/json"
            },
            data: data
        }

        const request = await FetchClient.createRequest(url, options);

        return {
            data: request.responseData(),
            isOk: request.isOk()
        };
    }

    //DELETE request
    static async delete(url: string): Promise<any> {
        const options = {
            method: HttpMethod.DELETE
        }

        const request = await FetchClient.createRequest(url, options);

        return {
            data: request.responseData(),
            isOk: request.isOk()
        };
    }
}

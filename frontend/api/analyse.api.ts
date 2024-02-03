import { AxiosError } from "axios";
import { instance } from "./api";

export interface Wrapper {
  status: number;
  error?: string;
  data: RequestResult;
}

export interface RequestResult {
  id: number;
  share: string;
  status_code: number;
  url: string;
  method: string;
  domain: string;
  scheme: string;
  path: string;
  page_load: number;
  first_iteration: number;
  responses: Response[];
}

export interface Response {
  status_code: number;
  server: string;
  date: string;
  time: number;
  location?: string;
  reason: string;
  http_version: string;
}

interface InputData {
  url: string;
  method: string;
}

class UrlAnalyserService {
  private http = instance;
  private endpoint = "http/";
  private endpoint_code = "shared/";
  private endpoint_csfr = "csrf/";

  setCsfr = async (): Promise<Wrapper> => {
    return this.getPromise<Wrapper>(this.http.get(this.endpoint_csfr));
  };

  get = (code: string): Promise<Wrapper> => {
    return this.getPromise<Wrapper>(
      this.http.get(this.endpoint_code + code + "/", { withCredentials: true })
    );
  };

  post = (data: InputData): Promise<Wrapper> => {
    return this.getPromise(
      this.http.post(this.endpoint + data.method + "/", data, {})
    );
  };

  private getPromise<T>(func: Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      func
        .then((response: any) => {
          resolve(response.data as T);
        })
        .catch((error: AxiosError<any>) => {
          reject(error.response?.data as T);
        });
    });
  }
}

export const url_service = new UrlAnalyserService();

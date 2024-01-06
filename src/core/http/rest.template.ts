import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig } from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RestTemplate {
    private readonly isProduction: boolean;
    private readonly defaultTimeout: number;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.isProduction = this.configService.get('properties')["NODE_ENV"] === "PRODUCTION";
        this.defaultTimeout = this.configService.get('properties.API_DEFAULT_TIMEOUT');
    }

    async get(url: string, params?: object, timeout?: number): Promise<any> {
        if (!this.isProduction) {
            console.log("GET_URL=>", url);
            console.log("PARAMS=>", params);
        }

        const requestConfig: AxiosRequestConfig = {
            params,
            timeout: timeout || this.defaultTimeout,
        };

        return this.httpService.get(url, requestConfig).toPromise();
    }

    async post(url: string, body: object, config?: AxiosRequestConfig): Promise<any> {
        if (!this.isProduction) {
            console.log("POST_URL=>", url);
            console.log("PAYLOAD=>", body);
        }

        const requestConfig: AxiosRequestConfig = {
            ...config,
            timeout: config?.timeout || this.defaultTimeout,
        };

        return this.httpService.post(url, body, requestConfig).toPromise();
    }

    async postFormData(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<any> {
        if (!this.isProduction) {
            console.log("POST_FORMDATA_URL=>", url);
            console.log("FORMDATA=>", formData);
        }

        const requestConfig: AxiosRequestConfig = {
            ...config,
            timeout: config?.timeout || this.defaultTimeout,
            headers: {
                "Content-Type": "multipart/form-data",
                ...config?.headers,
            },
        };

        return this.httpService.post(url, formData, requestConfig).toPromise();
    }
}

import axios from "axios";
import { HTTPErrors } from "Configs/error";
import { baseUrl as BASE_URL, endpoints as SERVER_ENDPOINT } from "Configs/endpoint";

let instance = null;

class RequestInterface {
    constructor() {
        this.client = axios.create({
            baseURL: BASE_URL,
        });
    }

    async get(endpoint, params, otherConfigs = {}) {
        try {
            const response = await this.client.get(endpoint, { params, ...otherConfigs });
            return response;
        } catch (e) {
            const { status } = e.response;
            throw RequestInterface.getCustomError(
                status,
                `Failed to GET resource on endpoint ${endpoint}: ${e.response.data.error}`,
            );
        }
    }

    async put(endpoint, params, body, otherConfigs = {}) {
        try {
            const response = await this.client.put(endpoint, body, { params, ...otherConfigs });
            return response;
        } catch (e) {
            const { status } = e.response;
            throw RequestInterface.getCustomError(
                status,
                `Failed to PUT resource on endpoint ${endpoint}: ${e.response.data.error}`,
            );
        }
    }

    async post(endpoint, body, otherConfigs = {}) {
        try {
            const response = await this.client.post(endpoint, body, otherConfigs);
            return response;
        } catch (e) {
            const { status } = e.response;
            throw RequestInterface.getCustomError(
                status,
                `Failed to POST resource on endpoint ${endpoint}: ${e.response.data.error}`,
            );
        }
    }

    async delete(endpoint, params, otherConfigs = {}) {
        try {
            const response = await this.client.delete(endpoint, { params, ...otherConfigs });
            return response;
        } catch (e) {
            const { status } = e.response;
            throw RequestInterface.getCustomError(
                status,
                `Failed to DELETE resource on endpoint ${endpoint}: ${e.response.data.error}`,
            );
        }
    }

    static getCustomError(code, msg) {
        switch (code) {
            case 400:
                return new HTTPErrors.HTTPBadRequestError(msg);
            case 401:
                return new HTTPErrors.HTTPUnauthorizedError(msg);
            case 403:
                return new HTTPErrors.HTTPForbiddenError(msg);
            case 404:
                return new HTTPErrors.HTTPNotFoundError(msg);
            case 500:
                return new HTTPErrors.HTTPInternalServerError(msg);
            default:
                return new Error("Unidentified HTTP Error");
        }
    }
}

export default class ApiService extends RequestInterface {
    constructor() {
        super();

        if (!instance) {
            instance = this;
        }

        return instance;
    }

    async sendEmail(data) {
        const endpoint = SERVER_ENDPOINT.MAIL.ROOT;
        try {
            await this.post(endpoint, data);
            return {
                isSuccess: true,
            };
        } catch (e) {
            return {
                isSuccess: false,
                message: e.message,
            };
        }
    }
}

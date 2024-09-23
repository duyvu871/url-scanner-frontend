import type { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import {Wrappalyzer} from "src/types/services/wrappalyzer";

// Interface to define the shape of the `api.v1` object
// This improves code clarity and type checking
interface ApiV1 {
    // ... Other methods for API v1 (products, ...)
    initScan: (url: string, callback?: (error: AxiosError|null, data: any) => void) => Promise<{clientId?: string; error?: string} | undefined>;
    getTechnologies: (clientId: string,  callback?: (error: AxiosError|null, data: any) => void) => Promise<Wrappalyzer & {error?: string} | undefined>;
    takeScreenshot: (clientId: string,  callback?: (error: AxiosError|null, data: any) => void) => Promise<{path?: string;} & {error?: string} | undefined>;
    abortDirBuster: (clientId: string,  callback?: (error: AxiosError|null, data: any) => void) => Promise<{message?: string;} & { error?: string} | undefined>;
    domainDirBuster: (clientId: string, callback?: (error: AxiosError|null, data: any) => void) => Promise<{clientId?: string;} & { error?: string} | undefined>;
}

// Fetch the API endpoint from environment variables
// Using NEXT_PUBLIC_API_BASE_URL makes the endpoint available client-side
// If not defined (e.g., running locally), defaults to 'http://localhost:3000'
const API_ENDPOINT = ""//process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

// Create the Axios instance with the base URL
const api= axios.create({
    baseURL: `${API_ENDPOINT}/api/v1`,
}) as  AxiosInstance & { v1: ApiV1 } ;

const apiTemplate = async <T>(
    api: AxiosInstance,
    path: string,
    data: any,
    options: {
        method: "post" | "get",
        configs: AxiosRequestConfig | undefined
    },
    callback?: (error: AxiosError|null, data: T | undefined) => void
) => {

    try {
        const response = await api[options.method]<T>(path, data, options.configs);
        if (callback) callback(null, response.data);
        return response;
        // @ts-ignore
    } catch (error: AxiosError | null) {
        if (callback) {
            callback(error, undefined);
        } else {
            throw error;
        }
    }
}

// Define methods for API version 1
api.v1 = {
    initScan: async (url, callback?: (error: AxiosError|null, data: any) => void) => {
        const response = await apiTemplate<{clientId?: string} & { error?: string} | undefined>(
            api,
            `/init-scan`,
            {
                url
            },
            { method: 'post',
                configs: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            },
            callback
        );
        console.log(response);
        return response?.data;
    },
    getTechnologies: async (clientId, callback?: (error: AxiosError|null, data: any) => void) => {
        const response = await apiTemplate<Wrappalyzer & {error?: string}>(
            api,
            `/get-technologies`,
            {
                clientId
            },
            { method: 'post',
                configs: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            },
            callback
        );
        return response?.data;
    },
    takeScreenshot: async (clientId, callback?: (error: AxiosError|null, data: any) => void) => {
        const response = await apiTemplate<{path?: string} & { error?: string} | undefined>(
            api,
            `/take-screenshot`,
            {
                clientId
            },
            { method: 'post',
                configs: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            },
            callback
        );
        return response?.data;
    },
    abortDirBuster: async (clientId, callback?: (error: AxiosError|null, data: any) => void) => {
        const response = await apiTemplate<{message?: string} & { error?: string} | undefined>(
            api,
            `domain-dir-buster/${clientId}/abort`,
            {},
            { method: 'post',
                configs: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            },
            callback
        );
        return response?.data;
    },
    domainDirBuster: async (clientId, callback?: (error: AxiosError|null, data: any) => void) => {
        const response = await apiTemplate<{clientId?: string} & { error?: string} | undefined>(
            api,
            `/domain-dir-buster`,
            {
                clientId
            },
            { method: 'post',
                configs: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            },
            callback
        );
        return response?.data;
    },
};

export default api;
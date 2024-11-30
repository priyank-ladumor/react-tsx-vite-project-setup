import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { trimEnd, toString, trimStart } from "lodash";

// Create an Axios instance
const globalAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL || "",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
globalAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);


// Response interceptor
globalAxios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default globalAxios;

// Make it available while not in production for developers
if (typeof window !== "undefined") {
    (window as unknown as { _globalAxios: AxiosInstance })._globalAxios = globalAxios;
}

// Abstract API class
export class Api {
    private baseUrl: string;
    private http: AxiosInstance;

    constructor(baseUrl: string, axiosInstance: AxiosInstance = globalAxios) {
        this.baseUrl = baseUrl;
        this.http = axiosInstance;
    }

    route(subpath: string): string {
        const path = trimEnd(trimStart(toString(subpath), "/"), "/");
        return path
            ? `${trimEnd(this.baseUrl, "/")}/${path}`
            : `${trimEnd(this.baseUrl, "/")}`;
    }

    async _get<T = unknown>(id: string): Promise<T> {
        return await this.http.get<T>(this.route(id)).then((res) => res.data);
    }

    async _all<T = unknown>(): Promise<T> {
        return await this.http.get<T>(this.route("")).then((res) => res.data);
    }

    async _create<T = unknown>(data: T): Promise<T> {
        return await this.http.post<T>(this.route(""), data).then((res) => res.data);
    }

    async _post<T = unknown>(path: string, data: T): Promise<T> {
        return await this.http.post<T>(this.route(path), data).then((res) => res.data);
    }

    async _update<T = unknown>(id: string, data: T): Promise<T> {
        return await this.http.put<T>(this.route(id), data).then((res) => res.data);
    }

    async _delete<T = unknown>(id: string): Promise<T> {
        return await this.http.delete<T>(this.route(id)).then((res) => res.data);
    }

    async _patch<T = unknown>(id: string, data: T): Promise<T> {
        return await this.http.patch<T>(this.route(id), data).then((res) => res.data);
    }
}

// Set Authorization token for all requests
export const setAxiosAuthToken = (token: string | null): void => {
    if (token) {
        globalAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete globalAxios.defaults.headers.common.Authorization;
    }
};

// src/services/userServiceClient.ts

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthResponse {
    token: string;
    refreshToken: string;
}

class UserServiceClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token && config.headers) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response: any) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        const response = await this.refreshToken(refreshToken as string);
                        localStorage.setItem('token', response.token);
                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = `Bearer ${response.token}`;
                        }
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        // Handle refresh token failure (e.g., logout user)
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async register(email: string, password: string): Promise<UserData> {
        try {
            const response = await this.client.post<UserData>('/register', { email, password });
            return response.data;
        } catch (error) {
            console.log(error);
            throw this.handleError(error as AxiosError);
        }
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await this.client.post<AuthResponse>('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            return response.data;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    async getUser(): Promise<UserData> {
        try {
            const response = await this.client.get<UserData>('/user');
            return response.data;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        try {
            const response = await this.client.post<AuthResponse>('/refresh-token', { refreshToken });
            return response.data;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    private handleError(error: AxiosError): Error {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return new Error((error.response.data as any).message || 'An error occurred');
        } else if (error.request) {
            // The request was made but no response was received
            return new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            return new Error('Error setting up the request');
        }
    }
}

export default UserServiceClient;

// Usage example:
// const userService = new UserServiceClient('https://api.example.com/users');
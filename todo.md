"A Realistic Data-Fetching Hook" in , use this as a example but add TanStack Query as a hook: 


export class ApiError extends Error {
    public statusCode: number;
    public message: string;
    public originalError?: unknown;

    constructor(statusCode: number, message: string, originalError?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.originalError = originalError;
        this.name = 'ApiError';
    }
}

interface FetchApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: unknown | FormData
    headers?: Record<string, string>
}

const fetchApi = async <T>(url: string, options: FetchApiOptions = {}): Promise<T> => {
    const { method = 'GET', body, headers: extraHeaders } = options
    const isFormData = body instanceof FormData
    const headers = {
        ...(body !== undefined && !isFormData ? { 'Content-Type': 'application/json' } : {}),
        ...extraHeaders,
    }
    try {
        const response = await fetch(url, {
            method,
            headers: Object.keys(headers).length ? headers : undefined,
            body: body !== undefined ? (isFormData ? body : JSON.stringify(body)) : undefined,
        });

        if (!response.ok) {
            throw new ApiError(
                response.status,
                `HTTP Error: ${response.status} ${response.statusText}`
            );
        }

        if (response.status === 204 || response.statusText === 'No Content') {
            return [] as unknown as T;
        }

        const data = await response.json() as T;
        return data ?? ([] as unknown as T);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        if (error instanceof SyntaxError) {
            throw new ApiError(0, 'Failed to parse response JSON', error);
        }

        if (error instanceof TypeError) {
            throw new ApiError(0, 'Network request failed', error);
        }

        throw new ApiError(0, 'An unknown error occurred', error);
    }
};

export const getAppOverview = async (clientName: string): Promise<IGetAppOverview[]> => {
    return fetchApi<IGetAppOverview[]>(`/api/Dashboard/GetAppOverview?clientName=${clientName}`);
}
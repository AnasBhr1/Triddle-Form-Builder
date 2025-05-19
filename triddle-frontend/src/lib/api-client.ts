// Define ApiResponse locally instead of importing from types
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // Set authorization token
  setAuthToken(token: string | null): void {
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.headers['Authorization'];
    }
  }

  // Add custom header
  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  // Remove header
  removeHeader(key: string): void {
    delete this.headers[key];
  }

  // GET request
  async get<T>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${path}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    });
    
    return this.handleResponse<T>(response);
  }

  // POST request
  async post<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  // PUT request
  async put<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'PUT',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  // PATCH request
  async patch<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'PATCH',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  // DELETE request
  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    
    return this.handleResponse<T>(response);
  }

  // File upload
  async upload<T>(path: string, formData: FormData): Promise<ApiResponse<T>> {
    // Remove content-type header for file uploads
    const headers = { ...this.headers };
    delete headers['Content-Type'];
    
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    return this.handleResponse<T>(response);
  }

  // Handle response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const status = response.status;
    
    try {
      const data = await response.json();
      
      if (status >= 200 && status < 300) {
        return {
          data: data.data as T,
          message: data.message,
          success: true,
          status
        };
      } else {
        const error = {
          data: data.data as T,
          message: data.message || 'An error occurred',
          success: false,
          status
        };
        
        throw error;
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // JSON parse error
        throw {
          data: null as unknown as T,
          message: 'Invalid response format',
          success: false,
          status
        };
      }
      
      throw error;
    }
  }
}

// Create a single instance of the API client
const apiClient = new ApiClient(
  process.env.REACT_APP_API_URL || 'http://localhost:8000/api'
);

// Initialize with token from localStorage
const token = localStorage.getItem('token');
if (token) {
  apiClient.setAuthToken(token);
}

export default apiClient;
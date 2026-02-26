const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add credentials for cookies
    config.credentials = 'include';

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async signup(email, password) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signin(email, password) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // API Key endpoints
  async getApiKeys() {
    return this.request('/api-key/');
  }

  async createApiKey(name) {
    return this.request('/api-key/', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  async deleteApiKey(id) {
    return this.request(`/api-key/${id}`, {
      method: 'DELETE',
    });
  }

  async updateApiKey(id, disabled) {
    return this.request('/api-key/disable', {
      method: 'PUT',
      body: JSON.stringify({ id, disabled }),
    });
  }

  // Models endpoints
  async getModels() {
    return this.request('/models/');
  }

  async getProviders() {
    return this.request('/models/providers');
  }

  async getModelProviders(modelId) {
    return this.request(`/models/${modelId}/providers`);
  }

  // Payments endpoints
  async onramp() {
    return this.request('/payments/onramp', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();

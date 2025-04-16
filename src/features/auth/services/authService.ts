import { apiRequest } from '@/api/api';
import type { LoginCredentials, RegisterData, User } from '@/types/User';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiRequest<AuthResponse>({
      method: 'POST',
      url: '/auth/login',
      data: credentials,
    });
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    return apiRequest<AuthResponse>({
      method: 'POST',
      url: '/auth/register',
      data: userData,
    });
  },

  async logout(): Promise<void> {
    return apiRequest<void>({
      method: 'POST',
      url: '/auth/logout',
    });
  },

  async getCurrentUser(): Promise<User> {
    return apiRequest<User>({
      method: 'GET',
      url: '/auth/me',
    });
  },

  // Mock for development if API is not available
  mockLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          resolve({
            user: {
              id: '1',
              username: 'user',
              email: 'user@example.com',
              fullName: 'Test User',
            },
            token: 'mock-jwt-token',
          });
        } else {
          throw new Error('Invalid credentials');
        }
      }, 500);
    });
  },
};

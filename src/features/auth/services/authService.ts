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
      url: '/api/auth/login', // Corrected API endpoint
      data: credentials,
    });
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    return apiRequest<AuthResponse>({
      method: 'POST',
      url: '/api/auth/register', // Corrected API endpoint
      data: userData,
    });
  },

  async logout(): Promise<void> {
    return apiRequest<void>({
      method: 'POST',
      url: '/api/auth/logout', // Corrected API endpoint
    });
  },

  async getCurrentUser(): Promise<User> {
    return apiRequest<User>({
      method: 'GET',
      url: '/api/auth/me', // Corrected API endpoint
    });
  },

  // Mock for development if API is not available
  mockLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          resolve({
            user: {
              id: '1',
              username: 'user',
              email: 'user@example.com',
              fullName: 'Тестовый Пользователь',
              avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
            },
            token: 'mock-jwt-token',
          });
        } else {
          throw new Error('Неверный email или пароль');
        }
      }, 500);
    });
  },
};

import * as SecureStore from 'expo-secure-store';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

export class StorageService {
  /**
   * Save access token securely
   */
  static async setAccessToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Error saving access token:', error);
      throw error;
    }
  }

  /**
   * Get access token
   */
  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  /**
   * Save refresh token securely
   */
  static async setRefreshToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error saving refresh token:', error);
      throw error;
    }
  }

  /**
   * Get refresh token
   */
  static async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  /**
   * Save user data
   */
  static async setUser(user: Record<string, unknown>): Promise<void> {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  /**
   * Get user data
   */
  static async getUser<T = Record<string, unknown>>(): Promise<T | null> {
    try {
      const user = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  /**
   * Clear all tokens and user data (logout)
   */
  static async clearAuth(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error clearing auth:', error);
      throw error;
    }
  }

  /**
   * Refresh token placeholder
   * TODO: Implement actual refresh token logic with your API
   */
  static async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      // TODO: Call your refresh token endpoint
      // const response = await apiClient.post('/auth/refresh', { refreshToken });
      // const newAccessToken = response.data.accessToken;
      // await this.setAccessToken(newAccessToken);
      // return newAccessToken;

      console.warn('Refresh token logic not implemented');
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      await this.clearAuth();
      return null;
    }
  }
}

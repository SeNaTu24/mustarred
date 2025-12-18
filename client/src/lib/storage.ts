// Simple encryption for localStorage data
const STORAGE_KEY = 'mustarred_secure_';

export const secureStorage = {
  // Simple base64 encoding (not cryptographically secure, but better than plain text)
  encode: (data: any): string => {
    try {
      return btoa(JSON.stringify(data));
    } catch {
      return '';
    }
  },

  decode: (encoded: string): any => {
    try {
      return JSON.parse(atob(encoded));
    } catch {
      return null;
    }
  },

  setItem: (key: string, data: any): void => {
    try {
      const encoded = secureStorage.encode(data);
      localStorage.setItem(STORAGE_KEY + key, encoded);
      sessionStorage.setItem(STORAGE_KEY + key, encoded);
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },

  getItem: (key: string): any => {
    try {
      // Try sessionStorage first, then localStorage
      const encoded = sessionStorage.getItem(STORAGE_KEY + key) || 
                     localStorage.getItem(STORAGE_KEY + key);
      return encoded ? secureStorage.decode(encoded) : null;
    } catch (error) {
      console.error('Failed to read from storage:', error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(STORAGE_KEY + key);
      sessionStorage.removeItem(STORAGE_KEY + key);
    } catch (error) {
      console.error('Failed to remove from storage:', error);
    }
  },

  clear: (): void => {
    try {
      // Only clear our app's data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY)) {
          localStorage.removeItem(key);
        }
      });
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
};
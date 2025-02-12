// protect localStorage from throwing errors if it's not available
export const safeStorage: Storage = {
  getItem(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem(key: string, value: any) {
    try {
      return localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  },
  removeItem(key: string) {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      return null;
    }
  },
  clear() {
    try {
      return localStorage.clear();
    } catch (e) {
      return null;
    }
  },
  get length() {
    try {
      return localStorage.length;
    } catch (e) {
      return 0;
    }
  },
  key(index: number) {
    try {
      return localStorage.key(index);
    } catch (e) {
      return null;
    }
  },
};

export const useAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  
  return { token, user, isAuthenticated: !!token };
};

export const useLocalStorage = (key: string, initialValue: any = null) => {
  const stored = localStorage.getItem(key);
  const value = stored ? JSON.parse(stored) : initialValue;

  const setValue = (val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, setValue];
};

export const useCurrency = () => {
  const currency = localStorage.getItem('currency') || 'USD';
  return { currency };
};

export const useTheme = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { isDark };
};

// Currency formatting utilities
// Supports multiple currencies with proper locale formatting

export const CURRENCY_CONFIG = {
  KES: {
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    locale: 'en-KE',
    code: 'KES',
  },
  USD: {
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    code: 'USD',
  },
  EUR: {
    symbol: '€',
    name: 'Euro',
    locale: 'en-GB',
    code: 'EUR',
  },
};

export const formatCurrency = (
  amount: number,
  currency: string = 'KES',
  showSymbol: boolean = true
): string => {
  const config = CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG] || CURRENCY_CONFIG.KES;
  
  try {
    const formatter = new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    
    const formatted = formatter.format(amount);
    return showSymbol ? `${config.symbol} ${formatted}` : formatted;
  } catch (error) {
    // Fallback formatting
    return `${config.symbol} ${amount.toFixed(2)}`;
  }
};

export const getCurrencySymbol = (currency: string = 'KES'): string => {
  const config = CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG] || CURRENCY_CONFIG.KES;
  return config.symbol;
};

export default formatCurrency;

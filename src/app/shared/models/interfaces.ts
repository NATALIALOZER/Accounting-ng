export interface Profile {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export interface RateApiData {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    EUR: number;
    USD: number;
    UAH: number;
  };
}

export interface RateTableData {
  currency: string;
  rate: number;
  date: string;
}

export interface Balance {
  EUR: number;
  USD: number;
  UAH: number;
}

export interface Bill {
  value: number;
  currency: string;
}


export interface CurrencyInfo {
  customIcon: string;
  icon: string;
  balance: number;
  currency: string;
}

export interface EventInfo {
  id: number;
  type: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface Category {
  capacity: number;
  name: string;
  id: number;
}

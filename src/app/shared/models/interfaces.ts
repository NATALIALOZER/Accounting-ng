export interface Profile {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export interface rateApiData {
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

export interface rateTableData {
  currency: string;
  rate: number;
  date: string;
}

export interface Balance {
  EUR: number;
  USD: number;
  UAH: number;
}

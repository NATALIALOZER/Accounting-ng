export interface IProfile {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export interface IBalance {
  EUR: number;
  USD: number;
  UAH: number;
}

export interface IRateApiData {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: IBalance;
}

export interface IRateTableData {
  currency: string;
  rate: number;
  date: string;
}

export interface IBill {
  value: number;
  currency: string;
}

export interface ICurrencyInfo {
  customIcon: string;
  icon: string;
  balance: number;
  currency: string;
}

export interface IEventInfo {
  id: number;
  type: string;
  amount: number;
  category: string | number;
  date: string;
  description?: string;
}

export interface ICategory {
  capacity: number;
  name: string;
  id: number;
}

export interface IProfile {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export interface ICurrencyIcons {
  currency: string;
  icon?: string;
  svgIcon?: string;
}

export interface IBalance {
  'EUR': number;
  'USD': number;
  'UAH': number;
}

export interface INewKey extends IBalance {
  [key: string]: number;
}

export interface IRateApiData {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: INewKey;
}

export interface IRateTableData {
  currency: string;
  rate: number;
  date: string;
  icon: string;
  balance: number;
  svgIcon: string;
}

export interface IBill {
  value: number;
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

export interface IChartData {
  name: string;
  y: number;
}


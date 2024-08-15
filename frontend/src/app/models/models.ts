

export interface StockHistory {
    open: number[];
    date: string[];
    time_delta_days: number;
    perc_change: number;
    value_change: number;
    start_value: number;
    end_value: number;
}

export type SelectYearValue = '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max'

export interface SearchTickerResult {
    exchange: string;
    shortname: string;
    quoteType: string;
    symbol: string;
    index: string;
    exchDisp: string;
}


export interface ChartItemData {
    meta: any;
    value: { x: number; y: number };
    valueIndex: number;
}

export interface ChartItem {
    command: string;
    data: ChartItemData;
    y: number;
    x: number;
    label: number | string;
}


export interface BasicStockInfo {
    website: string
    currency: string
    country: string
    city: string
    currentPrice: number
    dayHigh: number
    dayLow: number
    forwardPE: number
    marketCap: number
    totalCash: number
    totalDebt: number
}
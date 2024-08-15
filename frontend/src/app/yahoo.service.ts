import { Injectable, inject } from '@angular/core';
import { } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicStockInfo, SearchTickerResult, StockHistory } from './models/models';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class YahooService extends BaseService {


  getHistory(ticker: string, period: string): Observable<StockHistory> {
    const url = `${this.backend}/history`
    let params = new HttpParams()
      .set('ticker', ticker)
      .set('period', period)
    // .set('start_date', startDate)
    // .set('end_date', endDate);

    return this.httpClient.get<StockHistory>(url, { params })
  }

  searchTickerByName(search: string): Observable<SearchTickerResult[]> {
    const url = `${this.backend}/search_ticker_by_name`
    let params = new HttpParams()
      .set('search', search)
    return this.httpClient.get<SearchTickerResult[]>(url, { params })
  }


  getBasicInfo(ticker: string): Observable<BasicStockInfo> {
    const url = `${this.backend}/basic_info`
    let params = new HttpParams()
      .set('ticker', ticker)
    return this.httpClient.get<BasicStockInfo>(url, { params })
  }
}

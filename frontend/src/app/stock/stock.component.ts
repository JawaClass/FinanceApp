
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { BasicStockInfo, SearchTickerResult } from '../models/models';
import { YahooService } from '../yahoo.service';
import { Observable } from 'rxjs';
import { LineChartHistoryComponent } from "../line-chart-history/line-chart-history.component";
import { CompanyLogoComponent } from "../company-logo/company-logo.component";
import { BigNumberPipe } from "../big-number.pipe";

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [LineChartHistoryComponent, CompanyLogoComponent, AsyncPipe, BigNumberPipe],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log("basicStockInfo");
    console.log(this.basicStockInfo);


  }

  @Input() stock!: SearchTickerResult
  @Input() basicStockInfo!: BasicStockInfo

}

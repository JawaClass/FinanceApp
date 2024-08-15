import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { YahooService } from './yahoo.service';
import { LineChartComponent } from "./line-chart/line-chart.component";
import { NbButtonModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { SelectYearComponent } from "./select-year/select-year.component";
import { BasicStockInfo, SearchTickerResult, SelectYearValue, StockHistory } from './models/models';
import { StockSearchComponent } from "./stock-search/stock-search.component";
import { Observable, Subject } from 'rxjs';
import { LineChartHistoryComponent } from "./line-chart-history/line-chart-history.component";
import { StockComponent } from "./stock/stock.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarChartComponent, LineChartComponent, CommonModule, NbLayoutModule,
    NbSidebarModule,
    NbButtonModule, SelectYearComponent, StockSearchComponent, LineChartHistoryComponent, StockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  stock: SearchTickerResult = {
    symbol: "MSFT",
    exchange: "",
    exchDisp: "",
    index: "",
    quoteType: "",
    shortname: "Microsoft Corp."
  }

  yahoo = inject(YahooService)

  basicInfo$?: Observable<BasicStockInfo>

  updateStock(stock: any) {
    this.stock = stock

    this.basicInfo$ = this.yahoo.getBasicInfo(this.stock.symbol)

  }


}

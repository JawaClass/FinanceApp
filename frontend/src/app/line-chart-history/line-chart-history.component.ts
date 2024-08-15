import { Component, inject, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { BasicStockInfo, SearchTickerResult, SelectYearValue, StockHistory } from '../models/models';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { SelectYearComponent } from '../select-year/select-year.component';
import { Subject } from 'rxjs';
import { YahooService } from '../yahoo.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CHART_SIZE } from '../line-chart/util';
import { NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CompanyLogoComponent } from "../company-logo/company-logo.component";

@Component({
  providers: [NbDialogService,],
  selector: 'app-line-chart-history',
  standalone: true,
  imports: [LineChartComponent, SelectYearComponent, AsyncPipe, DecimalPipe, NbIconModule, NbEvaIconsModule, CompanyLogoComponent],
  templateUrl: './line-chart-history.component.html',
  styleUrl: './line-chart-history.component.css'
})
export class LineChartHistoryComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    const stockChange: SimpleChange | undefined = changes["stock"]
    const bufferChange: SimpleChange | undefined = changes["buffer"]

    console.log("stock....", this.stock);

    this.updateHistory()
  }
  @Input() showEnlarge = true
  @Input() dialogRef?: NbDialogRef<LineChartHistoryComponent>
  @Input() stock!: SearchTickerResult
  @Input() year: SelectYearValue = "5y"
  @Input() size = CHART_SIZE.normal
  @Input() basicStockInfo?: BasicStockInfo

  @Input() buffer: { [key in SelectYearValue]?: StockHistory } = {};

  yahoo = inject(YahooService)

  historySubject$ = new Subject<StockHistory>()


  history$ = this.historySubject$.asObservable()

  dialogService = inject(NbDialogService)

  updateYear(year: SelectYearValue) {
    this.year = year
    this.updateHistory()
  }

  updateHistory() {
    const year = this.year
    const symbol = this.stock.symbol
    const bufferedHistory = this.buffer[year]
    console.log("bufferedHistory", year, ":::", bufferedHistory);

    if (bufferedHistory) {
      this.historySubject$.next(bufferedHistory)
    } else {
      this.yahoo.getHistory(symbol, year).subscribe(stockHistory => {
        this.buffer[year] = stockHistory
        this.historySubject$.next(stockHistory)
      })
    }

  }

  shrink() {
    this.dialogRef?.close()
  }
  enlarge() {
    const ref = this.dialogService.open(LineChartHistoryComponent, {
      hasBackdrop: true, context: {
      },
      dialogClass: "dialog-class"
    })
    this.dialogRef = ref
    ref.componentRef.setInput("stock", this.stock)
    ref.componentRef.setInput("year", this.year)
    ref.componentRef.setInput("size", CHART_SIZE.large)
    ref.componentRef.setInput("showEnlarge", false)
    ref.componentRef.setInput("dialogRef", ref)
    ref.componentRef.setInput("basicStockInfo", this.basicStockInfo)
    // ref.componentRef.setInput("buffer", { ...this.buffer })
  }

}

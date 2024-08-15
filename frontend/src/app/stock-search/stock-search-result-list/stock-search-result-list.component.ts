import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SearchTickerResult } from '../../models/models';
import { NbCardComponent, NbCardModule } from '@nebular/theme';

@Component({
  selector: 'app-stock-search-result-list',
  standalone: true,
  imports: [NbCardModule],
  templateUrl: './stock-search-result-list.component.html',
  styleUrl: './stock-search-result-list.component.css'
})
export class StockSearchResultListComponent {

  @Output() selected = new EventEmitter<SearchTickerResult>()

  @Input({ required: true }) results!: SearchTickerResult[]

  selectListItem(item: SearchTickerResult) {
    this.selected.emit(item)
  }

}

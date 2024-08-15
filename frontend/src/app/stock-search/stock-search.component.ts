import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { fromEvent, throttleTime, auditTime, debounceTime, switchMap, filter, map, mergeMap, Observable, tap, of, merge, delay, Subject, shareReplay } from 'rxjs';
import { YahooService } from '../yahoo.service';
import { SearchTickerResult } from '../models/models';
import { StockSearchResultListComponent } from "./stock-search-result-list/stock-search-result-list.component";

@Component({
  selector: 'app-stock-search',
  standalone: true,
  imports: [NbInputModule, ReactiveFormsModule, StockSearchResultListComponent, CommonModule],
  templateUrl: './stock-search.component.html',
  styleUrl: './stock-search.component.css'
})
export class StockSearchComponent {

  @Output() result = new EventEmitter<SearchTickerResult>()

  yahoo = inject(YahooService)

  inputControl = new FormControl<string>('');

  clear$ = new Subject<void>()

  showResults = false

  @ViewChild('searchInputElement') searchInputElement?: ElementRef

  searchResultsApiRequest$: Observable<SearchTickerResult[]> = this.inputControl.valueChanges.pipe(
    filter((x: string | null): x is string => x !== null && x.trim().length > 0),
    debounceTime(500),
    mergeMap((strInput: string) => this.yahoo.searchTickerByName(strInput))
  )

  searchResultsCleared$: Observable<SearchTickerResult[]> = merge(this.inputControl.valueChanges.pipe(
    filter((x: string | null): x is string => x === null || x.trim().length == 0),
    mergeMap((strInput: string) => of([]))
  ), this.clear$.asObservable().pipe(mergeMap(_ => of([]))))


  searchResults$ = merge(this.searchResultsApiRequest$, this.searchResultsCleared$).pipe(
    shareReplay()
  )


  emitResult(item: SearchTickerResult) {
    this.result.emit(item)
    // this.clear$.next()
    this.showResults = false
  }

  clickInput(e: any) {
    console.log("clickInput...", e);
    this.showResults = true

  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.searchInputElement?.nativeElement.contains(event.target)) {
      this.showResults = false;
    }


  }


}

import { Component, ElementRef, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-chart-hover-display',

  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './chart-hover-display.component.html',
  styleUrl: './chart-hover-display.component.css'
})
export class ChartHoverDisplayComponent {
  @Input({ required: true }) price!: number
  @Input({ required: true }) date!: string

  a = ""
  hello() { }

  constructor(public elementRef: ElementRef) {
    console.log("ChartHoverDisplayComponent...elementRef", elementRef);

  }
}

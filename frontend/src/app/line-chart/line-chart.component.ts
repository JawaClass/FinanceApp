import { query } from '@angular/animations';
import { CommaExpr } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { LineChart, LineChartOptions, Svg, createSvg, easings } from 'chartist';
import { SelectYearComponent } from "../select-year/select-year.component";
import { ChartHoverDisplayComponent } from "./chart-hover-display/chart-hover-display.component";
import { ChartItem, SelectYearValue } from '../models/models';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { binarySearchClosest, CHART_SIZE, createSvgElement, LABEL_FORMATTER } from './util';


@Component({
  providers: [NbDialogService,],
  selector: 'app-line-chart',
  standalone: true,
  imports: [SelectYearComponent, ChartHoverDisplayComponent,],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnChanges, AfterViewInit, OnInit {
  ngOnInit(): void {
    console.log("LINE_CHART::ngOnInit ......",);
  }

  ngAfterViewInit(): void {
    console.log("LINE_CHART::ngAfterViewInit ......",);

    this.createChart()
  }

  @Input({ required: true }) labels!: number[] | string[]
  @Input({ required: true }) series!: number[]
  @Input({ required: true }) selectYearValue!: SelectYearValue
  @Input({ required: true }) time_delta_days!: number

  @Input() dialogRef?: NbDialogRef<LineChartComponent>


  @ViewChild('line_chart') line_chart?: ElementRef;

  xHover?: number
  itemHover?: ChartItem

  get maxValue() {
    return Math.max(...this.series)
  }

  @ViewChild('.tooltip-container')
  chart?: LineChart

  // @ViewChild(ChartHoverDisplayComponent, { static: false })
  // chartHoverDisplayComponent?: ChartHoverDisplayComponent

  @ViewChild('priceOverlay') chartHoverDisplayComponent?: ChartHoverDisplayComponent;

  pathElements: ChartItem[] = []

  drawData: any = {}

  point?: Element = undefined


  get svg() {
    var container = this.line_chart?.nativeElement;

    // console.log("LINECHART DIV CHILDREN", container!!.getElementsByClassName("ct-chart-line")); // class="ct-chart-line" 

    var firstChild: Element = container!!.getElementsByClassName("ct-chart-line")[0] //container!!.firstElementChild!!;

    return firstChild
  }


  get tooltip() {
    return document.getElementById("tooltip")
  }

  get tooltipLine() {
    return document.getElementById("tooltipLine")
  }

  isPressedDown = false



  ngOnChanges(): void {

    console.log("LINE_CHART::ngOnChanges ......", this.labels.length, this.selectYearValue, "time_delta_days:", this.time_delta_days, this.labels.length);
    // console.log("line_chart...", this.line_chart);

    if (this.line_chart) {
      this.createChart()
    }


  }

  createChart() {
    const step = Math.round(this.labels.length / 10)
    const seenLabels = new Set()

    const length = this.series.length
    const _this = this
    this.chart = new LineChart(

      this.line_chart?.nativeElement,
      {
        labels: this.labels,
        series: [this.series],

      },
      {
        lineSmooth: false,
        fullWidth: true,
        low: 0,
        showArea: true,
        showPoint: false,
        showLine: true,
        axisX: {
          offset: 50,
          labelInterpolationFnc(value, index) {
            const [_year, _month, _day, _hour, _minute, _second] = value.toString().split(' ')

            const date = new Date(parseInt(_year), parseInt(_month), parseInt(_day), parseInt(_hour), parseInt(_minute), parseInt(_second))
            const labelKey = LABEL_FORMATTER[_this.selectYearValue](date)

            // console.log("labelKey....", date, labelKey);
            return labelKey
          }
        },
        axisY: {
          onlyInteger: true,
          labelInterpolationFnc(value, index) {
            return value
          }
        }
      }
    )

    const drawTypes = new Set()
    this.chart.on('draw', (event: any) => {
      drawTypes.add(event.type)
      if (event.type === 'line') {
        this.pathElements = event.path.pathElements
        this.drawData = event
      }
    })

    this.chart.on('created', (event: any) => {
      var chartElement = this.line_chart?.nativeElement!!

      const every_nth_child_num = {
        "1d": 2,
        "5d": 2,
        "1mo": 2,
        "3mo": 8,
        "6mo": 16,
        "1y": 16,
        "2y": 32,
        "5y": 16,
        "10y": 64,
        "ytd": 16,
        "max": 128
      }[this.selectYearValue]


      document.querySelectorAll('foreignObject').forEach(foreignObject => {
        if (foreignObject.querySelector('span.ct-label.ct-horizontal')) {
          foreignObject.classList.add('has-ct-label');
          foreignObject.classList.add('every_nth_' + every_nth_child_num);
          // foreignObject.setAttribute("width", "100")
          // foreignObject.setAttribute("height", "100")
        }
      });
      chartElement.addEventListener('mousedown', (event: any) => {
        // console.log("Chart::mousedown::", event);
        this.isPressedDown = true
        this.createPoint(event)
      });

      chartElement.addEventListener('mouseup', (event: any) => {
        console.log("Chart::mouseup::", event);

        this.isPressedDown = false
        this.destroyPoint()

      });

      chartElement.addEventListener('mousemove', (event: any) => {
        if (this.isPressedDown) {
          this.movePoint(event)
          // console.log("mousemove", event);
        }
      })


      chartElement.addEventListener('mouseleave', (event: any) => {
        console.log("mouseleave...", event);
        if (this.isPressedDown) {
          this.movePoint(event)
          // console.log("mousemove", event);
        }

      })


    })

  }

  destroyPoint() {
    if (this.point) {

      this.svg.removeChild(this.point)
    }
    this.point = undefined
    this.itemHover = undefined
  }

  movementX = 0
  movementY = 0
  createPoint(event: any) {
    // console.log("chartHoverDisplayComponent...", this.chartHoverDisplayComponent);

    this.destroyPoint()
    // console.log("Chart::click::", event.clientX, event);
    const rect = this.svg.getBoundingClientRect();
    const x = event.clientX - rect.left;



    const closest = binarySearchClosest(this.pathElements, x)
    if (closest === undefined) return
    const itemHover = this.pathElements[closest]
    this.itemHover = itemHover
    this.itemHover!!.label = this.labels[closest]

    this.movementX = this.itemHover.x
    this.movementY = this.itemHover.y

    // const overlayElement = this.chartHoverDisplayComponent?.elementRef.nativeElement
    // const overlayRect: DOMRect = overlayElement.getBoundingClientRect()

    // if (itemHover.x < overlayRect.width) { this.movementX = itemHover.x }
    // else {
    //   this.movementX = itemHover.x - overlayRect.width
    // }


    const container = createSvgElement('svg', {
      'width': rect.width + '',
      'height': rect.height + '',
      // 'viewBox': '0 0 500 500',
      // 'style': 'left: 500px; background-color: blue; position: absolute; color: yellow;'
    })


    const p = createSvgElement('circle', {
      'cx': x + '',
      'cy': this.itemHover?.y + '',
      'r': '5',
      'style': 'fill: blue; stroke: blue; stroke-width: 2px;'
    })


    const line = createSvgElement('line', {
      'x1': x + '',
      'y1': 0 + '',
      'x2': x + '',
      'y2': rect.height + '',
      'stroke': 'black',
      'stroke-width': '2',
      'style': 'fill: blue; stroke: blue; stroke-width: 2px;'
    })

    container.appendChild(p)
    container.appendChild(line)


    this.svg.appendChild(container)

    this.point = container
  }

  movePoint(event: any) {
    const first = this.pathElements[0]
    const last = this.pathElements[this.pathElements.length - 1]


    const rect = this.svg.getBoundingClientRect();
    const x = event.clientX - rect.left;

    this.movementX = x


    let closest: number | undefined = undefined

    if (x > last.x) {
      closest = this.pathElements.length - 1
    } else if (x < first.x) {
      closest = 0
    } else {
      closest = binarySearchClosest(this.pathElements, x)
    }

    // console.log("movePoint..", x, rect.right, closest, this.pathElements[this.pathElements.length - 1].x);


    if (closest === undefined) return
    const itemHover = this.pathElements[closest]


    this.movementY = itemHover.y

    const overlayElement = this.chartHoverDisplayComponent?.elementRef.nativeElement
    const overlayRect: DOMRect = overlayElement.getBoundingClientRect()
    console.log("movePoint..chartHoverDisplayComponent=", overlayRect.width

    );

    if (itemHover.x < overlayRect.width) { this.movementX = itemHover.x }
    else {
      this.movementX = itemHover.x - overlayRect.width
    }





    this.itemHover = this.pathElements[closest]
    this.itemHover!!.label = this.labels[closest]

    const p = this.point?.children[0]!!

    // console.log("movePoint::", itemHover.x, itemHover.y, "VS", x);


    p.setAttribute('cx', itemHover.x + '')
    p.setAttribute('cy', itemHover.y + '')

    const line = this.point?.children[1]!!
    line.setAttribute('x1', itemHover.x + '')
    line.setAttribute('x2', itemHover.x + '')

  }


}

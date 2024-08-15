import { Component, OnInit } from '@angular/core';
// import { BarChartData, BarChartOptions, ResponsiveOptions, AnimationDefinition } from 'chartist';
// import { BarChart } from 'chartist';
// import {ChartistModule, BarChartConfiguration, ChartEvent, } from 'ng-chartist'

  
import 'chartist/dist/index.css';
import { BarChart, BarChartOptions } from 'chartist';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {
  ngOnInit(): void {
  

const data = {
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
  series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]]
};

const options: BarChartOptions = {
  high: 10,
  low: -10,
  axisX: {
    labelInterpolationFnc(value, index) {
      return index % 2 === 0 ? value : null;
    }
  }
};

new BarChart('#chart', data, options);


  }

  // data: BarChartData = {
 
  //   labels: [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec'
  //   ],
  //   series: [
  //     [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
  //     [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
  //   ]
  // }

  // options?: BarChartOptions = {
  //   axisX: {
  //     showGrid: false
  //   },
  //   height: 300
  // };


  // responsiveOptions?: ResponsiveOptions<BarChartOptions> = undefined

  // configuration: BarChartConfiguration = {
  //   type: "Bar",
  //   data: this.data,
  //   options: this.options,
  //   responsiveOptions: this.responsiveOptions
  // }

  // events: ChartEvent = {
  //   draw: (data: any) => {
  //     if (data.type === 'bar') {
  //       data.element.animate({
  //         y2: <AnimationDefinition>{
  //           dur: '0.5s',
  //           from: data.y1,
  //           to: data.y2,
  //           easing: 'easeOutQuad'
  //         }
  //       });
  //     }
  //   }
  // };

  // ..........................................................


  // type = 'Bar';
  // data = {
  //   labels: [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec'
  //   ],
  //   series: [
  //     [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
  //     [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
  //   ]
  // };

  // options = {
  //   axisX: {
  //     showGrid: false
  //   },
  //   height: 300
  // };

  // events: ChartEvent = {
  //   draw: (data: any) => {
  //     if (data.type === 'bar') {
  //       data.element.animate({
  //         y2: {
  //           dur: '0.5s',
  //           from: data.y1,
  //           to: data.y2,
  //           easing: 'easeOutQuad'
  //         }
  //       });
  //     }
  //   }
  // };

  
  //   configuration: BarChartConfiguration = {
  //   type: "Bar",
  //   data: this.data,
  //   options: this.options,
    
  // }

}

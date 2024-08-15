import { Pipe, PipeTransform } from '@angular/core';

type NumberFormat = 'billion' | 'trillion' | 'auto'

const BILLION = {
  n: 1_000_000_000,
  suffix: 'B'
}
const TRILLION = {
  n: 1_000_000_000_000,
  suffix: 'T'
}


const autoDivisor = (value: number) => {
  value = value < 0 ? -value : value
  console.log("autoDivisor", value);

  if (value >= TRILLION.n) return TRILLION
  if (value >= BILLION.n) return BILLION

  return BILLION
}

@Pipe({
  name: 'bigNumber',
  standalone: true
})
export class BigNumberPipe implements PipeTransform {

  transform(value: number, format: NumberFormat = 'auto', decimalPlaces: number = 2): string {
    let divisor: number;
    let suffix: string;
    switch (format) {
      case 'auto':
        const x = autoDivisor(value)
        divisor = x.n
        suffix = x.suffix
        break;
      case 'trillion':
        divisor = 1_000_000_000_000;
        suffix = 'T';
        break;
      case 'billion':
      default:
        divisor = 1_000_000_000;
        suffix = 'B';
        break;
    }

    const formattedValue = value / divisor;
    return formattedValue.toFixed(decimalPlaces) + ' ' + suffix;

    return value.toString();
  }

}

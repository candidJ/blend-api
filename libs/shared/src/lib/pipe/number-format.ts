import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberFormat' })
export class NumberFormatPipe implements PipeTransform {
  transform(value: any) {
    let outputNumber = value.replace(/\,/g, '');
    if (outputNumber.length == 0 || isNaN(outputNumber)) return;
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 5 }).format(
      outputNumber
    );
  }
}

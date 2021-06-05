import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'numberFormat' })
export class NumberFormatPipe implements PipeTransform {
    transform(value: any) {
        let outputNumber = value.replace(/\,/g, "");
        console.log(outputNumber, "number");
        if (isNaN(outputNumber)) return;
        return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 5 }).format(outputNumber);
    }

}
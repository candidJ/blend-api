import { Component, OnInit } from '@angular/core';
import { CalculatorConfig } from './calculator.const';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  calculatorConfig = CalculatorConfig;
  output: string = "result";
  constructor() { }

  public onUserInput(val: string) {
    console.log(val, "-=-=-");
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ICalculatorLayout } from '../shared/interface/interface';
import { CalculatorConfig } from './calculator.const';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  calculatorConfig = CalculatorConfig;
  output: string = "";
  previousInput: string = "";
  operation: string = "";
  currentOperator: string = "";
  constructor() { }

  private onlyAllowOneDecimal(userInput: ICalculatorLayout) {
    if (userInput.value === '.' && this.output.includes('.')) {
      return;
    } else {
      this.output += userInput.value;
    }
  }

  private compute() {
    switch (this.currentOperator) {
      case "+":
        this.output =   (parseFloat(this.previousInput) + parseFloat(this.output)).toFixed(2).toString();
        break;
      case "-":
        this.output =   (parseFloat(this.previousInput) - parseFloat(this.output)).toFixed(2).toString();
        break;
      case "/":
        this.output =   (parseFloat(this.previousInput) / parseFloat(this.output)).toFixed(2).toString();
        break;
      case "*":
        this.output =   (parseFloat(this.previousInput) * parseFloat(this.output)).toFixed(2).toString();
        break;
      default:
        break;
    }
    console.log(this.output, "this.output");
  }

  private appendOperator(userInput: ICalculatorLayout) {
    this.operation = `${this.output}${userInput.viewValue}`;
    this.currentOperator = userInput.value;
    this.previousInput = this.output;
    this.output = "";
  }

  private checkForOperation(userInput: ICalculatorLayout) {
    if (this.operation.length > 0) {
      this.operation = (`${this.operation}${userInput.value}`);
      this.output += userInput.value;
    } else {
      this.onlyAllowOneDecimal(userInput);
    }
  }

  private clear() {
    this.previousInput = "";
    this.operation = "";
    this.currentOperator = "";
  }

  public onUserInput(userInput: ICalculatorLayout) {
    switch (userInput.className) {
      case "numeric":
        this.checkForOperation(userInput);
        break;
      case "operator":
        this.appendOperator(userInput);
        break;
      case "equate":
        this.compute();
        this.clear();
        break;
    }
  }

  ngOnInit(): void {
  }

}

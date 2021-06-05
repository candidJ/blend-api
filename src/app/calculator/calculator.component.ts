import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  sessionOperationHistory: { "operation": string, "result": string }[] = [];
  @ViewChild('modal') modal: ElementRef;

  private isComputationDone: boolean = false;

  constructor(public renderer: Renderer2) { }

  private onlyAllowOneDecimal(userInput: ICalculatorLayout): void {
    if (userInput.value === '.' && this.output.includes('.')) {
      return;
    } else {
      if (this.isComputationDone) {
        this.output = userInput.value;
      } else {
        this.output += userInput.value;
      }
    }
    this.isComputationDone = false;
  }

  private compute(): void {
    let previousInput = parseFloat(this.previousInput);
    let currentOutput = parseFloat(this.output);

    switch (this.currentOperator) {
      case "+":
        this.output = (previousInput + currentOutput).toString();
        break;
      case "-":
        this.output = (previousInput - currentOutput).toString();
        break;
      case "/":
        this.output = (previousInput / currentOutput).toString();
        break;
      case "*":
        this.output = (previousInput * currentOutput).toString();
        break;
      case "%":
        this.output = (previousInput % currentOutput).toString();
        break;
      default:
        break;
    }
    console.log(this.output, "this.output");
    this.storeOperationHistoryInCurrentSession(currentOutput);
    this.clear();
    this.isComputationDone = true;
  }

  private storeOperationHistoryInCurrentSession(currentOutput: number): void {
    let previousOperations = JSON.parse(sessionStorage.getItem("operationHistory"));
    previousOperations.push({ operation: `${this.operation}${currentOutput}`, result: this.output });
    sessionStorage.setItem('operationHistory', JSON.stringify(previousOperations));
  }

  private appendOperator(userInput: ICalculatorLayout): void {
    if (!(this.calculatorConfig.some(cc => this.operation.includes(cc.viewValue)))) {
      this.isComputationDone = false;
      this.operation = `${this.output} ${userInput.viewValue}`;
      this.currentOperator = userInput.value;
      this.previousInput = this.output;
      this.output = "";
    }
  }

  private clear() {
    this.previousInput = "";
    this.operation = "";
    this.currentOperator = "";
  }

  private removeLastDigit() {
    if (this.output.length > 0) {
      this.output = this.output.toString().slice(0, -1);
    }
  }

  public onUserInput(userInput: ICalculatorLayout) {
    switch (userInput.className) {
      case "numeric":
        this.onlyAllowOneDecimal(userInput);
        break;
      case "operator":
        this.appendOperator(userInput);
        break;
      case "equate":
        this.compute();
        break;
      case "ac":
        this.clear();
        this.output = "";
        break;
      case "del":
        this.removeLastDigit();
        break
      default:
        this.clear();
        break;
    }
  }


  public displayOperationsHistory(): void {
    this.sessionOperationHistory = JSON.parse(sessionStorage.getItem("operationHistory"));
    // console.log(this.sessionOperationHistory);
    this.renderer.addClass(this.modal.nativeElement, 'is-active');
  }

  public hideOperationHistory(): void {
    this.renderer.removeClass(this.modal.nativeElement, 'is-active');
  }

  ngOnInit(): void {
  }

}

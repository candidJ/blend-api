import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { CalculatorConfig } from '../constants/calculator.const';
import { CalculatorLayout } from '../types/calculator.interface';

@Component({
  selector: 'ba-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  calculatorConfig = CalculatorConfig;
  output = '';
  previousInput = '';
  operation = '';
  currentOperator = '';
  sessionOperationHistory: { operation: string; result: string }[] = [];
  @ViewChild('modal', { static: false }) modal!: ElementRef;

  private isComputationDone = false;

  constructor(private renderer: Renderer2) {}

  onUserInput(userInput: CalculatorLayout): void {
    switch (userInput.className) {
      case 'numeric':
        this.onlyAllowOneDecimal(userInput);
        break;
      case 'operator':
        this.appendOperator(userInput);
        break;
      case 'equate':
        this.compute();
        break;
      case 'ac':
        this.clear();
        this.output = '';
        break;
      case 'del':
        this.removeLastDigit();
        break;
      default:
        this.clear();
        break;
    }
  }

  displayOperationsHistory(): void {
    this.sessionOperationHistory = JSON.parse(
      sessionStorage.getItem('operationHistory') || '{}'
    );
    this.renderer.addClass(this.modal.nativeElement, 'is-active');
  }

  hideOperationHistory(): void {
    this.renderer.removeClass(this.modal.nativeElement, 'is-active');
  }

  ngOnInit(): void {}

  private onlyAllowOneDecimal(userInput: CalculatorLayout): void {
    if (userInput.value === '.' && this.output.includes('.')) {
      return;
    }

    if (this.isComputationDone) {
      this.output = userInput.value;
    } else {
      this.output += userInput.value;
    }
    
    this.isComputationDone = false;
  }

  private compute(): void {
    let previousInput = parseFloat(this.previousInput);
    let currentOutput = parseFloat(this.output);

    switch (this.currentOperator) {
      case '+':
        this.output = (previousInput + currentOutput).toString();
        break;
      case '-':
        this.output = (previousInput - currentOutput).toString();
        break;
      case '/':
        this.output = (previousInput / currentOutput).toString();
        break;
      case '*':
        this.output = (previousInput * currentOutput).toString();
        break;
      case '%':
        this.output = (previousInput % currentOutput).toString();
        break;
      default:
        throw new Error(`Uncaught user input for${this.currentOperator}`);
    }
    this.storeOperationHistoryInCurrentSession(currentOutput); // effect
    this.clear(); // effect; complete
    this.isComputationDone = true;
  }

  private storeOperationHistoryInCurrentSession(currentOutput: number): void {
    let previousOperations: { operation: string; result: string }[] = [];

    if (!_.isEmpty(sessionStorage.getItem('operationHistory'))) {
      previousOperations = JSON.parse(
        sessionStorage.getItem('operationHistory') || '{}'
      );
    }
    let currentOperationHistory = {
      operation: String(`${this.operation} ${currentOutput}`),
      result: this.output,
    };
    if (!_.isEmpty(previousOperations)) {
      previousOperations.push(currentOperationHistory);
      sessionStorage.setItem(
        'operationHistory',
        JSON.stringify(previousOperations)
      );
    } else {
      let firstOperationInSession = [];
      firstOperationInSession.push(currentOperationHistory);
      sessionStorage.setItem(
        'operationHistory',
        JSON.stringify(firstOperationInSession)
      );
    }
  }

  private appendOperator(userInput: CalculatorLayout): void {
    if (
      !this.calculatorConfig.some((cc) =>
        this.operation.includes(cc.viewValue)
      ) &&
      this.output
    ) {
      this.isComputationDone = false;
      this.operation = `${this.output} ${userInput.viewValue}`;
      this.currentOperator = userInput.value;
      this.previousInput = this.output;
      this.output = '';
    }
  }

  private clear(): void {
    this.previousInput = '';
    this.operation = '';
    this.currentOperator = '';
  }

  private removeLastDigit(): void {
    if (this.output.length > 0) {
      this.output = this.output.toString().slice(0, -1);
    }
  }

}

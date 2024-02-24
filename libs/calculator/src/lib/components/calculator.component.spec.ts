import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { FeatherModule } from 'angular-feather';
import { Clock } from 'angular-feather/icons';
import { By } from '@angular/platform-browser';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [CalculatorComponent, FeatherModule.pick({ Clock })],
    }).createComponent(CalculatorComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  it('should displays modal window on history icon click', () => {
    // arrange
    const historyElement = fixture.debugElement.query(
      By.css('[data-testid="historyIcon"]'),
    );
    expect(historyElement).toBeTruthy();
    // jest.spyOn spies AND executes the method
    const displayOperationsHistory = jest.spyOn(
      component,
      'displayOperationsHistory',
    );
    const previousOperationsElement = fixture.debugElement.queryAll(
      By.css('[data-testid="previousOperations"]'),
    );
    expect(previousOperationsElement.at(0)?.classes).toMatchObject({
      modal: true,
    });

    // act
    historyElement.triggerEventHandler('click');

    // assert
    expect(displayOperationsHistory).toHaveBeenCalledTimes(1);
    expect(previousOperationsElement.at(0)?.classes).toMatchObject({
      modal: true,
      'is-active': true,
    });
  });

  it('should close the previous transaction modal window onClick of close button', () => {
    // arrange
    const historyElement = fixture.debugElement.query(
      By.css('[data-testid="historyIcon"]'),
    );
    const previousOperationsElement = fixture.debugElement.queryAll(
      By.css('[data-testid="previousOperations"]'),
    );
    const displayOperationsHistory = jest.spyOn(
      component,
      'displayOperationsHistory',
    );

    // initial state of modal
    expect(displayOperationsHistory).toHaveBeenCalledTimes(0);
    expect(previousOperationsElement.at(0)?.classes).toMatchObject({
      modal: true,
    });

    // act
    historyElement.triggerEventHandler('click');
    expect(displayOperationsHistory).toHaveBeenCalledTimes(1);
    // modal window is now open
    expect(previousOperationsElement.at(0)?.classes).toMatchObject({
      modal: true,
      'is-active': true,
    });

    const closeElement = fixture.debugElement.queryAll(
      By.css('[data-testid="closeModal"]'),
    );
    const hideOperationHistory = jest.spyOn(component, 'hideOperationHistory');

    // act
    closeElement.at(0)?.triggerEventHandler('click');

    // assert
    expect(hideOperationHistory).toHaveBeenCalledTimes(1);
    // previous transaction window is now closed
    expect(previousOperationsElement.at(0)?.classes).toMatchObject({
      modal: true,
    });
  });
});

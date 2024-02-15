import {Component, signal} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    ReactiveFormsModule
  ],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})

export class LabsComponent {
  title = 'todoApp';
  welcome = 'Welcome to the Todo App';
  tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
  name: string = 'esdras';
  age: number = 20;
  person = {
    name: 'Josue',
    age: 20
  }
  imageSrc = 'https://www.w3schools.com/howto/img_snow_wide.jpg';

  // declare a variable with private access
  private address: string = 'barrio 1';

  // declare a variable using singnal access
  signalVariable = signal('signal variable');
  tasksSignal = signal([
    'Task 1',
    'Task 2',
    'Task 3',
  ]);
  signalName = signal('esdras');

  signalPersonObj = signal({
    age: 18,
    name: 'josue',
    lastName: 'Barrios'
  })

  // variables para formularios
  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  });
  nameCtrl = new FormControl('esdras', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  // constructor

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }



  //methods
  /**
   * method to change the value of the variable
   */
  onClickMe() {
    console.log('Button was clicked');
  }
  handlerEvent(event: any) {
    console.log(event);
  }

  alertHelloWorld() {
    alert('Hello World');
  }
  onClickMe2(event: Event) {
    this.tasks.push('New Task');
    console.log(this.tasks);
    console.log(event)
  }
  keyEvent(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);

    this.signalVariable.set(input.value);
  }

  /**
   * reactivity using signal
   * @param event
   */
  reactivityUsingSignal(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);

    this.signalVariable.set(input.value);
  }

  protected readonly signal = signal;

  handlerEventName(event: Event): void
  {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.signalPersonObj.update( valueOld =>
    {
      return {
        ...valueOld,
        name: value,
      }
    })
  }
  updateAge(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.signalPersonObj.update(valueOld => {
      return {
        ...valueOld,
        age: parseInt(value)
      }
    })
  }
}

import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import { Tasks } from "../../Models/DataType/TaskInterface.model"
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {filter} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasksSignal = signal<Tasks[]>([]);
  filters = signal<'all' | 'pending' | 'completed'>('all',{});
  tasksByFilter = computed(() => {
    const filter = this.filters()
    const tasks = this.tasksSignal()
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }

    return tasks;
  });
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  })
  injector = inject(Injector)

  constructor() {

  }

  ngOnInit() {
    const tasksStorage = localStorage.getItem('tasks');
    if (tasksStorage) {
      const tasks = JSON.parse(tasksStorage)
      this.tasksSignal.set(tasks)
    }
    this.trackingTasks()
  }
  // methods
  trackingTasks() {
    effect( () =>  {
      const tasks = this.tasksSignal()
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, {
      injector: this.injector
    })
  }
  changeHandler(): void
  {
    if (this.newTaskCtrl.valid) {
      const value = (this.newTaskCtrl.value).trim();
      if (value != '') {
        this.addNewTask(value)
        this.newTaskCtrl.setValue('')
      }
    }
  }

  inputNewToDo(event: Event): void
  {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.addNewTask(value)
  }

  /**
   * add new task require a title type string
   * @param tittle
   */
  addNewTask(tittle: string): void {
    const newTask = {
      id: Date.now(),
      tittle: tittle,
      completed: false,
    }

    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  /**
   * method to remove a task from the list
   */
  deleteTask(index: number):void
  {
    this.tasksSignal.update(tasks => tasks.filter((task, position) => position !== index));
  }

  /**
   * update a task looking by index and update
   * completed state
   */
  markTaskCompleted(index: number): void
  {
    this.tasksSignal.update(tasks => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  /**
   * update the boolean state of Editing property
   * @param index
   */
  updateTaskEditingMode(index: number) {
    this.tasksSignal.update(tasks => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }

  /**
   * update the title of the task in editing mode
   * @param index
   * @param event
   */
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.tasksSignal.update(tasks => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            tittle: value,
            editing: false,
          }
        }
        return task
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filters.set(filter)
  }

  protected readonly filter = filter;
}

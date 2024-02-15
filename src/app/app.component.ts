import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoApp';
  welcome = 'Welcome to the Todo App';
  tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
}

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos = signal([
    {
      id: 1,
      title: "Testing 1",
      completed: true
    }
  ]);
}

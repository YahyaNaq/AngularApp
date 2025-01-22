import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { HighlightCompletedTodoDirective } from '../../directive/highlight-completed-todo.directive';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodoDirective],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  todo = input.required<Todo>();
  todoToggled = output<void>();

  toggleTodo() {
    this.todoToggled.emit();
  }

}

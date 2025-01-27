import { Component, input, OnInit, output, signal } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { HighlightCompletedTodoDirective } from '../../directive/highlight-completed-todo.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodoDirective, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  todo = input.required<Todo>();
  todoToggled = output<void>();
  todoEditClicked = output<void>();
  todoUpdated = output<void>();
  todoDeleted = output<void>();

  toggleTodo() {
    this.todoToggled.emit();
  }

  handleEditClick() {
    this.todoEditClicked.emit();
  }

  updateTodo() {
    this.handleEditClick();
    this.todoUpdated.emit();
  }

  deleteTodo() {
    this.todoDeleted.emit();
  }
}

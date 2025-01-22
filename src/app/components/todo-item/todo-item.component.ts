import { Component, input, output, signal } from '@angular/core';
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
  todoUpdated = output<void>();
  todoDeleted = output<void>();
  isEditing = signal(false);
  todoEditTitle = signal("");

  toggleTodo() {
    this.todoToggled.emit();
  }

  toggleEditField() {
    this.isEditing.update((val) => !val);
  }

  updateTodo() {
    this.toggleEditField();
    this.todoUpdated.emit();
  }

  deleteTodo() {
    this.todoDeleted.emit();
  }
}

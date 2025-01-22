import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../service/todos.service';
import { Todo } from '../model/todo.type';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { catchError, throwError } from 'rxjs';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FilterTodosPipe, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {

  todoService = inject(TodosService);
  todos = signal<Array<Todo>>([]);
  searchValue = signal('');

  ngOnInit(): void {

    this.todoService.getTodos()
    .pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Failed to fetch todos'));
      })
    )
    .subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  toggleTodos(todoId: number) {
    this.todos.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }

        return todo;
      });
    });
  }
}

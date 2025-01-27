import { ChangeDetectionStrategy, Component, Inject, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../service/todos.service';
import { Todo } from '../model/todo.type';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { catchError, throwError } from 'rxjs';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { 
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle, 
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditTodoFormComponent } from './forms/edit-todo-form/edit-todo-form.component';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FilterTodosPipe, FormsModule, MatButtonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {

  todoService = inject(TodosService);
  todos = signal<Array<Todo>>([]);
  searchValue = signal('');
  readonly dialog = inject(MatDialog);

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

  openEditDialog(todo: Todo): void {
    console.log(todo);
    const dialogRef = this.dialog.open(EditTodoDialog, {
      data: todo,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleTodo(todoId: number) {
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

  deleteTodo(todoId: number) {
    const index = this.todos().findIndex(todo => todo.id === todoId);

    if (index !== -1) {
      this.todos().splice(index, 1);
    }
  }

  updateTodo(todoId: number) {
    const index = this.todos().findIndex(todo => todo.id === todoId);

    if (index !== -1) {
      this.todos()[index].title = "Yes";
    }
  }
}

@Component({
  selector: 'edit-todo-dialog',
  templateUrl: 'edit-todo-dialog.html',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    EditTodoFormComponent
  ],

})
export class EditTodoDialog {

  readonly dialogRef = inject(MatDialogRef<EditTodoDialog>);
  readonly data = inject<Todo>(MAT_DIALOG_DATA)

  onNoClick(): void {
    this.dialogRef.close();
  }
}

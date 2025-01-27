import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Todo } from '../../../model/todo.type';

interface TodoEditForm {
  title: FormControl<string>;
}

const todo = new FormGroup<TodoEditForm>({
  title: new FormControl('', {nonNullable: true}),
});

@Component({
  selector: 'app-edit-todo-form',
  imports: [FormsModule],
  templateUrl: './edit-todo-form.component.html',
  styleUrl: './edit-todo-form.component.css'
})
export class EditTodoFormComponent {
  todo = input<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0
  });
}

import { inject, Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }
}

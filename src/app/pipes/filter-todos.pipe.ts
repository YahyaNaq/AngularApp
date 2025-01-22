import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos: Todo[], searchValue: string): Todo[] {
    if (!searchValue) {
      return todos;
    }

    const searchTerm = searchValue.toLowerCase();

    return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(searchTerm);
    });
  }

}

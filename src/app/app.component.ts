import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [
    `
      main {
        padding-inline: 20px;
      }
    `
  ],
})
export class AppComponent {
  title = 'angular-app';
}

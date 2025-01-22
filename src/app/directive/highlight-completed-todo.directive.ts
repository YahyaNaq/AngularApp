import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodoDirective {
  isCompleted = input(false);
  el = inject(ElementRef);

  styleEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.opacity = '50%';
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.opacity = '100%';
    }
  });
}

import { query, transition, trigger } from "@angular/animations";

export const PreventInitialChildAnimations =
  trigger('preventInitialChildAnimations', [
    transition(':enter', [
      query(':enter', [], { optional: true })
    ])
  ]);
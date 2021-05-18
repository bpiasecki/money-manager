import { animate, style, transition, trigger } from "@angular/animations";

export const ShowHideMainPage =
    trigger('showHideMainPage', [
        transition(':enter', [
            style({ transform: 'scale(0.7)', opacity: 0 }),
            animate('.2s ease-out', style({ transform: 'scale(1)', opacity: 0.9 }))
        ]),
        transition(':leave', [
            style({ transform: 'scale(1)', opacity: 0.9 }),
            animate('.2s ease-out', style({ transform: 'scale(0.7)', opacity: 0 }))
        ])
    ])
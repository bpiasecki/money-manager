import { animate, style, transition, trigger } from "@angular/animations";

export const ShowHideButtonAnimation =
    trigger('showHideButton', [
        transition(':enter', [
            style({ transform: 'translateY(-25px)', height: 0, opacity: 0, marginBottom: 0 }),
            animate('.4s ease-out', style({ transform: 'translateY(0)', height: 36, opacity: 1, marginBottom: 26 }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', height: 36, opacity: 1, marginBottom: 26 }),
            animate('.4s ease-in', style({ transform: 'translateY(-25px)', height: 0, opacity: 0, marginBottom: 0 }))
        ])
    ]);
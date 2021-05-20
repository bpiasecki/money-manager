import { animate, style, transition, trigger } from "@angular/animations";

export const ShowHideCheckboxAnimation =[
    trigger('showHideCheckbox', [
        transition(':enter', [
            style({ transform: 'translateY(-25px)', height: 0, opacity: 0 }),
            animate('.3s ease-out', style({ transform: 'translateY(0)', height: 24, opacity: 1 }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', height: 24, opacity: 1 }),
            animate('.3s ease-in', style({ transform: 'translateY(-25px)', height: 0, opacity: 0 }))
        ])
    ]),
    trigger('showHideCheckboxWithMargin', [
        transition(':enter', [
            style({ transform: 'translateY(-25px)', height: 0, opacity: 0, marginBottom: 0 }),
            animate('.3s ease-out', style({ transform: 'translateY(0)', height: 24, opacity: 1, marginBottom: 15 }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', height: 24, opacity: 1, marginBottom: 15 }),
            animate('.3s ease-in', style({ transform: 'translateY(-25px)', height: 0, opacity: 0, marginBottom: 0 }))
        ])
    ])
]
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';


export const commentsTrigger = trigger('commentsTrigger', [
    state('show', style({
    })),

    transition('void => show', [
        style({
            height: 0
        }),

        animate(300, style({
        }))
    ]),

    transition('show => void', [
        animate(300, style({
            height: 0
        }))
    ])

]);

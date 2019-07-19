import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';


export const commentsTrigger = trigger('commentsTrigger', [
    state('show', style({
        maxHeight: '250px'
    })),

    transition('void => show', [
        style({
            maxHeight: 0
        }),

        animate(800, style({
            maxHeight: '250px'
        })),

    ]),

    transition('show => void', animate(500, style({
        maxHeight: 0
    })))

]);

import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),

    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ], { optional: true }),
    query(':enter', [
      style({ 
        opacity: 0, 
        transform: 'translateY(30px) scale(0.98)' 
      })
    ], { optional: true }),

    group([

      query(':leave', [
        animate('400ms ease-in-out', style({ 
          opacity: 0, 
          transform: 'translateY(-30px) scale(0.98)' 
        }))
      ], { optional: true }),

     
      query(':enter', [
        animate('400ms ease-in-out', style({ 
          opacity: 1, 
          transform: 'translateY(0) scale(1)' 
        }))
      ], { optional: true })
    ])
  ])
]);

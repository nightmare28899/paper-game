import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export let fade = trigger('fade', [
  state('void', style({ opacity: 0 })),

  transition('void => *', [animate(1000)]),
]);

export let flyInOut = trigger('flyInOut', [
  transition('void => *', [
    style({ transform: 'translateX(50%)' }),
    animate('1200ms 4150ms'),
  ])
]);

export let flyInOutR = trigger('flyInOutR', [
  transition('void => *', [
    style({ transform: 'translateX(-50%)' }),
    animate('1200ms 4150ms'),
  ])
]);

export let myInsertRemoveTrigger = trigger('myInsertRemoveTrigger', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
]);

export let myInsertRemoveTrigger2 = trigger('myInsertRemoveTrigger2', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1000ms', style({ opacity: 0 })),
  ]),
  transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
]);

export let shrinkOut = trigger('shrinkOut', [
  state('in', style({ height: '*' })),
  transition('* => void', [
    style({ height: '*' }),
    animate(250, style({ height: 0 })),
  ]),
]);

export let childAnimation = trigger('childAnimation', [
  transition(
    ':enter',
    [
      animate('2000ms {{delay}}ms', style({ transform: 'translateX(80%)' })),
      animate('2000ms', style({ transform: 'translateX(0)' })),
    ],
    { params: { delay: 2000 } }
  ),
]);

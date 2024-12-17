import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({ backgroundColor: 'blue', transform: 'translateX(0)' })
      ),
      state(
        'highlighted',
        style({ backgroundColor: 'red', transform: 'translateX(100px)' })
      ),
      transition('normal <=> highlighted', animate(300)),
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({ backgroundColor: 'blue', transform: 'translateX(0) scale(1)' })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'red',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          backgroundColor: 'grey',
          transform: 'translateX(0) scale(0.5)',
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({ backgroundColor: 'orange' }),
        animate(1000, style({ borderRadius: '50px' })),
        animate(500),
      ]),
    ]),
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(300, style({ opacity: 100, transform: 'translateX(0)' })),
      ]),
      transition('*=>void', [
        group([
          animate(300, style({ color: 'red', opacity: 0 })),
          animate(500, style({ transform: 'translate(100px)' })),
        ]),
      ]),
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(
          3000,
          keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.8,
              offset: 0.3,
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: 'translateX(0)',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('*=>void', [
        group([
          animate(300, style({ color: 'red', opacity: 0 })),
          animate(500, style({ transform: 'translate(100px)' })),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  @ViewChild('inputRef') input!: ElementRef;
  state: string = 'normal';
  wildState: string = 'normal';
  list: string[] = ['foo', 'bar', 'baz'];

  onAdd() {
    this.list.push(this.input.nativeElement.value);
    this.input.nativeElement.value = '';
    this.input.nativeElement.focus();
  }
  onAnimate() {
    this.state = this.state == 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState == 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onDelete(index: number) {
    this.list.splice(index, 1);
  }

  animationStarted(event: any) {
    console.log(event);
  }
  animationDone(event: any) {
    console.log(event);
  }
}

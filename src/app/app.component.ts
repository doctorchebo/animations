import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('inputRef') input!: ElementRef;
  list: string[] = ['foo', 'bar', 'baz'];

  onAdd() {
    this.list.push(this.input.nativeElement.value);
    this.input.nativeElement.value = '';
    this.input.nativeElement.focus();
  }
  onAnimate(){}

  onShrink(){}
}

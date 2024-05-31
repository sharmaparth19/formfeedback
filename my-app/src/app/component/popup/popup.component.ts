import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() title: string  = '';
  @Input() message: string = '';
  @Output() closed = new EventEmitter<void>();

  closePopup() {
    this.closed.emit();
  }
}

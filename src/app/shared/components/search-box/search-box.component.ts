import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  @Input()
  public placeHolder: string = '';

  @Output() textValueEvent = new EventEmitter<string>();

  textValue(value : string):void {
    this.textValueEvent.emit(value);
  }

}

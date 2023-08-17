import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  private debouncer : Subject<string> = new Subject<string>();

  @Input()
  public placeHolder: string = '';

  @Output() textValueEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => {
      this.textValueEvent.emit(value);
    });
  }

  debouncedValue(value : string):void {
    this.debouncer.next(value);
  }

}

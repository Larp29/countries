import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer : Subject<string> = new Subject<string>();
  private debouncerSubscription ?: Subscription;

  @Input()
  public placeHolder: string = '';

  @Input()
  public initialValue: string = '';

  @Output() textValueEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => {
      this.textValueEvent.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  debouncedValue(value : string):void {
    this.debouncer.next(value);
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  
  private activeQuery: string = '';
  inputChanged: Subject<string> = new Subject<string>();

  @Input() query: string;
  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }
  
  ngOnInit() {
    this.inputChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged() 
      )
      .subscribe(( value: string ) => {
        this.searchEvent.emit(value);
      });

    this.activeQuery = this.query;
  }

  public onQueryChange(event: Event): void {
    this.inputChanged.next((<HTMLInputElement>event.target).value);
  }

  public search(): void {
    this.searchEvent.emit(this.activeQuery);
  }

}

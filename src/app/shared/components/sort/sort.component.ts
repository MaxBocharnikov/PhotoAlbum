import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  @Output() onchangeSortType = new EventEmitter();
  @Input('profileMod') profileMod = false;

  sortBy = 'New';
  constructor() { }

  ngOnInit() {}

  onSortChange(event) {
      this.sortBy = event.target.value;
      this.onchangeSortType.emit(this.sortBy);
  }
}

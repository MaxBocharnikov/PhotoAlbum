import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

enum SortTypes {
    new = 'New',
    popular = 'Popular',
    alphabetical = 'Alphabetical'
};


@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  @Output() onchangeSortType = new EventEmitter();

  sortBy = SortTypes.new;
  sortTypes = SortTypes;
  constructor() { }

  ngOnInit() {
  }

  onSortChange(event) {
      this.sortBy = event.target.value;
      this.onchangeSortType.emit(this.sortBy);
  }
}

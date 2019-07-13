import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  @Output() onchangeSortType = new EventEmitter();
  @Input('profileMod') profileMod = false;

  sortBy = 'new';
  constructor() { }

  ngOnInit() {}

  changeSortType(type: string) {
      this.sortBy = type;
      this.onchangeSortType.emit(this.sortBy);
  }

}

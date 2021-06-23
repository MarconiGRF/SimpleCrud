import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() warns: any;
  @Input() isLoadingWarns: boolean;
  @Output() warnFocus: EventEmitter<string>;
  isAdding: boolean;

  constructor() {
    this.isLoadingWarns = false;
    this.isAdding = false;
    this.warnFocus = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  updateWarnView(warnId: string): void {
    this.warnFocus.emit(warnId)
  }
}

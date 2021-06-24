import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() warns: any;
  @Input() isLoadingWarns: boolean;
  @Input() hasNextPage: boolean;

  @Output() warnFocus: EventEmitter<string>;
  @Output() getWarnPage: EventEmitter<void>;

  isAdding: boolean;

  constructor() {
    this.isLoadingWarns = false;
    this.isAdding = false;
    this.hasNextPage = true;
    this.warnFocus = new EventEmitter<string>();
    this.getWarnPage = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  /**
   * Emits an event aiming to change the focused Warn on the WarnView
   * @param warnId - The ID of the warn to be focused
   */
  updateWarnView(warnId: string): void {
    this.warnFocus.emit(warnId)
  }
}

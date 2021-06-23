import { Component, Input, OnInit } from '@angular/core';
import { Warn } from "../../models/warn";

@Component({
  selector: 'app-warnview',
  templateUrl: './warnview.component.html',
  styleUrls: ['./warnview.component.css']
})
export class WarnviewComponent implements OnInit {

  @Input() currentWarn?: Warn;
  isEditing: boolean;

  constructor() {
    this.isEditing = false
  }

  ngOnInit(): void {
  }

  formatTime(milliseconds: number): string {
    const date = new Date(milliseconds);
    return date.getHours().toLocaleString() + ":" + date.getMinutes().toLocaleString()
  }

  getViewed(viewedAtValue?: number): string {
    if (viewedAtValue) {
      return 'at ' + this.formatTime(viewedAtValue);
    } else {
      return 'now';
    }
  }

}

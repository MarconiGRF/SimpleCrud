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

  /**
   * Given a {@param milliseconds} returns a string representing the time in a "HH:MM" format.
   * @param milliseconds - The Milliseconds number to generate the string from.
   */
  formatTime(milliseconds: number): string {
    const date = new Date(milliseconds);

    let hours = date.getHours().toLocaleString();
    if (hours.length < 2) {
      hours = "0" + hours;
    }

    let minutes = date.getMinutes().toLocaleString();
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }

    return hours + ":" + minutes;
  }

  /**
   * Gets the "Viewed at" string for a given {@param viewedAtValue}.
   * If the viewedAtValue is present, then the time of that value must be shown.
   * Otherwise it is assumed that the viewed time was "now" and returns this.
   * @param viewedAtValue - The "Viewed At" milliseconds value.
   */
  getViewed(viewedAtValue?: number): string {
    if (viewedAtValue) {
      return 'at ' + this.formatTime(viewedAtValue);
    } else {
      return 'now';
    }
  }

}

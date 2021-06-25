import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Warn } from "../../models/warn";
import {WarnsService} from "../../services/warns.service";

@Component({
  selector: 'app-warnview',
  templateUrl: './warnview.component.html',
  styleUrls: ['./warnview.component.css']
})
export class WarnviewComponent implements OnInit, OnChanges {

  @Input() currentWarn?: Warn;
  @Input() isAddOperation: boolean;

  @Output() deleteWarn: EventEmitter<string>;
  @Output() discardWarnChanges: EventEmitter<string>;
  @Output() updateWarnInfo: EventEmitter<Warn>;

  isEditing: boolean;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(private warnService: WarnsService) {
    this.isAddOperation = false;
    this.isEditing = false;
    this.deleteWarn = new EventEmitter<string>();
    this.discardWarnChanges = new EventEmitter<string>();
    this.updateWarnInfo = new EventEmitter<Warn>();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditing = false;
  }

  /**
   * Emits an event intended to delete a Warn containing its ID.
   */
  emitDelete(): void {
    this.deleteWarn.emit(this.currentWarn?.id)
  }

  /**
   * Given a {@param milliseconds} returns a string representing the time in a "HH:MM" format.
   * @param milliseconds - The Milliseconds number to generate the string from.
   */
  formatTime(milliseconds: number): string {
    const date = new Date(milliseconds);

    let day = date.getDate().toLocaleString();
    let month = this.monthNames[date.getMonth()];

    let hours = date.getHours().toLocaleString();
    if (hours.length < 2) {
      hours = "0" + hours;
    }

    let minutes = date.getMinutes().toLocaleString();
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }

    return day + " " + month + " - " + hours + ":" + minutes;
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


  /**
   * Toggles the variable that indicates editing mode.
   */
  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  /**
   * Emits an event intended to discard the current changes and fetch the Warn again.
   */
  discardChanges(): void {
    if (this.isEditing) {
      this.toggleEditMode();
    }

    if (this.currentWarn) {
      this.discardWarnChanges.emit(this.currentWarn.id)
    }
  }

  /**
   * Emits an event intended to update the visible warn.
   */
  updateWarn(): void {
    this.toggleEditMode();
    if (this.currentWarn) {
      if (this.isAddOperation) {
        this.isAddOperation = false;
      }
      this.updateWarnInfo.emit(this.currentWarn);
    }
  }

}

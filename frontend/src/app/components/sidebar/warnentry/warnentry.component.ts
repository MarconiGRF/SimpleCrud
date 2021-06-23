import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Warn} from "../../../models/warn";

@Component({
  selector: 'app-warnentry',
  templateUrl: './warnentry.component.html',
  styleUrls: ['./warnentry.component.css']
})
export class WarnentryComponent implements OnInit {

  @Input() warnMetadata: Warn;
  @Output() warnFocus: EventEmitter<string>;
  isViewed: boolean;

  constructor() {
    this.isViewed = false;
    this.warnFocus = new EventEmitter<string>();
    this.warnMetadata = {
      id: '',
      title: '',
      description: '',
      publishedAt: 0
    }
  }

  ngOnInit(): void {
    this.isViewed = !!this.warnMetadata.viewedAt;
  }

  emitFocus(): void {
    this.warnFocus.emit(this.warnMetadata.id)
  }

  truncate(text: string): string {
    if (text.length >= 25) {
      return text.slice(0, 25) + "...";
    } else {
      return text;
    }
  }

  formatTime(milliseconds: number): string {
    const date = new Date(milliseconds);
    return date.getHours().toLocaleString() + ":" + date.getMinutes().toLocaleString()
  }

}

import { Component, OnInit } from '@angular/core';
import { PageParams } from "../models/pageParams";
import { Warn } from "../models/warn";
import { WarnsService } from "../services/warns.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoadingWarns: boolean;
  pageParams: PageParams;
  title: string;
  visibleWarn?: Warn;
  warns: Warn[];

  constructor(private warnService: WarnsService) {
    this.isLoadingWarns = false;
    this.pageParams = {
      page: 0,
      pageSize: 5,
      sort: 'ASC'
    };
    this.title = 'Simple CRUD'
    this.warns = [];
  }

  /**
   * Upon initialization get the first Warn page available using the service.
   */
  ngOnInit(): void {
    this.isLoadingWarns = true
    this.warnService.getWarns(this.pageParams).subscribe(
      (warns) => {
        if (warns.length) {
          this.warns = warns
          this.pageParams.page++
        }
        this.isLoadingWarns = false
      },
      (error) => {
        console.error(error)
        this.isLoadingWarns = false
      })
  }

  /**
   * Changes the focused Warn on the Warn Viewer to the one specified by the given {@param warnId}.
   * @param warnId - The Warn ID to filter the warn on the available list.
   */
  changeFocus(warnId: string): void {
    const filteredWarnIndex = this.warns.findIndex(warn => warn.id === warnId)
    if (filteredWarnIndex !== -1) {
      this.visibleWarn = this.warns[filteredWarnIndex]
    }
  }
}

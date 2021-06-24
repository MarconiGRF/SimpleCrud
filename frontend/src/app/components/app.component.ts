import {Component, Input, OnInit} from '@angular/core';
import { PageParams } from "../models/pageParams";
import { Warn } from "../models/warn";
import { WarnsService } from "../services/warns.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasNextPage: boolean;
  isLoadingWarns: boolean;
  pageParams: PageParams;
  title: string;
  visibleWarn?: Warn;
  warns: Warn[];

  constructor(private warnService: WarnsService) {
    this.hasNextPage = true;
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
    this.loadWarnPage();
  }

  /**
   * Loads a Warn page based on the current page parameters.
   */
  loadWarnPage(): void {
    if (!this.hasNextPage) {
      return;
    }

    this.isLoadingWarns = true
    this.warnService.getWarns(this.pageParams).subscribe(
      (warns) => {
        if (warns.length) {
          this.warns.push(...warns);
          this.pageParams.page++;
          this.hasNextPage = true;
        } else {
          this.hasNextPage = false;
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
      this.updateViewed(filteredWarnIndex)
    }
  }

  /**
   * Update viewedAt attribute of warn if it doesn't already have one.
   * @param warnIndex - The Warn index on the available warns.
   */
  updateViewed(warnIndex: number): void {
    if (this.warns[warnIndex].viewedAt) {
      return;
    }

    this.warnService.updateViewed(this.warns[warnIndex].id).subscribe(
      (updatedWarn) => {
        this.warns[warnIndex] = updatedWarn;
      },
      (error) => {
        console.error(error);
      }
    )
  }
}

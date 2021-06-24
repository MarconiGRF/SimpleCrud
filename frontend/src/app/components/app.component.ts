import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    this.warnService.getPage(this.pageParams).subscribe(
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

  loadWarnById(warnId: string): void {
    this.warnService.getById(warnId).subscribe(
      (warn) => {
        const filteredWarnIndex = this.findWarnIndexById(warnId);
        this.warns[filteredWarnIndex] = warn;
        this.visibleWarn = this.warns[filteredWarnIndex];
      }
    )
  }

  /**
   * Changes the focused Warn on the Warn Viewer to the one specified by the given {@param warnId}.
   * @param warnId - The Warn ID to filter the warn on the available list.
   */
  changeFocus(warnId: string): void {
    const filteredWarnIndex = this.findWarnIndexById(warnId);
    if (filteredWarnIndex !== -1) {
      this.visibleWarn = this.warns[filteredWarnIndex]
      this.updateViewed(filteredWarnIndex)
    }
  }

  updatetWarn(warn: Warn): void {
    this.warnService.update(warn).subscribe(
      (result) => {
        if (!result) {
          this.loadWarnById(warn.id);
        }
      }
    )
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

  /**
   * Deletes a warn on the system by making a deleterequest to the service.
   * @param warnId - The ID of the Warn to be deleted.
   */
  deleteWarn(warnId: string): void {
    const filteredWarnIndex = this.findWarnIndexById(warnId);
    if (filteredWarnIndex != -1) {
      this.warnService.delete(this.warns[filteredWarnIndex].id).subscribe(
        (result) => {
          this.visibleWarn = undefined;
          this.warns = this.warns.splice(filteredWarnIndex, 1);
        }
      )
    }
  }

  /**
   * Given a Warn ID finds its index in available array.
   * @param warnId - The ID of the Warn to be found.
   * @return - The Warn index, if not found will return -1.
   */
  private findWarnIndexById(warnId: string): number {
    return this.warns.findIndex(warn => warn.id === warnId);
  }

}

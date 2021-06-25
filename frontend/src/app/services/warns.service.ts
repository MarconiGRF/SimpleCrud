import { Warn } from "../models/warn";
import { Injectable } from '@angular/core';
import { PageParams } from "../models/pageParams";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {PageResponse} from "../models/pageResponse";

@Injectable({
  providedIn: 'root'
})
export class WarnsService {
  warns: Warn[];
  baseURL = "http://localhost:8080/warns/";

  constructor(private httpClient: HttpClient) {
    this.warns = [];
  }

  /**
   * Fetches the warns from the Backend using Http Client.
   * @param pageParams - The page params.
   * @return Warn[] - The array of warns available.
   */
  getPage(pageParams: PageParams): Observable<Warn[]> {
    const options = {
      params: this.buildGetParams(pageParams)
    };
    return this.httpClient.get<any>(this.baseURL, options).pipe(
      map((response: PageResponse) => {
        return response.content;
      }),
      catchError(() => {
        throw new Error("Error on fetching warns!");
      })
    );
  }

  /**
   * Fetches a Warm by its ID.
   * @param warnId - The ID of the warn to be fetched.
   */
  getById(warnId: string): Observable<Warn> {
    return this.httpClient.get<Warn>(this.baseURL + warnId).pipe(
      map((response) => {
        if (!!response) {
          return  response;
        } else {
          throw new Error("Warn not found!");
        }
      })
    )
  }

  /**
   * Creates a Warn on the backend by making a POST request to it.
   * @param warn - The info of the Warn to be created.
   */
  create(warn: Warn): Observable<Warn> {
    return this.httpClient.post<Warn>(this.baseURL, warn).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        throw new Error("Error on creating warn!");
      })
    );
  }

  /**
   * Given a Warn ID makes an delete request to the Backend intended to delete a Warn.
   * @param warnId
   * @return boolean - True if operation was succeeded, false otherwise.
   */
  delete(warnId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.baseURL + warnId).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        throw new Error(`Error on deleting warn ${warnId}`);
      })
    );
  }

  update(warn: Warn): Observable<boolean> {
    return this.httpClient.put<boolean>(this.baseURL, warn).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        throw new Error("Error on updating warn.")
      })
    );
  }

  /**
   * Makes an update to the updateView endpoint for the given warnId.
   * @param warnId - The ID of the Warn to be updated.
   */
  updateViewed(warnId: string): Observable<Warn> {
    return this.httpClient.put<Warn>(this.baseURL + warnId, null).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        throw new Error("Error on updating warn's viewed attribute!")
      })
    );
  }

  /**
   * Builds the page params into a {@link HttpParams} instance.
   * @param params - The page params information to compose the HttpParams object.
   * @return HttpParams - The http params.
   */
  buildGetParams(params: PageParams): HttpParams {
    let requestParams = new HttpParams();
    requestParams = requestParams.append('page', params.page);
    requestParams = requestParams.append('pageSize', params.pageSize);
    requestParams = requestParams.append('sort', params.sort);

    return requestParams;
  }

}

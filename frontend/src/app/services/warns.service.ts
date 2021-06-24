import { Warn } from "../models/warn";
import { Injectable } from '@angular/core';
import { PageParams } from "../models/pageParams";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import {PageResponse} from "../models/pageResponse";

@Injectable({
  providedIn: 'root'
})
export class WarnsService {
  baseURL = "http://localhost:8080/warns/";

  constructor(private httpClient: HttpClient) { }

  /**
   * Fetches the warns from the Backend using Http Client.
   * @param pageParams - The page params.
   * @return Warn[] - The array of warns available.
   */
  getWarns(pageParams: PageParams): Observable<Warn[]> {
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

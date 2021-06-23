import { Warn } from "../models/warn";
import { Injectable } from '@angular/core';
import { PageParams } from "../models/pageParams";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WarnsService {
  baseURL = "http://localhost:8080/warns";

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
    return this.httpClient.get<Warn[]>(this.baseURL, options).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        throw new Error('Error on fetching warns.');
      })
    );
  }

  /**
   * Builds the page params into a {@link HttpParams} instance.
   * @param params - The page params information to compose the HttpParams object.
   * @return HttpParams - The http params.
   */
  buildGetParams(params: PageParams): HttpParams {
    const requestParams = new HttpParams();
    requestParams.append('page', params.page);
    requestParams.append('pageSize', params.pageSize);
    requestParams.append('sort', params.sort);

    return requestParams;
  }
}

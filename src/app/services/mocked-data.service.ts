import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

//Mocked Data
import { MockedData } from '@interfaces/mockedData';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockedDataService {

  constructor(private http: HttpClient) { }

  getAlarms(): Observable<any> {
    
    //console.log("HOLA")

    return this.http.get<any>("../assets/data/mockedDataAlarms.json").pipe(
      catchError( _ => throwError( () => new Error( "Couldn't get data!" )))
    )
  }

  getStatistics(): Observable<any> {
    
    //console.log("HOLA")

    return this.http.get<any>("../assets/data/mockedDataStatistics.json").pipe(
      catchError( _ => throwError( () => new Error( "Couldn't get data!" )))
    )
  }

}

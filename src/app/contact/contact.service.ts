import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { contactError } from '../models/contactError.model';
import { ContactErrorHandlerService } from './contact-error-handler-service.service';
import { renameMe } from '../models/renameMe.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient, private apiService: ApiService,
    private errorHandler: ContactErrorHandlerService) { }

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  public makeAsyncCall(): Observable<any | contactError> {
    console.log('making async call');
    return this.http.get<any>(`https://reqres.in/api/users`, { headers: this.headers }).pipe(
      catchError(this.errorHandler.customErrorHandle)
    );
  }

  public performDataTransformation(): Observable<any | contactError> {
    console.log('making transformation call');
    return this.http.get<any>('https://reqres.in/api/users', { headers: this.headers }).pipe(
      map(r => <renameMe>{
        id: r.data[0].id
      }),
      tap(renameMe => console.log(renameMe, 'this is the mapped rename me.'))
    );
  }

  //Note that a post will generally use the same api address. 
  public writeSomeData(newThingToAdd: renameMe): Observable<renameMe> {
    return this.http.post<renameMe>('https://reqres.in/api/users', newThingToAdd, { headers: this.headers })
  }

  //Note that put will traditionally want an id or something appended to the url. Depends on the API. 
  public updateSomeData(updateSomeData: renameMe): Observable<void> {
    return this.http.put<void>(`https://reqres.in/api/users/${updateSomeData.id}`, updateSomeData, { headers: this.headers })
  }

  public deleteSomeData(deleteSomeData: renameMe): Observable<void> {
    return this.http.delete<void>(`https://reqres.in/api/users/${deleteSomeData.id}`); 
  }
}


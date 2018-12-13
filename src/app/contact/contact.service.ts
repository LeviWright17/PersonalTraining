import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { contactError } from '../models/contactError.model';
import { ContactErrorHandlerService } from './contact-error-handler-service.service';


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
    return this.http.get<any>(`https://reqres.in/api/users`, {headers: this.headers}).pipe(
      catchError(this.errorHandler.customErrorHandle)
    );
  }
}

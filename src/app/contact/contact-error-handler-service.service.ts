import { Injectable, ErrorHandler } from '@angular/core';
import { contactError } from '../models/contactError.model'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactErrorHandlerService {

  constructor() { }

  public customErrorHandle(error: HttpErrorResponse): Observable<contactError> {
    console.log('ENTERING CUSTOM ERROR HANDLER');  
    let dataError = new contactError(); 
    dataError.errorNumber = 100; 
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error ocurred retrieving data'; 
    return throwError(dataError); 
  }
}

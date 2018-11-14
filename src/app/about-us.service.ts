import { Injectable } from '@angular/core';
import { Observable, range } from 'rxjs'; 
import { map, filter, catchError, tap } from 'rxjs/operators'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AboutUsService {

  constructor(private http: HttpClient) { }

  getAboutUsData(): Observable<any>{
    return this.http.get("https://reqres.in/api/users/2").pipe(
      tap(data => console.log('All:' + JSON.stringify(data)))
      // catchError(this.handleError)
    ); 
  }

  private handleError(error: HttpErrorResponse){
    //can send to a logging service, database, console etc. 
  }
}


//Methods that you'll want: 
//--> Maybe a method to get a photo.
//--> Resume will be done in HTML
//--> Get customer reviews and render them from the db.
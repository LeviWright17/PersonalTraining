import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, range } from 'rxjs'; 
import { map, filter, catchError, tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContactData(): Observable<any>{
    //https://reqres.in/api/users/2"
      // return this.http.get("/contact").pipe(
      //   tap(data => console.log('All:' + JSON.stringify(data)))
      // ); 
      return new Observable(); 
    }

  postContactData(postBody){
    // this.http.post("/contact/sendMessage", postBody, {}); 
  }  
}

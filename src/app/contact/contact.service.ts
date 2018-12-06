import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

 private asyncData: any; 

  constructor(private http: HttpClient, private apiService: ApiService) {

  }




  
  public makeAsyncCall(): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users`);    
  }
}

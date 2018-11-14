import { Injectable } from '@angular/core';
import { Observable, range } from 'rxjs'; 
import { map, filter } from 'rxjs/operators'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AboutUsService {

  constructor(private http: HttpClient) { }

  getAboutUsData(){
    const source$: Observable<number> = range(0, 10); 
    
    //This is an example of an observable. 
    // source$.pipe(
    //   map(x => x * 3),
    //   filter(x => x % 2 === 0)
    // ).subscribe(x => console.log(x)); 

    var response = this.http.get("https://reqres.in/api/products/3"); 
    return response; 
  }
}

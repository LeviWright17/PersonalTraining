import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    let dataError = new Error(); 
    dataError.name = error.name;  
    dataError.message = (<Error>error).message;
    console.log(dataError); 
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service'; 

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private apiService: ApiService) {

   }

   public postContactInquiry(endpoint: string): void {
      this.apiService.post(endpoint).subscribe();//You'll probably nened to  
   }
}

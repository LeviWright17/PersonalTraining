import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  providers: [ServicesService],
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadCustomerReviews(); 
  }

  loadCustomerReviews(){
    //Make an api call to get all reviews from the db.
  }

  postNewReview(){
    //Make an api call to post a new review.
    this.loadCustomerReviews(); 
  }

  //Methods you'll want: 
  //--> most everything will be rendered via html. 
  //--> Post a review
  //--> Get all reviews
  //--> Maybe look into combining services into one single
  //service that will make all calls to the API. 

}

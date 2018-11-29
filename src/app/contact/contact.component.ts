import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { potentialCustomer } from '../models/potentialCustomer.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  providers: [ContactService],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private interests = [
    'General Soccer Fitness', 
    'Idividual Attacking', 
    'Individual Defending', 
    'Passing Techniques',
    'Ball Striking / Finishing',
    'Aggression',
    'Crossing / Assisting',
    'Weak Foot Improvement',
    'Juggling / First Touch',
    'Heading / Air Challenges',
    'Finesse / Ball Handling', 
    'Tryout Preparation',
    'Speed of Play',
    'Other' 
  ];

  private potentialCustomer: potentialCustomer = new potentialCustomer(); 

  constructor(private contactService: ContactService) {
    this.potentialCustomer.primaryInterest = ''; 
   }

  ngOnInit() {
    // // var result = this.ContactService.getAboutUsData().subscribe(); 
    // var result = this.contactService.getContactData().subscribe(); 
    // console.log(result, 'this is the result my dude'); 
    
  }

  verifyEmailContentValid(){

  }
  
  sendEmail(){
    //send the potentialCustomer object to the server to post the data for communication. 
    console.log(this.potentialCustomer, 'THIS IS THE POTENTIAL CUSTOMER DATA'); 
  }
  
  //Methods you'll want: 
  //--> A post method to send an email.

}

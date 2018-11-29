import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  providers: [ContactService],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  public interests = [
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


  ngOnInit() {
    // // var result = this.ContactService.getAboutUsData().subscribe(); 
    // var result = this.contactService.getContactData().subscribe(); 
    // console.log(result, 'this is the result my dude'); 
  }

  verifyEmailContentValid(){

  }
  
  sendEmail(){

  }
  
  //Methods you'll want: 
  //--> A post method to send an email.

}

import { Component, OnInit } from '@angular/core';
import { potentialCustomer } from '../models/potentialCustomer.model';
import { potentialCustomerError } from '../models/potentialCustomerError.model';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  // providers: [ContactService],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  //Move all of these to an enum when you get a chance.
  private fieldIsEmptyErrorText = 'This is a required field';

  private numberOfTrainees =[
    1, 2, 3, 4, 5
  ]

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

  private communicationPreferences = [
    'Email',
    'Text',
    'Phone Call'
  ]

  private potentialCustomer: potentialCustomer = new potentialCustomer(); 
  private potentialCustomerError: potentialCustomerError = new potentialCustomerError(); 


  constructor() {
    this.potentialCustomer.primaryInterest = ''; 
    this.potentialCustomer.communicationPreference = ''; 
    this.potentialCustomer.numberOfTrainees = ''; 
    this.potentialCustomerError.nameError = this.fieldIsEmptyErrorText;
    this.potentialCustomerError.nameErrorFlag = false;
   }

  ngOnInit() {
    // // var result = this.ContactService.getAboutUsData().subscribe(); 
    // var result = this.contactService.getContactData().subscribe(); 
    // console.log(result, 'this is the result my dude'); 
    
  }

  public sendEmail(){
    //send the potentialCustomer object to the server to post the data for communication. 
    console.log(this.potentialCustomer, 'THIS IS THE POTENTIAL CUSTOMER DATA'); 
  }

  public verifyNameInput(userInput){
    if (this.isTextFieldNullorEmpty(userInput)){
      this.potentialCustomerError.nameErrorFlag = true;
    }
  }

  public isTextFieldNullorEmpty(userInput : string){
    console.log(userInput)
    if(this.isTextFieldUndefined(userInput)){
      return true;
    }
    else if(this.isTextFieldEmpty(userInput)){
      return true;
    }
  } 

  private isTextFieldEmpty(input : string): boolean {
    return input.length <= 0 || input === null || input === '';  
  }

  private isTextFieldUndefined(input: string): boolean{
    return input === undefined
  }
}

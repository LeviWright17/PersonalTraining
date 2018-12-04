import { Component, OnInit } from '@angular/core';
import { potentialCustomer } from '../models/potentialCustomer.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 

function phoneNumberRange(control: AbstractControl): { [key: string]: boolean }  | null {
  if(control.value !== null && (isNaN(control.value))){
    return {'range': true}
  }
  return null; 
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  // providers: [ContactService],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public numberOfTrainees =[
    1, 2, 3, 4, 5
  ]

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

  public communicationPreferences = [
    'Email',
    'Text',
    'Phone Call'
  ]
  
  contactForm: FormGroup; 
  name = new FormControl(); 
  email = new FormControl(); 
  phone = new FormControl(); 
  communicationPreference = new FormControl(); 
  primaryInterest = new FormControl(); 
  additionalComments = new FormControl(); 
  
  public potentialCustomer: potentialCustomer = new potentialCustomer(); 


  constructor(private formBuilder: FormBuilder) {
    this.potentialCustomer.primaryInterest = ''; 
    this.potentialCustomer.communicationPreference = ''; 
   }

  ngOnInit() : void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]], 
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      communicationPreference: ['email'],
      primaryInterest: [''],
      additionalComments: ['', [Validators.required, Validators.minLength(20)]] 
    })
  }

  public setCommunicationPreference(selectedCommunicationPreference: string) : void {
    const emailControl = this.contactForm.get('email'); 
    if(selectedCommunicationPreference === 'email'){
      emailControl.setValidators([Validators.required, Validators.email]); 
    }
    else{
      emailControl.clearValidators(); 
    }
    emailControl.updateValueAndValidity(); 
  }

  public sendEmail(){
    console.log("YAY"); 
  }



  


// VERY USEFUL TO REMEMBER!!

//----THE OLD WAY OF DOING THIS ----

// public defaultsSomeOfYourStuff(){
//   this.contactForm.patchValue({
//     //same thing here as below
//   })
// }

  // public thisWillDefaultYourTextboxesEtc(){
      //patch value requires that ALL fields in the form group are filled out, otherwise, 
      //you will get an error. 
    // this.contactForm.setValue({
      // name: 'someName',
      // email: 'someemail',
      // phone: 'some phone', 
      // communicationPreference: 'select',
      // primaryInterest: 'select',
      // additionalComments: 'comments'
    // })
  // }

  //-- THE FORM BUILDER WAY OF DOING THIS -- 
  //--> this is what you're actually using. Notice that you default to an empty string in 
  //    your select boxes, and that makes your default disabled value of -select-

  // ngOnInit() : void {
  //   this.contactForm = this.formBuilder.group({
  //     name: '', 
  //     email: '',
  //     phone: '', 
  //     communicationPreference: '',
  //     primaryInterest: '',
  //     additionalComments: ''
  //   })
  // }
}

import { Component, OnInit } from '@angular/core';
import { potentialCustomer } from '../models/potentialCustomer.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, AbstractControlOptions } from '@angular/forms';

//This is an example of how to do a custom validator. Custom validators can only take in 
//one argument, which is the abstract control. 
// function phoneNumberRange(control: AbstractControl): { [key: string]: boolean }  | null {
//   if(control.value !== null && (isNaN(control.value))){
//     return {'range': true}
//   }
//   return null; 
// }

//If you want a validator that can take in more arguments, you have to get tricky and create
//a factory function like this : 
// function ratingRange(min: number, max: number): ValidatorFn {
//   return (c: AbstractControl): { [key: string]: boolean } | null => {
//     if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
//       return { 'range': true }
//     }
//     return null;
//   }
// }

function matchEmailFields(control: AbstractControl): { [key: string]: boolean } | null {
  const startControl = control.get('email'); 
  const endControl = control.get('confirmEmail'); 
  if (startControl.pristine || endControl.pristine) {
    return null;
  }

  if (startControl.value === endControl.value) {
    return null;
  }
  return { 'match': true }
}

function matchPhoneFields(control: AbstractControl): { [key: string]: boolean } | null {
  const startControl = control.get('phone'); 
  const endControl = control.get('confirmPhone'); 

  if (startControl.pristine || endControl.pristine) {
    return null;
  }

  if (startControl.value === endControl.value) {
    return null;
  }
  return { 'match': true }
}


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  // providers: [ContactService],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  numberOfTrainees = [
    1, 2, 3, 4, 5
  ]

  interests = [
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

  communicationPreferences = [
    'Email',
    'Text',
    'Phone Call'
  ]

  defaultCommunicationPreference: string = 'phone';
  requiredEmailErrorText: string = 'Must have a valid email.';
  nonRequiredEmailErrorText: string = 'Email address is invalid';
  requiredPhoneErrorText: string = 'Must have a valid phone number';
  nonRequiredPhoneErrorText: string = 'Phone number is invalid'

  emailError: string;
  phoneError: string;

  contactForm: FormGroup;
  name = new FormControl();
  email = new FormControl();
  confirmEmail = new FormControl();
  phone = new FormControl();
  confirmPhone = new FormControl();
  communicationPreference = new FormControl();
  primaryInterest = new FormControl();
  additionalComments = new FormControl();

  potentialCustomer: potentialCustomer = new potentialCustomer();

  constructor(private formBuilder: FormBuilder) {
    this.potentialCustomer.primaryInterest = '';
    this.potentialCustomer.communicationPreference = '';
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.email]],
        confirmEmail: ['', [Validators.email]]
      }, {
          validator: matchEmailFields
        }),
      phoneGroup: this.formBuilder.group({
        phone: ['', [Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
        confirmPhone: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      }, {
          validator: matchPhoneFields
        }),
      communicationPreference: [this.defaultCommunicationPreference],
      primaryInterest: [''],
      aboutMe: ['', Validators.required]
    })

    this.setCommunicationPreference(this.defaultCommunicationPreference);
  }

  public setCommunicationPreference(selectedCommunicationPreference: string): void {
    const emailControl = this.contactForm.get('emailGroup.email');
    const confirmEmailControl = this.contactForm.get('emailGroup.confirmEmail');
    const phoneControl = this.contactForm.get('phoneGroup.phone');
    const confirmPhoneControl = this.contactForm.get('phoneGroup.confirmPhone');

    if (selectedCommunicationPreference === 'email') {
      emailControl.setValidators([Validators.required, Validators.email]);
      confirmEmailControl.setValidators([Validators.required, Validators.email]);

      phoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
      confirmPhoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);

      this.emailError = this.requiredEmailErrorText;
      this.phoneError = this.nonRequiredPhoneErrorText;
    }
    else {
      emailControl.setValidators([Validators.email]);
      confirmEmailControl.setValidators([Validators.email]);

      phoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
      confirmPhoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);

      this.emailError = this.nonRequiredEmailErrorText;
      this.phoneError = this.requiredPhoneErrorText;
    }
    emailControl.updateValueAndValidity();
    phoneControl.updateValueAndValidity();
  }


  public sendEmail() {
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

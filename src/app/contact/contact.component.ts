import { Component, OnInit } from '@angular/core';
import { potentialCustomer } from '../models/potentialCustomer.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, AbstractControlOptions } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'; 
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

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

  nameValidationMessage: string; 
  nameValidationMessages = {
    required: 'Your name is required'
  }


  emailValidationMessage: string; 
  emailValidationMessages = {
    required: 'A valid email is required',
    email: 'Email entered is Invalid',
    match: 'Email addresses do not match'
  }

  phoneValidationMessage: string; 
  phoneValidationMessages = {
    required: 'A valid phone number is required',
    match: 'Phone numbers do not match'
  }

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

  constructor(private formBuilder: FormBuilder, private contactservice: ContactService) {
    this.potentialCustomer.primaryInterest = '';
    this.potentialCustomer.communicationPreference = '';
  }

  ngOnInit(): void {
    this.runValidation();
    this.setCommunicationPreference(this.contactForm.get('communicationPreference').value); 
    this.watchNameControl();
    this.watchEmailControl(); 
  }

  setNameMessage(c: AbstractControl): void{
    this.nameValidationMessage = ''; 
    if((c.touched || c.dirty) && c.errors){
      this.nameValidationMessage = Object.keys(c.errors).map(
        key => this.nameValidationMessage += this.nameValidationMessages[key]).join(' '); 
    }
  }

  setEmailMessage(c: AbstractControl): void{
    this.emailValidationMessage = ''; 
    if((c.touched || c.dirty) && c.errors){
      this.emailValidationMessage = Object.keys(c.errors).map(
        key => this.emailValidationMessage += this.emailValidationMessages[key]).join(' '); 
    }
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

    console.log(this.phoneError, 'phone error'); 
  }


  public sendEmail() {
    console.log('i AM BEING CALLED'); 
    var result; 
    result = this.contactservice.makeAsyncCall().subscribe(
      data => result = data,
      err => console.log(err), 
      () => console.log('DONE GETTING DATA', result)
      ) 
 }

  private runValidation() {
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
    });
  }

  private watchNameControl() {
    const nameControl = this.contactForm.get('name');
    nameControl.valueChanges.pipe(debounceTime(500)).subscribe(value => this.setNameMessage(nameControl));
  }

  private watchEmailControl() {
    const emailControl = this.contactForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setEmailMessage(emailControl));
  }
}

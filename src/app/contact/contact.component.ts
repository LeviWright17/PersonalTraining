import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { contact } from '../models/contact.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ContactService } from './contact.service';
import { contactError } from '../models/contactError.model';
import { matchEmailFields, matchPhoneFields } from './functions';
import { renameMe } from '../models/renameMe.model';

@Component({
  selector: 'app-contact', //LLL figure out where this is referenced. 
  templateUrl: './contact.component.html',
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
  nonRequiredPhoneErrorText: string = 'Phone number is invalid';

  emailCommunicationPreference: string = 'email';

  nameValidationMessage: string;
  nameValidationMessages = {
    required: 'Your name is required'
  }

  emailGroupValidationMessage: string; 
  emailGroupValidationMessages = {
    match: 'Email addresses do not match'    
  }

  emailValidationMessage: string;
  emailValidationMessages = {
    required: 'A valid email is required',
    email: 'Email entered is Invalid',
  }

  confirmEmailValidationMessage: string;
  confirmEmailValidationMessages = {
    required: 'A valid email is required',
    email: 'Email entered is Invalid',
  }

  phoneGroupValidationMessage: string; 
  phoneGroupValidationMessages = {
    match: 'Phone numbers do not match'
  }

  phoneValidationMessage: string;
  phoneValidationMessages = {
    required: 'A valid phone number is required',
  }

  emailError: string;
  phoneError: string;

  contactModel: contact = new contact();
  contactForm: FormGroup;
  namecontrol: AbstractControl = new FormControl(); 
  emailControl: AbstractControl = new FormControl(); 
  confirmEmailControl: AbstractControl = new FormControl(); 

  constructor(private formBuilder: FormBuilder, private contactservice: ContactService,
    private titleService: Title) {
    this.contactModel.primaryInterest = '';
    this.contactModel.communicationPreference = '';
  }

  ngOnInit(): void {
    this.setPageTitle();
    this.runValidation();
    this.namecontrol = this.contactForm.get('name'); 
    this.emailControl = this.contactForm.get('emailGroup.email'); 
    this.confirmEmailControl = this.contactForm.get('emailGroup.confirmEmail'); 
    this.setCommunicationPreference(this.contactForm.get('communicationPreference').value);
    this.watchNameControl();
    this.watchEmailGroup();
    this.watchPhoneGroup(); 
  }

  public setCommunicationPreference(selectedCommunicationPreference: string): void {
    // const confirmEmailControl = this.contactForm.get('emailGroup.confirmEmail');
    const phoneControl = this.contactForm.get('phoneGroup.phone');
    const confirmPhoneControl = this.contactForm.get('phoneGroup.confirmPhone');

    if (selectedCommunicationPreference === this.emailCommunicationPreference) {
      this.configureFieldsForEmailCommunicationPreference(this.emailControl, this.confirmEmailControl,
        phoneControl, confirmPhoneControl);
    }
    else {
      this.configureFieldsForPhoneCommunicationPreference(this.emailControl, this.confirmEmailControl,
        phoneControl, confirmPhoneControl);
    }
    this.configureValueAndValidity(this.emailControl, phoneControl);
  }

  public send() {
    var result;
    result = this.contactservice.makeAsyncCall().subscribe(
      data => result = data,
      (err: contactError) => console.log(err.friendlyMessage),
      () => console.log('DONE GETTING DATA', result)
    )
  }

  //Totally works, just may not use it at all in here. Was for learning purposes. 
  public doSomeDataTransformation(): any {
    var result; 
    result = this.contactservice.performDataTransformation().subscribe(
      (data : renameMe) => result = data,
      (err: contactError) => console.log(err.friendlyMessage),
      () => console.log('DONE GETTING DATA', result)
    )
  }

  private setPageTitle() {
    this.titleService.setTitle(`Personal Training' ${VERSION.full}`);
  }

  private setNameMessage(c: AbstractControl): void {
    this.nameValidationMessage = '';
    if (this.fieldStateIsInvalid(c)) {
      this.nameValidationMessage = Object.keys(c.errors).map(
        key => this.nameValidationMessage += this.nameValidationMessages[key]).join(' ');
    }
  }

  private setEmailGroupMessage(c: AbstractControl): void {
    this.emailGroupValidationMessage = '';
    if (this.fieldStateIsInvalid(c)) {
      this.emailGroupValidationMessage = Object.keys(c.errors).map(
        key => this.emailGroupValidationMessage += this.emailGroupValidationMessages[key]).join(' ');
    }
  }

  private setEmailMessage(c: AbstractControl): void {
    this.emailValidationMessage = '';
    if (this.fieldStateIsInvalid(c)) {
      this.emailValidationMessage = Object.keys(c.errors).map(
        key => this.emailValidationMessage += this.emailValidationMessages[key]).join(' ');
    }
  }

  
  private setConfirmEmailMessage(c: AbstractControl): void {
    this.confirmEmailValidationMessage = '';
    if (this.fieldStateIsInvalid(c)) {
      this.confirmEmailValidationMessage = Object.keys(c.errors).map(
        key => this.confirmEmailValidationMessage += this.confirmEmailValidationMessages[key]).join(' ');
    }
  }

  private setPhoneGroupMessage(c: AbstractControl): void {
    this.phoneGroupValidationMessage = '';
    if (this.fieldStateIsInvalid(c)) {
      this.phoneGroupValidationMessage = Object.keys(c.errors).map(
        key => this.phoneGroupValidationMessage += this.phoneGroupValidationMessages[key]).join(' ');
    }
  }
  
  private setPhoneMessage(c: AbstractControl): void {
    this.phoneValidationMessage = '';
    if (this.fieldStateIsInvalid(c)) {
      this.phoneValidationMessage = Object.keys(c.errors).map(
        key => this.phoneValidationMessage += this.phoneValidationMessages[key]).join(' ');
    }
  }

  private fieldStateIsInvalid(c: AbstractControl) {
    return (c.touched || c.dirty) && c.errors;
  }

  private configureValueAndValidity(emailControl: AbstractControl, phoneControl: AbstractControl) {
    emailControl.updateValueAndValidity();
    phoneControl.updateValueAndValidity();
  }

  private configureFieldsForPhoneCommunicationPreference(emailControl: AbstractControl, confirmEmailControl: AbstractControl, phoneControl: AbstractControl, confirmPhoneControl: AbstractControl) {
    emailControl.setValidators([Validators.email]);
    confirmEmailControl.setValidators([Validators.email]);
    phoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    confirmPhoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    this.emailError = this.nonRequiredEmailErrorText;
    this.phoneError = this.requiredPhoneErrorText;
  }

  private configureFieldsForEmailCommunicationPreference(emailControl: AbstractControl, confirmEmailControl: AbstractControl, phoneControl: AbstractControl, confirmPhoneControl: AbstractControl) {
    emailControl.setValidators([Validators.required, Validators.email]);
    confirmEmailControl.setValidators([Validators.required, Validators.email]);
    phoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    confirmPhoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    this.emailError = this.requiredEmailErrorText;
    this.phoneError = this.nonRequiredPhoneErrorText;
  }

  private runValidation() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      emailGroup: this.formBuilder.group({
        email: ['', Validators.email],
        confirmEmail: ['', Validators.email]
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

  private watchEmailGroup() {
    const emailGroupControl = this.contactForm.get('emailGroup');
    const emailControl = emailGroupControl.get('email'); 
    const confirmEmailControl = emailGroupControl.get('confirmEmail'); 
    emailGroupControl.valueChanges.pipe(debounceTime(500)).subscribe(() => this.setEmailGroupMessage(emailGroupControl));
    emailControl.valueChanges.pipe(debounceTime(500)).subscribe(() => this.setEmailMessage(emailControl));
    confirmEmailControl.valueChanges.pipe(debounceTime(500)).subscribe(() => this.setConfirmEmailMessage(confirmEmailControl));
  }

  private watchPhoneGroup() {
    const phoneGroupControl = this.contactForm.get('phoneGroup'); 
    const phoneControl = phoneGroupControl.get('phone'); 
    phoneGroupControl.valueChanges.pipe(debounceTime(500)).subscribe(()=> this.setPhoneGroupMessage(phoneGroupControl)); 
    phoneControl.valueChanges.pipe(debounceTime(500)).subscribe(()=> this.setPhoneMessage(phoneControl)); 
  }
}

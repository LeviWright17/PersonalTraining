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
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

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

  defaultCommunicationPreference: string = 'phone';
  requiredEmailErrorText: string = 'Must have a valid email.';
  nonRequiredEmailErrorText: string = 'Email address is invalid';
  requiredPhoneErrorText: string = 'Must have a valid phone number';
  nonRequiredPhoneErrorText: string = 'Phone number is invalid';
  emailCommunicationPreference: string = 'email';

  nameValidationMessage: string = '';
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
    required: 'A valid phone number is required ',
    minlength: 'Phone number must be 10 digits ',
    pattern: 'Phone number can only contain numbers'
  }

  confirmPhoneValidationMessage: string;
  confirmPhoneValidationMessages = {
    required: 'A valid phone number is required',
    minlength: 'Phone number must be 10 digits',
    pattern: ' Phone number can only contain numbers'
  }


  emailError: string;
  phoneError: string;

  contactModel: contact = new contact();
  contactForm: FormGroup;
  namecontrol: AbstractControl = new FormControl();
  emailGroupControl: AbstractControl = new FormControl();
  emailControl: AbstractControl = new FormControl();
  confirmEmailControl: AbstractControl = new FormControl();
  phoneGroupControl: AbstractControl = new FormControl();
  phoneControl: AbstractControl = new FormControl();
  confirmPhoneControl: AbstractControl = new FormControl();

  standardDebounceTime : number = 500; 

  constructor(private formBuilder: FormBuilder, private contactservice: ContactService,
    private titleService: Title) {
    this.contactModel.primaryInterest = '';
    this.contactModel.communicationPreference = '';
  }

  ngOnInit(): void {
    this.setPageTitle();
    this.initializeFormValidation();
    this.namecontrol = this.contactForm.get('name');
    this.emailGroupControl = this.contactForm.get('emailGroup');
    this.emailControl = this.contactForm.get('emailGroup.email');
    this.confirmEmailControl = this.contactForm.get('emailGroup.confirmEmail');
    this.phoneGroupControl = this.contactForm.get('phoneGroup');
    this.phoneControl = this.contactForm.get('phoneGroup.phone');
    this.confirmPhoneControl = this.contactForm.get('phoneGroup.confirmPhone');
    this.setCommunicationPreference();
    this.watchNameControl();
    this.watchAllEmailFormControls();
    this.watchAllPhoneFormControls();
    this.watchCommunicationPreferenceControlGroup();
  }

  public setCommunicationPreference(): void {
    var selectedCommunicationPreference = this.contactForm.get('communicationPreference').value;

    selectedCommunicationPreference === this.emailCommunicationPreference
      ? this.configureFieldsForEmailCommunicationPreference()
      : this.configureFieldsForPhoneCommunicationPreference();

    this.configureValueAndValidity();
  }

  public send() {
    var result;
    result = this.contactservice.makeAsyncCall().subscribe(
      data => result = data,
      (err: contactError) => console.log(err.friendlyMessage),
      () => console.log('DONE GETTING DATA', result)
    )
  }

  public doSomeDataTransformation(): any {
    var result;
    result = this.contactservice.performDataTransformation().subscribe(
      (data: renameMe) => result = data,
      (err: contactError) => console.log(err.friendlyMessage),
      () => console.log('DONE GETTING DATA', result)
    )
  }

  private setPageTitle() {
    this.titleService.setTitle(`Personal Training' ${VERSION.full}`);
  }

  private setValidationMessages(c: AbstractControl, validationObject: object): string {
    var validationMessage = '';
    if (this.fieldStateIsInvalid(c)) {
      validationMessage = Object.keys(c.errors).map(
        key => validationMessage += validationObject[key]).join(' ');
    }
    return validationMessage;
  }

  private fieldStateIsInvalid(c: AbstractControl) {
    return (c.touched || c.dirty) && c.errors;
  }

  private configureValueAndValidity() {
    this.emailControl.updateValueAndValidity();
    this.confirmEmailControl.updateValueAndValidity();
    this.phoneControl.updateValueAndValidity();
    this.confirmPhoneControl.updateValueAndValidity();
  }

  private configureFieldsForPhoneCommunicationPreference() {
    this.configureValidatorsForPhoneCommunicationPreference();
    this.resetPhoneInputFieldState();
    this.resetPhoneErrorFieldValues();
  }

  private configureValidatorsForPhoneCommunicationPreference() {
    this.emailControl.setValidators([Validators.email]);
    this.confirmEmailControl.setValidators([Validators.email]);
    this.phoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    this.confirmPhoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
  }

  private resetPhoneInputFieldState() {
    this.phoneControl.markAsPristine();
    this.phoneControl.markAsUntouched();
    this.confirmPhoneControl.markAsPristine();
    this.confirmPhoneControl.markAsUntouched();
  }

  private resetPhoneErrorFieldValues() {
    this.emailError = this.nonRequiredEmailErrorText;
    this.phoneError = this.requiredPhoneErrorText;
  }

  private configureFieldsForEmailCommunicationPreference() {
    this.configureValidatorsForEmailCommunicationPreference();
    this.resetEmailInputFieldState();
    this.resetEmailErrorFieldValues();
  }

  private resetEmailErrorFieldValues() {
    this.emailError = this.requiredEmailErrorText;
    this.phoneError = this.nonRequiredPhoneErrorText;
  }

  private resetEmailInputFieldState() {
    this.emailControl.markAsPristine();
    this.emailControl.markAsUntouched();
    this.confirmEmailControl.markAsPristine();
    this.confirmEmailControl.markAsUntouched();
  }

  private configureValidatorsForEmailCommunicationPreference() {
    this.emailControl.setValidators([Validators.required, Validators.email]);
    this.confirmEmailControl.setValidators([Validators.required, Validators.email]);
    this.phoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    this.confirmPhoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
  }

  private initializeFormValidation() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      emailGroup: this.formBuilder.group({
        email: ['', Validators.email],
        confirmEmail: ['', Validators.email]
      }, {
          validator: matchEmailFields
        }),
      phoneGroup: this.formBuilder.group({
        phone: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
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
    nameControl.valueChanges.pipe(debounceTime(this.standardDebounceTime)).subscribe(
      () => this.nameValidationMessage = this.setValidationMessages(nameControl, this.nameValidationMessages));
  }

  private watchAllEmailFormControls() {
    this.watchEmailGroupControl();
    this.watchEmailControl();
    this.watchConfirmEmailControl();
  }

  private watchConfirmEmailControl() {
    this.confirmEmailControl.valueChanges.pipe(debounceTime(this.standardDebounceTime)).subscribe(
      () => this.confirmEmailValidationMessage = this.setValidationMessages(this.confirmEmailControl, this.confirmEmailValidationMessages));
  }

  private watchEmailControl() {
    this.emailControl.valueChanges.pipe(debounceTime(this.standardDebounceTime)).subscribe(
      () => this.emailValidationMessage = this.setValidationMessages(this.emailControl, this.emailValidationMessages));
  }

  private watchEmailGroupControl() {
    this.emailGroupControl.valueChanges.pipe(debounceTime(this.standardDebounceTime)).subscribe(
      () => this.emailGroupValidationMessage = this.setValidationMessages(this.emailGroupControl, this.emailGroupValidationMessages));
  }

  private watchAllPhoneFormControls() {
    this.watchPhoneGroupControl();
    this.watchPhoneControl();
    this.watchConfirmPhoneControl();
  }

  private watchConfirmPhoneControl() {
    this.confirmPhoneControl.valueChanges.pipe(debounceTime(this.standardDebounceTime)).subscribe(
      () => this.confirmPhoneValidationMessage = this.setValidationMessages(this.confirmPhoneControl, this.confirmPhoneValidationMessages));
  }

  private watchPhoneControl() {
    this.phoneControl.valueChanges.pipe(debounceTime(this.standardDebounceTime)).subscribe(
      () => this.phoneValidationMessage = this.setValidationMessages(this.phoneControl, this.phoneValidationMessages));
  }

  private watchPhoneGroupControl() {
    this.phoneGroupControl.valueChanges.pipe(debounceTime(this.standardDebounceTime)).subscribe(
      () => this.phoneGroupValidationMessage = this.setValidationMessages(this.phoneGroupControl, this.phoneGroupValidationMessages));
  }

  private watchCommunicationPreferenceControlGroup() {
    const communicationPreferenceGroupControl = this.contactForm.get('communicationPreference');
    communicationPreferenceGroupControl.valueChanges.subscribe(() => this.setCommunicationPreference())
  }
}

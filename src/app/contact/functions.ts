import { AbstractControl } from '@angular/forms';
export function matchEmailFields(control: AbstractControl): { [key: string]: boolean; } | null {

  const startControl = control.get('email');
  const endControl = control.get('confirmEmail');

  if (startControl.pristine || endControl.pristine) {
    return null;
  }
  if (startControl.value === endControl.value) {
    return null
  }
  return { 'match': true };
}

export function matchPhoneFields(control: AbstractControl): {
  [key: string]: boolean;
} | null {
  console.log('this is the control', control)

  const startControl = control.get('phone');
  const endControl = control.get('confirmPhone');

  if (startControl.pristine || endControl.pristine) {
    return null;
  }
  if (startControl.value === endControl.value) {
    return null;
  }
  
  return { 'match': true };
}
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // Example: Validator to check if a date is before today's date
  dateInferieureAujourdhuiValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const currentDate = new Date();

      if (!control.value) {
        return null;
      }

      if (inputDate >= currentDate) {
        return { invalidDate: true };
      }

      return null;
    };
  }

  // Example: Validator to check if a value is a valid email
  emailValidator(): ValidatorFn {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  // Example: Validator to check if a string's length is within a specific range
  lengthValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length = control.value ? control.value.length : 0;
      if (length < min || length > max) {
        return { invalidLength: true };
      }
      return null;
    };
  }
}

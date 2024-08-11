import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  dateInferieureAujourdhuiValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const inputYear = parseInt(control.value, 10);

      if (!control.value || isNaN(inputYear)) {
        return null; // No validation error if there's no value or if the value is not a number
      }

      if (inputYear > currentDate.getFullYear()) {
        control.setValue(''); // Clear the field if the year is in the future
        return { invalidDate: true };
      }

      return null;
    };
  }
}

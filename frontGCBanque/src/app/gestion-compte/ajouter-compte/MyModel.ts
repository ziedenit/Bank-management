import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  dateInferieureAujourdhuiValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentYear = new Date().getFullYear();
      const inputYear = parseInt(control.value, 10);

      // Check if the value is a valid number and if it is greater than the current year
      if (inputYear > currentYear) {
        control.setValue(''); // Clear the field if the year is in the future
        return { invalidDate: true };
      }

      return null;
    };
  }
}
if (inputYear > currentYear) {
    console.log('Année invalide, champ réinitialisé');
    control.setValue(''); // Clear the field if the year is in the future
    return { invalidDate: true };
}

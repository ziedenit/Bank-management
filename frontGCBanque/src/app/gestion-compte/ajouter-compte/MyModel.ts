import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  anneeConstructionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentYear = new Date().getFullYear();
      const anneeConstruction = parseInt(control.value, 10);

      if (isNaN(anneeConstruction) || anneeConstruction > currentYear) {
        return { anneeConstructionInvalide: true };
      }
      return null;
    };
  }
}

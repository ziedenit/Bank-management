import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateInferieureAujourdhuiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = new Date(control.value);
    const currentDate = new Date();

    if (!control.value) {
      return null; // Pas de valeur, donc pas d'erreur
    }

    if (inputDate >= currentDate) {
      return { invalidDate: true }; // Retourne une erreur si la date est égale ou supérieure à la date actuelle
    }

    return null; // Pas d'erreur si la date est valide
  };
}
 anneeConstruction: ['', [Validators.required, dateInferieureAujourdhuiValidator()]],
   <div *ngIf="formGroup.get('anneeConstruction').hasError('invalidDate') && formGroup.get('anneeConstruction').touched" class="text-danger">
    L'année de construction doit être antérieure à la date du jour.
  </div>

 // Forcer la mise à jour des valeurs du formulaire et des champs ngModel
  this.formGroup.markAllAsTouched();
  this.formGroup.updateValueAndValidity();

  // Sauvegarder explicitement les valeurs du premier objet de financement avant l'ajout du deuxième
  this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

  console.log('First object saved with values:', this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

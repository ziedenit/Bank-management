 // Abonnement aux changements de valeur des champs
    this.formGroup.get('lettreCEP').valueChanges.subscribe((value) => {
      console.log('lettreCEP changed:', value); // Ajoutez un log pour déboguer
      this.hideFieldCEP = !value || value === 'option0';
    });

    this.formGroup.get('lettreGES').valueChanges.subscribe((value) => {
      console.log('lettreGES changed:', value); // Ajoutez un log pour déboguer
      this.hideFieldGES = !value || value === 'option0';
    });

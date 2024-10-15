this.formGroup = this.fb.group({
    // ... autres champs
    lettreCEP: [this.dpeAdeme['Etiquette_DPE'] ? this.dpeAdeme['Etiquette_DPE'] : this.dpeAdeme['classe_consommation_energie'] ? this.dpeAdeme['classe_consommation_energie'] : 'option0'],
    lettreGES: [this.dpeAdeme['Etiquette_GES'] ? this.dpeAdeme['Etiquette_GES'] : this.dpeAdeme['classe_estimation_ges'] ? this.dpeAdeme['classe_estimation_ges'] : 'option0'],
    // ... autres champs
});

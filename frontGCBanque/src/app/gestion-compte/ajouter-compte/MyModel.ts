// Fonction appelée lors du changement d'objet dans le fil d'Ariane
onBreadcrumbClick(index: number): void {
    // Sauvegarder les valeurs actuelles du formulaire avant de passer à un autre objet
    const bienActuel = this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]?.bien;
    if (bienActuel) {
        this.updateFinancementObject(bienActuel, this.formGroup.value);
    }

    this.selectedObjetIndex = index;
    
    // Recharger les nouvelles valeurs dans le formulaire
    this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
    this.mapFinancementDataMultiOfd(this.extractedInitialFinancement, index);
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien, index);
    this.setFinancementDataOnScreenMultiOfd(this.extractedInitialFinancement, index);
    this.depExist = true;
}
//
private setupFormGroup(bien: any, index: number): void {
    if (!bien) return;
    this.formGroup = this.fb.group({
        numeroNomRue: [bien.numeroNomRue || null],
        codePostal: [bien.codePostal || null],
        ville: [bien.nomCommune || null],
        dateDiangnostique: [bien.dpeActuel?.dateEtablissementDpe?.toString().substring(0, 10) || null],
        anneeConstruction: [bien.anneeConstruction || null],
        typeBatiment: [bien.typeBatiment || null],
        lettreCEP: [bien.dpeActuel?.classeCep || null],
        lettreGES: [bien.dpeActuel?.classeGes || null],
        surfaceBien: [bien.surfaceBien || null],
        valeurCep: [bien.dpeActuel?.estimationCep || null],
        valeurGes: [bien.dpeActuel?.estimationGes || null],
        energieType: [bien.typeEnergie || null]
    });

    // Sauvegarde les valeurs actuelles du formulaire dans l'objet correspondant dans extractedInitialFinancement
    this.formGroup.valueChanges.subscribe(value => {
        this.updateFinancementObject(bien, value);
    });
}

// Fonction qui met à jour les propriétés de l'objet en fonction des valeurs du formulaire
private updateFinancementObject(bien: any, value: any): void {
    bien.numeroNomRue = value.numeroNomRue;
    bien.codePostal = value.codePostal;
    bien.nomCommune = value.ville;
    bien.dpeActuel = bien.dpeActuel || {};
    bien.dpeActuel.dateEtablissementDpe = value.dateDiangnostique;
    bien.anneeConstruction = value.anneeConstruction;
    bien.typeBatiment = value.typeBatiment;
    bien.dpeActuel.classeCep = value.lettreCEP;
    bien.dpeActuel.classeGes = value.lettreGES;
    bien.surfaceBien = value.surfaceBien;
    bien.dpeActuel.estimationCep = value.valeurCep;
    bien.dpeActuel.estimationGes = value.valeurGes;
    bien.typeEnergie = value.energieType;
}

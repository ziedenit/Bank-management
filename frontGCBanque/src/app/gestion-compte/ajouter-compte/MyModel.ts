// Écoute des changements pour chaque champ du formulaire
    this.formGroup.get('numeroNomRue').valueChanges.subscribe(value => {
        this.extractedInitialFinancement.objetFinancement[index].bien.numeroNomRue = value;
    });

    this.formGroup.get('codePostal').valueChanges.subscribe(value => {
        this.extractedInitialFinancement.objetFinancement[index].bien.codePostal = value;
    });

    this.formGroup.get('ville').valueChanges.subscribe(value => {
        this.extractedInitialFinancement.objetFinancement[index].bien.nomCommune = value;
    });

    this.formGroup.get('dateDiangnostique').valueChanges.subscribe(value => {
        if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
            this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.dateEtablissementDpe = value;
        }
    });

    this.formGroup.get('anneeConstruction').valueChanges.subscribe(value => {
        this.extractedInitialFinancement.objetFinancement[index].bien.anneeConstruction = value;
    });

    this.formGroup.get('typeBatiment').valueChanges.subscribe(value => {
        this.extractedInitialFinancement.objetFinancement[index].bien.typeBatiment = value;
    });

    this.formGroup.get('lettreCEP').valueChanges.subscribe(value => {
        if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
            this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.classeCep = value;
        }
    });

    this.formGroup.get('lettreGES').valueChanges.subscribe(value => {
        if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
            this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.classeGes = value;
        }
    });

    this.formGroup.get('surfaceBien').valueChanges.subscribe(value => {
        this.extractedInitialFinancement.objetFinancement[index].bien.surfaceBien = value;
    });

    this.formGroup.get('valeurCep').valueChanges.subscribe(value => {
        if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
            this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.estimationCep = value;
        }
    });

    this.formGroup.get('valeurGes').valueChanges.subscribe(value => {
        if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
            this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.estimationGes = value;
        }
    });

    this.formGroup.get('energieType').valueChanges.subscribe(value => {
        this.extractedInitialFinancement.objetFinancement[index].bien.typeEnergie = value;
    });

export class VotreComposant implements OnInit {
    selectedObjetIndex: number = 0;
    formGroup: FormGroup;
    extractedInitialFinancement: any;

    ngOnInit(): void {
        this.id = this.route.snapshot.queryParams["idFinancement"];
        this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

        if (this.Url_Retour_Base64) {
            this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
        }

        this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
            this.extractedInitialFinancement = responseFinancement;
            console.log("Le financement récupéré de la BDD est:", responseFinancement);

            // Initialisation sur le premier objet
            this.setObjetFinancementProperties(responseFinancement.objetFinancement[0]);
            this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
        });

        this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
            this.objetsFinancements = objets;
            this.showDeleteIcon = false;

            if (this.objetsFinancements.length > 1) {
                this.showFileAriane = true;
            }
            console.log("Les objets récupérés:", this.objetsFinancements);
        });
    }

    private setupFormGroup(bien: any): void {
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
    }

    private saveFormData(): void {
        const bien = this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex].bien;
        if (!bien) return;

        // Mettre à jour l'objet bien avec les données du formulaire
        bien.numeroNomRue = this.formGroup.get('numeroNomRue').value;
        bien.codePostal = this.formGroup.get('codePostal').value;
        bien.nomCommune = this.formGroup.get('ville').value;
        bien.dpeActuel = bien.dpeActuel || {};
        bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value;
        bien.anneeConstruction = this.formGroup.get('anneeConstruction').value;
        bien.typeBatiment = this.formGroup.get('typeBatiment').value;
        bien.dpeActuel.classeCep = this.formGroup.get('lettreCEP').value;
        bien.dpeActuel.classeGes = this.formGroup.get('lettreGES').value;
        bien.surfaceBien = this.formGroup.get('surfaceBien').value;
        bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value;
        bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value;
        bien.typeEnergie = this.formGroup.get('energieType').value;
    }

    onBreadcrumbClick(index: number): void {
        // Sauvegarder les valeurs actuelles avant de passer à un autre objet
        this.saveFormData();

        // Passer au nouvel objet
        this.selectedObjetIndex = index;

        // Recharger les nouvelles valeurs dans le formulaire à partir de extractedInitialFinancement
        this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
    }
}

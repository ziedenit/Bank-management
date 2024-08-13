export class VotreComposant implements OnInit {
    selectedObjetIndex: number;
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

            this.selectedObjetIndex = 0; // Initialisation sur le premier objet
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

        // Sauvegarder les modifications du formulaire dans l'objet bien correspondant
        this.formGroup.valueChanges.subscribe(value => {
            this.updateFinancementObject(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex].bien, value);
        });
    }

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

    onBreadcrumbClick(index: number): void {
        if (this.selectedObjetIndex !== undefined) {
            // Sauvegarder les valeurs actuelles avant de passer à un autre objet
            const bienActuel = this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]?.bien;
            if (bienActuel) {
                this.updateFinancementObject(bienActuel, this.formGroup.value);
            }
        }

        // Si l'utilisateur clique sur l'objet déjà sélectionné, on ne recharge pas le formulaire
        if (this.selectedObjetIndex === index) {
            return;
        }

        this.selectedObjetIndex = index;

        // Recharger les nouvelles valeurs dans le formulaire à partir de extractedInitialFinancement
        this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
    }
}

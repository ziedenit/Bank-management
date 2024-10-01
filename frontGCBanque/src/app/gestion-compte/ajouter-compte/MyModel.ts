export class VotreComponent implements OnInit {
  formGroup: FormGroup;
  normeThermique: string = '';
  dateDepot: string = '';
  postDisabled: boolean = true;
  showBlocResult: boolean = false;
  showPopup: boolean = false;
  popupShownForIndex: Set<number> = new Set();
  selectedObjetIndex: number = 0;
  selectedType: string = '';
  extractedInitialFinancement: any = {};
  clickCalulAlignObject: Map<number, number> = new Map();
  alignementResultText: string = '';
  alignementContext: any;
  isFieldsDisabled: boolean = false;
  private formValueChangesSubscription: any;  // Pour gérer l'abonnement

  constructor(private fb: FormBuilder, private engineService: EngineService) { }

  ngOnInit() {
    // Initialisation du formulaire
    this.formGroup = this.fb.group({
      numeroNomRue: [''],
      codePostal: [''],
      ville: [''],
      dateDiangnostique: [''],
      dateFinValidite: [''],
      anneeConstruction: [''],
      typeBatiment: [''],
      surfaceBien: [''],
      energieType: [''],
      lettreCEP: [''],
      valeurCep: [''],
      lettreGES: [''],
      valeurGes: ['']
    });

    // Au démarrage, pas de détection de changement
    this.unsubscribeFormValueChanges();
  }

  // Méthode pour désabonner de la détection des changements
  unsubscribeFormValueChanges() {
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }

  // Appelée lors de la consultation d'un objet via onBread
  onBread(index: number) {
    this.selectedObjetIndex = index;

    // Recharger les valeurs de l'objet consulté dans le formulaire
    this.loadObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

    // Désabonner toute détection de changements précédente
    this.unsubscribeFormValueChanges();

    // Activer la détection des changements uniquement lors de la consultation
    this.formValueChangesSubscription = this.formGroup.valueChanges.subscribe(() => {
      this.disableContinuerButton();
    });

    // Réinitialiser l'état du bouton Continuer
    this.postDisabled = true;
  }

  loadObjectValues(currentObject: any) {
    // Logique pour charger les valeurs de l'objet dans le formulaire
    this.formGroup.patchValue({
      numeroNomRue: currentObject.numeroNomRue || '',
      codePostal: currentObject.codePostal || '',
      ville: currentObject.ville || '',
      dateDiangnostique: currentObject.dateDiangnostique || '',
      dateFinValidite: currentObject.dateFinValidite || '',
      anneeConstruction: currentObject.anneeConstruction || '',
      typeBatiment: currentObject.typeBatiment || '',
      surfaceBien: currentObject.surfaceBien || '',
      energieType: currentObject.energieType || '',
      lettreCEP: currentObject.lettreCEP || '',
      valeurCep: currentObject.valeurCep || '',
      lettreGES: currentObject.lettreGES || '',
      valeurGes: currentObject.valeurGes || ''
    });

    // Charger également les champs en dehors du formGroup si nécessaire (comme normeThermique)
    this.normeThermique = currentObject.normeThermique || '';
    this.dateDepot = currentObject.dateDepot || '';
  }

  disableContinuerButton() {
    // Désactiver le bouton Continuer dès qu'une valeur change dans le formulaire ou les champs ngModel
    this.postDisabled = true;

    // Si un pop-up doit être montré, montrer une seule fois pour l'objet
    if (!this.popupShownForIndex.has(this.selectedObjetIndex)) {
      this.showPopup = true;
      this.popupShownForIndex.add(this.selectedObjetIndex);
    }
  }

  enableContinuerButton() {
    // Permettre de réactiver le bouton après le calcul
    this.postDisabled = false;
  }

  showAlignement(index: number): void {
    this.checkFormFieldsFormGroup();
    this.showBlocResult = true;

    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

    // Logique pour gérer les clics sur "Calculer"
    if (this.clickCalulAlignObject.has(index)) {
      const currentCount = this.clickCalulAlignObject.get(index) ?? 0;
      this.clickCalulAlignObject.set(index, currentCount + 1);
    } else {
      this.clickCalulAlignObject.set(index, 1);
    }

    // Appels de service pour récupérer les résultats d'alignement
    forkJoin([
      this.engineService.alignement(this.ligneContext),
      this.engineService.alignementXtra(this.ligneContextXtra)
    ]).subscribe(([aligne, aligneXtra]) => {
      this.alignementResultText = this.alignementMapping[aligne];
      this.alignementContext = this.xtraRepriseService.calculXtra(aligne, aligneXtra);

      // Sauvegarde des résultats
      this.extractedInitialFinancement.objetFinancement[index].alignement = this.alignementContext;
      this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

      // Activer le bouton "Continuer" après calcul
      this.enableContinuerButton();
    });

    // Autres vérifications après le calcul
    this.errorDpeMessage = this.checkFileDpeInserted();
    this.errorNormeThermiqueMessage = this.checkNormeThermique();
    this.errorDateDepotMessage = this.checkFileDateDepotInserted();
  }

  // Méthode déclenchée par un clic sur "Continuer"
  postContinuer() {
    if (!this.postDisabled) {
      console.log('Continuer vers l\'étape suivante');
    }
  }

  checkFormFieldsFormGroup() {
    // Logique de validation des champs du formulaire
  }

  saveCurrentObjectValues(currentObject: any) {
    // Logique de sauvegarde des valeurs actuelles
  }
}
//
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-12">
      <div class="card border-0">
        <div class="card-body">
          <form [formGroup]="formGroup">
            <!-- Champs de formulaire -->
            <div class="row">
              <div class="col-lg-3">
                <label>Norme Thermique</label>
                <select [(ngModel)]="normeThermique" (ngModelChange)="disableContinuerButton()" class="form-control">
                  <option value="option1">RT2012</option>
                  <option value="option2">RE2020</option>
                  <option value="option3">Autre</option>
                </select>
              </div>
              <div class="col-lg-3">
                <label>Date de dépôt</label>
                <input type="date" [(ngModel)]="dateDepot" (ngModelChange)="disableContinuerButton()" class="form-control">
              </div>
            </div>
          </form>

          <!-- Boutons -->
          <div class="ButtonsFooter" style="display: flex; justify-content: flex-end">
            <button (click)="showAlignement(selectedObjetIndex)" mat-raised-button color="primary" [disabled]="selectedType!='option1'">
              Calculer
            </button>
            &nbsp;
            <button (click)="postContinuer()" mat-raised-button color="primary" [disabled]="postDisabled">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

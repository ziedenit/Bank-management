export class VotreComponent implements OnInit {
  formGroup: FormGroup;
  normeThermique: string = '';
  dateDepot: string = '';
  postDisabled: boolean = true;
  showBlocResult: boolean = false;
  showPopup: boolean = false;
  popupShownForIndex: Set<number> = new Set();  // Pour garder la trace des objets avec le pop-up déjà affiché
  selectedObjetIndex: number = 0;
  selectedType: string = '';  // Gérer le type de l'objet sélectionné
  extractedInitialFinancement: any = {};  // Votre structure de financement
  clickCalulAlignObject: Map<number, number> = new Map();
  alignementResultText: string = '';
  alignementContext: any;
  isFieldsDisabled: boolean = false;

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

    // Détection de tout changement dans le formulaire
    this.formGroup.valueChanges.subscribe(() => {
      this.disableContinuerButton();
    });
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

  // Méthode pour afficher le calcul d'alignement
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

  // Méthode pour afficher le pop-up une seule fois par objet
  showPopupOnceForObject() {
    if (this.showPopup) {
      alert('Pop-up de notification pour cet objet');
      this.showPopup = false;
    }
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

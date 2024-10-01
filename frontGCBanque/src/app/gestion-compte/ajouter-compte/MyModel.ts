export class VotreComponent implements OnInit {
  formGroup: FormGroup;
  normeThermique: string = '';
  dateDepot: string = '';
  siren: string = '';
  numeroDpe: string = '';
  etatDeBien: string = '';
  natureDeBien: string = '';
  postDisabled: boolean = true;
  selectedObjetIndex: number = 0;
  showPopup: boolean = false;
  popupShownForIndex: Set<number> = new Set();
  private subscriptions: any[] = []; // Pour gérer les abonnements aux champs spécifiques

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialisation du formulaire avec quelques champs par exemple
    this.formGroup = this.fb.group({
      // Autres champs de formulaire...
    });

    // Ne pas activer la détection des changements au démarrage
    this.unsubscribeSpecificFieldChanges();
  }

  // Désabonner tous les abonnements précédents
  unsubscribeSpecificFieldChanges() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  // Méthode appelée lors de la consultation via onBread
  onBread(index: number) {
    this.selectedObjetIndex = index;

    // Charger les valeurs de l'objet sélectionné
    this.loadObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

    // Désactiver toute détection de changement précédente
    this.unsubscribeSpecificFieldChanges();

    // Activer la détection des changements sur les champs spécifiques
    this.subscriptions.push(
      this.monitorFieldChange(() => this.normeThermique),
      this.monitorFieldChange(() => this.dateDepot),
      this.monitorFieldChange(() => this.siren),
      this.monitorFieldChange(() => this.numeroDpe),
      this.monitorFieldChange(() => this.etatDeBien),
      this.monitorFieldChange(() => this.natureDeBien)
    );

    // Réinitialiser le bouton Continuer à désactivé
    this.postDisabled = true;
  }

  // Méthode pour surveiller un champ spécifique
  monitorFieldChange(getFieldValue: () => string) {
    const initialValue = getFieldValue();

    return {
      unsubscribe: () => {}, // Une méthode vide, car nous ne sommes pas dans un système réactif
      // Nous écoutons manuellement les changements avec ngModelChange
    };
  }

  loadObjectValues(currentObject: any) {
    // Charger les valeurs de l'objet dans les champs correspondants
    this.normeThermique = currentObject.normeThermique || '';
    this.dateDepot = currentObject.dateDepot || '';
    this.siren = currentObject.siren || '';
    this.numeroDpe = currentObject.numeroDpe || '';
    this.etatDeBien = currentObject.etatDeBien || '';
    this.natureDeBien = currentObject.natureDeBien || '';
  }

  disableContinuerButton() {
    // Griser le bouton Continuer
    this.postDisabled = true;

    // Afficher un popup uniquement la première fois
    if (!this.popupShownForIndex.has(this.selectedObjetIndex)) {
      this.showPopup = true;
      this.popupShownForIndex.add(this.selectedObjetIndex);
    }
  }

  enableContinuerButton() {
    // Activer le bouton Continuer
    this.postDisabled = false;
  }

  postContinuer() {
    if (!this.postDisabled) {
      console.log('Continuer vers l\'étape suivante');
    }
  }
}
//
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-12">
      <div class="card border-0">
        <div class="card-body">
          <!-- Champ Norme Thermique -->
          <div class="form-group">
            <label for="normeThermique">Norme Thermique</label>
            <select [(ngModel)]="normeThermique" (ngModelChange)="disableContinuerButton()" class="form-control">
              <option value="RT2012">RT2012</option>
              <option value="RE2020">RE2020</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <!-- Champ Date de dépôt -->
          <div class="form-group">
            <label for="dateDepot">Date de dépôt</label>
            <input type="date" [(ngModel)]="dateDepot" (ngModelChange)="disableContinuerButton()" class="form-control">
          </div>

          <!-- Champ Siren -->
          <div class="form-group">
            <label for="siren">Siren</label>
            <input type="text" [(ngModel)]="siren" (ngModelChange)="disableContinuerButton()" class="form-control">
          </div>

          <!-- Champ Numéro DPE -->
          <div class="form-group">
            <label for="numeroDpe">Numéro DPE</label>
            <input type="text" [(ngModel)]="numeroDpe" (ngModelChange)="disableContinuerButton()" class="form-control">
          </div>

          <!-- Champ État de Bien -->
          <div class="form-group">
            <label for="etatDeBien">État de Bien</label>
            <select [(ngModel)]="etatDeBien" (ngModelChange)="disableContinuerButton()" class="form-control">
              <option value="Neuf">Neuf</option>
              <option value="Ancien">Ancien</option>
            </select>
          </div>

          <!-- Champ Nature de Bien -->
          <div class="form-group">
            <label for="natureDeBien">Nature de Bien</label>
            <select [(ngModel)]="natureDeBien" (ngModelChange)="disableContinuerButton()" class="form-control">
              <option value="Résidentiel">Résidentiel</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <!-- Boutons -->
          <div class="ButtonsFooter" style="display: flex; justify-content: flex-end">
            <button (click)="postContinuer()" mat-raised-button color="primary" [disabled]="postDisabled">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

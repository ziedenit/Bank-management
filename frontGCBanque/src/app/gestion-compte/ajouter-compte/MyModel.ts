.objets-de-financement-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.objet-de-financement {
  flex: 1 1 calc(33.333% - 1rem); /* Ajustez cette valeur pour le nombre d'éléments par ligne */
  border: 1px solid #ddd;
  padding: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .objet-de-financement {
    flex: 1 1 calc(50% - 1rem); /* Deux colonnes sur les écrans plus petits */
  }
}

@media (max-width: 480px) {
  .objet-de-financement {
    flex: 1 1 100%; /* Une seule colonne sur les écrans très petits */
  }
}
//
<div class="container mt-4">
  <button class="btn btn-primary mb-3" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement</button>

  <div class="objets-de-financement-container">
    <div *ngFor="let objet of objetsDeFinancement; let i = index" class="objet-de-financement">
      <div>
        <h5>Objet de Financement {{ i + 1 }}</h5>
        <button class="btn btn-link" (click)="toggleObjetFinancement(i)">
          {{ objet.hiddenObjetfinancement ? 'Afficher' : 'Cacher' }}
        </button>
      </div>

      <div *ngIf="!objet.hiddenObjetfinancement">
        <!-- Form fields for the objet de financement -->
        <div class="form-group">
          <label for="familleObjet{{i}}">Famille d'objet</label>
          <select class="form-control" id="familleObjet{{i}}" [(ngModel)]="objet.selectedFamilleObjet">
            <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="objetFinancement{{i}}">Objet de financement</label>
          <select class="form-control" id="objetFinancement{{i}}" [(ngModel)]="objet.selectedObjetFinancement">
            <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dateDepot{{i}}">Date de dépôt</label>
          <input type="date" class="form-control" id="dateDepot{{i}}" [(ngModel)]="objet.dateDepot">
        </div>

        <!-- Ajoutez d'autres champs de formulaire ici -->
      </div>
    </div>
  </div>
</div>
//
objetsDeFinancement: any[] = [
    this.createEmptyObjetFinancement()
  ];

  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // Ajoutez plus d'options ici
  ];

  createEmptyObjetFinancement() {
    return {
      hiddenObjetfinancement: false,
      elementObjetfinancement: true,
      selectedFamilleObjet: null,
      selectedObjetFinancement: null,
      objetFinance: '',
      codeBatimentSelected: null,
      selectedType: null,
      selectedNatBatiment: null,
      dateDepot: null,
      prixAquisitionBien: null,
      montantLclFinance: null,
      partLcl: null,
      dureeFinancement: null,
      dateLivraison: null,
      estimationSurface: null,
      puissanceEnKwc: null,
      dateMiseEnService: null,
      montantInstallationHt: null,
      tauxAutoConsommation: null,
      dateSignatureAchat: null,
      dateRemboursement: null,
      montantTva: null,
      montantHtTravaux: null,
      montantHtEnergieRenouvelable: null,
      montantHtTransport: null,
      worksNature: null,
      landsType: null
    };
  }

  ajouterObjetFinancement() {
    this.objetsDeFinancement.push(this.createEmptyObjetFinancement());
  }

  toggleObjetFinancement(index: number) {
    this.objetsDeFinancement[index].hiddenObjetfinancement = !this.objetsDeFinancement[index].hiddenObjetfinancement;
  }

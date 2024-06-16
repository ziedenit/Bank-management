export class YourComponent {
  objetsFinancement: any[] = [
    // Vos objets de financement ici
  ];
  selectedObjetIndex: number | null = null;

  ajouterObjetFinancement() {
    const nouvelObjet = {
      selectedFamilleObjet: '',
      familleObjetText: '',
      selectedObjetFinancement: '',
      objetFinance: '',
      prixAquisitionBien: '',
      dateDepot: '',
      selectedType: '',
      montantLclFinance: '',
      normeThermique: '',
      selectedNatBatiment: '',
      partLcl: '',
      SirenDPE: '',
      addresseBien: '',
      addresseBienCodePostal: '',
      addresseBienVille: '',
      codeBatimentSelected: '',
      numeroDpeAdeme: '',
      hideFieldForm: false,
      presenceFamilleObjet: false,
      presenceObjet: false,
      hiddenObjetfinancement: false
    };

    this.objetsFinancement.push(nouvelObjet);
  }

  onBreadcrumbClick(index: number) {
    this.selectedObjetIndex = index;
  }
}
//
<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" *ngFor="let objet of objetsFinancement; let i = index">
        <a href="#" (click)="onBreadcrumbClick(i)">Objet de financement {{ i + 1 }}</a>
      </li>
    </ol>
  </nav>

  <div class="row">
    <div class="col-auto">
      <div class="ajoutFinancement">
        <button mat-stroked-button (click)="ajouterObjetFinancement()">
          <img src="../../../assets/icons/plus.svg" />
          &nbsp; ajouter un objet de financement
        </button>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12 d-flex flex-wrap">
      <div *ngFor="let objet of objetsFinancement; let i = index" style="width: 100%;">
        <div class="card border-0 m-2" style="width: 100%;" (click)="selectedObjetIndex = i" *ngIf="selectedObjetIndex === i">
          <div class="card-body">
            <!-- Le contenu de l'objet sélectionné -->
            <div class="blockSize">
              <h3 class="d-inline-block font-weight-bold">Objet de financement {{ i + 1 }}</h3>
              <span class="float-right">
                <img *ngIf="!objet.hiddenObjetfinancement" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="objet.hiddenObjetfinancement = !objet.hiddenObjetfinancement">
                <img *ngIf="objet.hiddenObjetfinancement" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="objet.hiddenObjetfinancement = !objet.hiddenObjetfinancement">
              </span>
              <div *ngIf="!objet.hiddenObjetfinancement">
                <div class="row">
                  <!-- champs famille non envoyé dans le context -->
                  <div class="col-lg-12" *ngIf="!objet.hideFieldForm && !objet.presenceFamilleObjet && !objet.presenceObjet">
                    <div class="form-group">
                      <label for="familleObjet{{i}}">Famille objet de financement </label>&nbsp;<span class="required">*</span>
                      <select class="form-control form-control-sm" id="familleObjet{{i}}" [(ngModel)]="objet.selectedFamilleObjet">
                        <option value='option0' selected> </option>
                        <option value='option1'>Immobilier </option>
                        <option value='option2'>Installation, maintenance et réparation d'équipement/technologie liés aux bâtiments</option>
                        <option value='option3'>Énergies renouvelables </option>
                        <option value='option4'>Transport </option>
                        <option value='option5'>Autres </option>
                      </select>
                    </div>
                  </div>
                  <!-- autres champs... -->
                  <div class="col-lg-12" *ngIf="!objet.hideFieldForm && objet.presenceFamilleObjet && !objet.presenceObjet">
                    <label for="familleContext{{i}}">Famille objet de financement</label>&nbsp;<span class="required">*</span>
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="objet.familleObjetText" id="familleObjetText{{i}}" name="ObjectFinance"/> 
                  </div>
                  <!-- autres champs... -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card border-0 m-2" style="width: 100%;" (click)="selectedObjetIndex = i" *ngIf="selectedObjetIndex !== i">
          <div class="card-body">
            <!-- Le contenu de l'objet résumé -->
            <h3 class="d-inline-block font-weight-bold">Objet de financement {{ i + 1 }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

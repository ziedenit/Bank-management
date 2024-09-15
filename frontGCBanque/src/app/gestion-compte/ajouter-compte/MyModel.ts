 onBreadcrumbClick(index: number): void {
    this.selectedObjetIndex = index;
  }

  removeBreadcrumbItem(index: number): void {
    this.objetsFinancements.splice(index, 1);
    const manuallyAddedIndex = this.manuallyAddedIndices.indexOf(index);
    if (manuallyAddedIndex > -1) {
      this.manuallyAddedIndices.splice(manuallyAddedIndex, 1);
    }
    if (this.selectedObjetIndex >= index) {
      this.selectedObjetIndex = Math.max(this.selectedObjetIndex - 1, 0);
    }
  }

  fetchInitialData(): void {
    this.id = this.route.snapshot.queryParams['idFinancement'];
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
      this.extractedInitialFinancement = responseFinancement;
      this.setFinancementData(responseFinancement);
      this.setObjetFinancementData(responseFinancement.objetFinancement[0]);
      this.checkRequiredFields(responseFinancement, 0);
      this.checkPiecesJustificatives(responseFinancement, 0);
      this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
    });

    // Récupérer la liste des objets de financement
    this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
      this.objetsFinancements = objets;
      if (this.objetsFinancements.length > 1) {
        this.showFileAriane = true;
      }
    });
  }
<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb-custom">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve"
          (click)="onBreadcrumbClick(i)">
          <span>Objet de financement</span> {{ i + 1 }}
        </a>
        <button class="close-btn" *ngIf="manuallyAddedIndices.includes(i)" (click)="removeBreadcrumbItem(i)">x</button>
      </li>
    </ol>
    <div class="button-container">
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()" [disabled]="ajoutFinancementDisabled">
        Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>
  <!-- Contenu pour chaque objet de financement -->
<div class="container-fluid" *ngFor="let objet of objetsFinancements; let i = index">
  <div class="row">
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize">
            <h3 class="d-inline-block font-weight-bold" style="font-size: 17px;">Objet de financement {{ i + 1 }}</h3>
            <span class="float-right">
              <img *ngIf="hiddenObjetfinancement==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
              <img *ngIf="hiddenObjetfinancement==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
            </span>

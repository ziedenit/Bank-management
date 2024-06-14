<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <div class="ajoutFinancement">
        <button mat-stroked-button (click)="ajouterObjetFinancement()">
          <img src="../../../assets/icons/plus.svg" />
          &nbsp; ajouter un objet de financement
        </button>
      </div>
    </div>
  </div>

  <div class="breadcrumb-container">
    <div class="breadcrumb-item" *ngFor="let objet of objetsDeFinancement; let i = index" (click)="selectObjetFinancement(objet)">
      <div class="breadcrumb-content">
        <h3 class="d-inline-block font-weight-bold">Objet {{i + 1}}</h3>
      </div>
      <div *ngIf="selectedObjetFinancement === objet && !hiddenObjetfinancement" class="details">
        <div class="row">
          <!-- Afficher les champs de selectedObjetFinancement -->
          <div class="col-lg-4">
            <div class="form-group">
              <label for="codeObjetFinancement{{i}}">Code Objet Financement</label>
              <input type="text" class="form-control form-control-sm" [(ngModel)]="selectedObjetFinancement.codeObjetFinancement" id="codeObjetFinancement{{i}}">
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group">
              <label for="quotePartObjet{{i}}">Quote Part Objet</label>
              <input type="number" class="form-control form-control-sm" [(ngModel)]="selectedObjetFinancement.quotePartObjet" id="quotePartObjet{{i}}">
            </div>
          </div>
          <!-- Ajoutez les autres champs du modèle ici -->
        </div>
      </div>
    </div>
  </div>
</div>
	  //
	  .ajoutFinancement button {
  margin-top: 20px;
}

.breadcrumb-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}

.breadcrumb-item .breadcrumb-content {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
  text-align: center;
}

.breadcrumb-item .details {
  margin-top: 10px;
}

.required {
  color: red;
}

img {
  cursor: pointer;
}

.breadcrumb-item h3 {
  margin: 0;
}


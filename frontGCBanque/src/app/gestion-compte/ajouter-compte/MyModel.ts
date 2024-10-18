<div class="header">
  <div class="row main">
    <div class="col-2">
      <div class="header-logo">
        <img src="assets/images/logo-lcl.png" alt="Logo LCL">
      </div>
    </div>
    <div class="col-8">
      <div class="header-title">
        <h1>{{ title }}</h1>
      </div>
    </div>
  </div>
</div>

<app-oidc (userInfoEmitter)="connectedHandler($event)"></app-oidc>

<div class="container-starter" *ngIf="connected && !errorOIDC">
</div>

<div *ngIf="connected && !errorOIDC">
  <router-outlet></router-outlet>
</div>
//
.container-starter {
  margin-left: 50px;
  margin-top: 50px;
}

h1 {
  text-align: left;
  display: inline-flex;
  font-size: 2.5rem; /* Taille par défaut pour les grands écrans */
}

/* Ajustement pour les écrans de taille moyenne */
@media (max-width: 1200px) {
  h1 {
    font-size: 2rem;
  }
}

/* Ajustement pour les tablettes */
@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }
}

/* Ajustement pour les petits écrans (téléphones) */
@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
  }
}

h2, h3 {
  text-align: left;
}

.check {
  height: 30px;
}
	  

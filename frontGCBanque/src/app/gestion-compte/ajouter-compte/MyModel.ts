<div class="header">
  <div class="row main">
    <div class="col-2">
      <div class="header-logo">
        <img src="assets/images/logo-lcl.png" alt="Logo LCL">
      </div>
    </div>
    <div class="col-8">
      <div class="header-title">
        <h1>{{title}}</h1>
      </div>
    </div>
  </div>
</div>

<app-oidc (userInfoEmitter)="connectedHandler($event)"></app-oidc>

<div class="container-starter" *ngIf="connected && !errorOIDC"></div>

<div *ngIf="connected && !errorOIDC">
  <router-outlet></router-outlet>
</div>
//////:
	  /* Pour la mise en page de la barre de navigation */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.header-logo img {
  max-width: 100%; /* L'image est responsive */
  height: auto;
}

.header-title h1 {
  font-size: 2.5rem; /* Taille par défaut */
  text-align: center;
  margin: 0;
  transition: font-size 0.3s ease; /* Transition douce pour les changements */
}

@media (max-width: 1200px) {
  .header-title h1 {
    font-size: 2rem; /* Taille réduite pour les grands écrans */
  }
}

@media (max-width: 992px) {
  .header-title h1 {
    font-size: 1.8rem; /* Taille réduite pour les tablettes */
  }
}

@media (max-width: 768px) {
  .header-title h1 {
    font-size: 1.5rem; /* Taille réduite pour les petits écrans */
  }
}

@media (max-width: 576px) {
  .header-title h1 {
    font-size: 1.2rem; /* Encore plus petite pour les smartphones */
  }
}

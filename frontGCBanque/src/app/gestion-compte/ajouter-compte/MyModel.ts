<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" *ngIf="showFileAriane == true" class="breadcrumb-nav">
    <ol class="breadcrumb-custom">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
          {{ i + 1 }} <span>Objet de financement</span>
        </a>
      </li>
    </ol>
    <div class="button-container">
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>
body {
    font-family: Arial, sans-serif;
}

.breadcrumb-nav {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Add space between breadcrumb and button */
    padding: 10px 0; /* Adjust padding if necessary */
}

.breadcrumb-custom {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

.breadcrumb-item-custom {
    background-color: #2c3e50;
    color: white;
    padding: 10px 20px;
    position: relative;
    margin-right: 10px;
    clip-path: polygon(100% 0, 90% 50%, 100% 100%, 0% 100%, 10% 50%, 0% 0%);
}

.breadcrumb-item-custom a {
    color: white;
    text-decoration: none;
}

.breadcrumb-item-custom a:hover {
    text-decoration: underline;
}

.breadcrumb-item-custom:last-child {
    background-color: #6c7a89;
}

.breadcrumb-item-custom::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 10px solid #2c3e50;
    position: absolute;
    right: -10px;
    top: 0;
}

.breadcrumb-item-custom:last-child::after {
    border-left-color: transparent;
}

.breadcrumb-item-custom:last-child::after {
    border-left-color: #6c7a89;
}

.button-container {
    margin-left: auto; /* Push the button to the right */
}

button.btn {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    color: white;
    cursor: pointer;
}

button.btn img {
    margin-left: 5px;
}

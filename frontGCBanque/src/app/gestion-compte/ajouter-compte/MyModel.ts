import { Component } from '@angular/core';

@Component({
  selector: 'app-financement',
  templateUrl: './financement.component.html',
  styleUrls: ['./financement.component.css']
})
export class FinancementComponent {
  // Liste pour stocker les objets de financement
  objetsFinancement: any[] = [];
  
  // Méthode pour ajouter un nouvel objet de financement
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
      SirenDPE: '',
      addresseBien: '',
      addresseBienCodePostal: '',
      addresseBienVille: '',
      codeBatimentSelected: '',
      numeroDpeAdeme: ''
    };
    this.objetsFinancement.push(nouvelObjet);
  }
}
//
import { Component } from '@angular/core';

@Component({
  selector: 'app-financement',
  templateUrl: './financement.component.html',
  styleUrls: ['./financement.component.css']
})
export class FinancementComponent {
  // Liste pour stocker les objets de financement
  objetsFinancement: any[] = [];
  
  // Méthode pour ajouter un nouvel objet de financement
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
      SirenDPE: '',
      addresseBien: '',
      addresseBienCodePostal: '',
      addresseBienVille: '',
      codeBatimentSelected: '',
      numeroDpeAdeme: ''
    };
    this.objetsFinancement.push(nouvelObjet);
  }
}
//
.breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 1rem;
}

.breadcrumb-item {
  font-size: 1rem;
  color: #007bff;
}

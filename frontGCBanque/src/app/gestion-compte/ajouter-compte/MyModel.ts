import { Component } from '@angular/core';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css'],
})
export class YourComponent {
  dateDepot: string;
  hideFieldForm = false;
  isFieldsDisabled = false;
  alertDisplayed: boolean = false; // Drapeau pour suivre si l'alerte a été affichée

  // Méthode pour afficher l'alerte ou le pop-up
  recalculerAlignment(): void {
    if (!this.alertDisplayed) { // Vérifier si l'alerte n'a pas encore été affichée
      alert("Merci de recalculer l'alignement suite à ce changement.");
      // Ou utilisez un pop-up personnalisé ici si vous le souhaitez
      this.alertDisplayed = true; // Mettre à jour le drapeau pour éviter les futurs affichages
    }
  }
}
//


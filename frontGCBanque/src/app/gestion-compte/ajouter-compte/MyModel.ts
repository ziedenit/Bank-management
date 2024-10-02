import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-votre-composant',
  templateUrl: './votre-composant.component.html',
  styleUrls: ['./votre-composant.component.css']
})
export class VotreComposant {
  
  @Output() postDisabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() alertDisplayedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  postDisabled: boolean = false;
  alertDisplayed: boolean = false;

  recalculerAlignment() {
    this.postDisabled = true;
    this.postDisabledChange.emit(this.postDisabled); // Émettre la nouvelle valeur de postDisabled

    if (!this.alertDisplayed) {
      alert("Merci de calculer l'alignement suite à ce changement.");
      this.alertDisplayed = true;
      this.alertDisplayedChange.emit(this.alertDisplayed); // Émettre la nouvelle valeur de alertDisplayed
    }
  }
}
//
<!-- Exemple dans le template du composant parent -->
<app-votre-composant (postDisabledChange)="handlePostDisabledChange($event)" 
                     (alertDisplayedChange)="handleAlertDisplayedChange($event)">
</app-votre-composant>
//
export class ParentComposant {

  postDisabled: boolean;
  alertDisplayed: boolean;

  handlePostDisabledChange(postDisabled: boolean) {
    this.postDisabled = postDisabled;
    console.log('postDisabled a changé:', postDisabled);
  }

  handleAlertDisplayedChange(alertDisplayed: boolean) {
    this.alertDisplayed = alertDisplayed;
    console.log('alertDisplayed a changé:', alertDisplayed);
  }
}
	

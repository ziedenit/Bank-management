import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-justificatifs',
  templateUrl: './justificatifs.component.html',
  styleUrls: ['./justificatifs.component.scss']
})
export class JustificatifsComponent {

  @Input() hideFieldForm: boolean;
  @Input() dateDepot: boolean;
  @Input() numeroDpeAdeme: boolean;
  @Input() normeThermique: string;
  @Input() selectedOptionJustif: string;

  @Input() isDpeChecked:boolean
  @Input() isDateDepotChecked: boolean 
  @Input() isNormeThermiqueChecked: boolean
  

  @Output() isDateDepotCheckedChange = new EventEmitter<boolean>();
  @Output() isDpeCheckedChange = new EventEmitter<boolean>();
  @Output() isNormeThermiqueCheckedChange = new EventEmitter<boolean>();
  @Output() hiddenJustificatifChange = new EventEmitter<boolean>();
  @Output() selectedOptionJustifChange = new EventEmitter<string>(); 
  @Output() postDisabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() alertDisplayedChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  hiddenJustificatif=false;
  elementJustificatif=true;
 
  postDisabled: boolean = false;
  alertDisplayed: boolean = false;

  onSelectedOptionJustifChange(event: any) 
  {
    console.log("coucouuuu justif",this.selectedOptionJustif)
    this.selectedOptionJustif = event.target.value;
    this.selectedOptionJustifChange.emit(this.selectedOptionJustif); 
    
    }

  onDateDepotCheckedChange(event: any) {
    this.isDateDepotChecked = event.target.checked;
    this.isDateDepotCheckedChange.emit(this.isDateDepotChecked);
   
  }

  onDpeCheckedChange(event: any) {
    this.isDpeChecked = event.target.checked;
    this.isDpeCheckedChange.emit(this.isDpeChecked);
    
  }

  onNormeThermiqueCheckedChange(event: any) {
    this.isNormeThermiqueChecked = event.target.checked;
    this.isNormeThermiqueCheckedChange.emit(this.isNormeThermiqueChecked);
   
  }

  hideDataJustificatif() {
    this.hiddenJustificatif=true;
    return (this.elementJustificatif = false);
   }
  showDataJustificatif() {
    this.hiddenJustificatif=false;
    return (this.elementJustificatif = true);
    }
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


// ci haut le ts du composant fils 
// ci bas le bloc justif qui recoit les output du composant parent 
<!-- bloc justificatif -->
<app-justificatifs
  [hideFieldForm]="hideFieldForm"
  [dateDepot]="dateDepot"
  [numeroDpeAdeme]="numeroDpeAdeme"
  [normeThermique]="normeThermique"
  [isDpeChecked]="isDpeChecked"
  [selectedOptionJustif]="selectedOptionJustif"
  
 
  [isDateDepotChecked]="isDateDepotChecked"
  [isNormeThermiqueChecked]="isNormeThermiqueChecked"
  (isDateDepotCheckedChange)="isDateDepotChecked = $event"
  (isDpeCheckedChange)="isDpeChecked = $event"
  (isNormeThermiqueCheckedChange)="isNormeThermiqueChecked = $event"
  (selectedOptionJustifChange)="onSelectedOptionJustifChange($event)"
  (postDisabledChange)="handlePostDisabledChange($event)" 
(alertDisplayedChange)="handleAlertDisplayedChange($event)">
</app-justificatifs>
	//
 handlePostDisabledChange(postDisabled: boolean) {
			this.postDisabled = postDisabled;
			console.log('postDisabled a changé:', postDisabled);
		  }
		
		  handleAlertDisplayedChange(alertDisplayed: boolean) {
			this.alertDisplayed = alertDisplayed;
			console.log('alertDisplayed a changé:', alertDisplayed);
		  } 
}
la les deux méthode 
en bas le composant fils
<div class="container-fluid">
    <div class="justificatifs" *ngIf="hideFieldForm == false">
      <div class="blocJust">
        <img *ngIf="hiddenJustificatif == false" src="../../../assets/icons/arrow-up.svg" (click)="hideDataJustificatif()"  alt="image fleche haut" />
        &nbsp;
        <img *ngIf="hiddenJustificatif == true" alt="image fleche bas" src="../../../assets/icons/arrow-down.svg"  (click)="showDataJustificatif()" />
        &nbsp;
        <h3 style="margin-top: 14px; font-size: 17px; font-weight:bold; ">Documents envoyés au CEC {{pjLocal}} </h3>
      </div>
  

      <div *ngIf="elementJustificatif == true " class="content">
        <div class="checkbox-group">
          <div *ngIf="dateDepot" class="checkbox-item">
            <label>
              <input type="checkbox" [(ngModel)]="isDateDepotChecked"  (change)="onDateDepotCheckedChange($event)" (ngModelChange)="recalculerAlignment()" style="margin-top: -10px;">
              <p style="margin-left: 10px;">Contrat de vente / de réservation /de construction précisant la date de dépôt du PC (Permis de construire)
              </p>
            </label>
          </div>
  
          <div *ngIf="numeroDpeAdeme" class="checkbox-item" style="height: 50px; margin-top: -30px;">
            <label>           
              <br>
              <input type="checkbox" [(ngModel)]="isDpeChecked"  (change)="onDpeCheckedChange($event)" (ngModelChange)="recalculerAlignment()">
              <p style="margin-left: 10px; margin-top: 12px;">Compromis / promesse de vente incluant le DPE ou DPE seul </p>
              <select [(ngModel)]="selectedOptionJustif" (change)="onSelectedOptionJustifChange($event)" class="dropdown-list"> 
                <option value="DPE" selected>Document DPE</option> 
                <option value="Compromis de vente">Compromis / promesse de vente incluant le DPE</option> 
            </select>
            </label>
          </div>
  
          <div *ngIf="normeThermique && normeThermique !== 'option0' && !dateDepot" class="checkbox-item">
            <label>
              <input type="checkbox" [(ngModel)]="isNormeThermiqueChecked" (change)="onNormeThermiqueCheckedChange($event)" (ngModelChange)="recalculerAlignment()" style="margin-top: -10px;">
              <p style="margin-left: 10px;">Document attestant de la Norme thermique </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  mon seul probleme est que le postDisabled marque bien lorsque je change d'un objet a un autre en decochant dans tous les objets mais meme en changenant d'objet en cliquant sur la méthode onBread mais alertDisplayed ne s'affiche pas si je clique sur autre objet 
	

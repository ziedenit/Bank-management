<div class="container-fluid">
    <div class="justificatifs" *ngIf="hideFieldForm == false">
      <div class="blocJust">
        <img *ngIf="hiddenJustificatif == false" src="../../../assets/icons/arrow-up.svg" (click)="hideDataJustificatif()"  alt="image fleche haut" />
        &nbsp;
        <img *ngIf="hiddenJustificatif == true" alt="image fleche bas" src="../../../assets/icons/arrow-down.svg"  (click)="showDataJustificatif()" />
        &nbsp;
        <h3 style="margin-top: 14px; font-size: 17px; font-weight:bold; ">Documents envoyés au CEC</h3>
      </div>
  

      <div *ngIf="elementJustificatif == true" class="content">
        <div class="checkbox-group">
          <div *ngIf="dateDepot" class="checkbox-item">
            <label>
              <input type="checkbox" [(ngModel)]="isDateDepotChecked"  (change)="onDateDepotCheckedChange($event)" style="margin-top: -10px;">
              <p style="margin-left: 10px;">Document attestant de la date de dépôt du permis de construire</p>
            </label>
          </div>
  
          <div *ngIf="numeroDpeAdeme" class="checkbox-item" style="height: 50px; margin-top: -30px;">
            <label>           
              <br>
              <input type="checkbox" [(ngModel)]="isDpeChecked"  (change)="onDpeCheckedChange($event)">
              <p style="margin-left: 10px; margin-top: 12px;">Document DPE ou Compromis de vente</p>
              <select [(ngModel)]="selectedOptionJustif" (change)="onSelectedOptionJustifChange($event)" class="dropdown-list"> 
                <option value="DPE" selected>Document DPE</option> 
                <option value="Compromis de vente">Compromis de vente</option> 
            </select>
            </label>
          </div>
  
          <div *ngIf="normeThermique && normeThermique !== 'option0' && !dateDepot" class="checkbox-item">
            <label>
              <input type="checkbox" [(ngModel)]="isNormeThermiqueChecked" (change)="onNormeThermiqueCheckedChange($event)" style="margin-top: -10px;">
              <p style="margin-left: 10px;">Document attestant de la Norme thermique</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  onBreadcrumbClick(index: number ) {
		this.showBlocResult=true;
		// sauvgarde des données  propre à un objet selectionné  du fil Ariane 
       this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
	
	   console.log("selectedObjetIndex")
	   console.log(this.selectedObjetIndex)
	   this.selectedObjetIndex=index;
	   // Appliquer les regles metier sur l'element selectionné du fil Ariane 
        this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
       this.checkRequiredFields(this.extractedInitialFinancement,index);
		this.checkPiecesJustificatives(this.extractedInitialFinancement,index);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
		
		   this.depExist=true; 
			console.log("Contenance du financement actuel")
			console.log(this.extractedInitialFinancement)
			
		  }
		  removeBreadcrumbItem(index: number) {
			this.objetsFinancements.splice(index, 1);
			if(this.objetsFinancements.length>=1)
				{
					this.ajoutFinancementDisabled=false;
				}
			this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
		  }

      private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
		
        if (!currentObject || !currentObject.bien) return;
        const bien = currentObject.bien;
    // verification existance dpeActuel si non initilisation 
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    } 
	//

		const dpeActuel =currentObject.bien.dpeActuel;
		currentObject.firstDisconnectionOfd=false;
        bien.partLCL = this.partLcl;
        bien.montantFinanceLCL = this.montantLclFinance;
        bien.prixBien = this.prixAquisitionBien;
        bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
        bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique); 
        bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
        bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
		bien.etatBien=this.getCodeEtatBien(this.selectedNatBatiment)
	    bien.codeBatiment=this.getCodeEtatBatiment(this.codeBatimentSelected)
		bien.surfaceBien = this.formGroup.get('surfaceBien').value;
		bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value;
		bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value;
		bien.numeroNomRue = this.formGroup.get('numeroNomRue').value;
		bien.codePostal = this.formGroup.get('codePostal').value;
		bien.nomCommune = this.formGroup.get('ville').value;
		bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value;
		bien.anneeConstruction = this.formGroup.get('anneeConstruction').value;
		bien.typeBatiment = this.formGroup.get('typeBatiment').value;
		bien.dpeActuel.classeCep = this.formGroup.get('lettreCEP').value;
		bien.dpeActuel.classeGes = this.formGroup.get('lettreGES').value;
		bien.typeEnergie = this.formGroup.get('energieType').value;
		
		const justificatifs = [];
        if (this.isDpeChecked) {
          justificatifs.push({
            typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
            dpeActuel: this.selectedOptionJustif === "DPE",
            numeroDpe: this.numeroDpeAdeme
          });
        }    
        if (this.isNormeThermiqueChecked) {
          justificatifs.push({ typePiece: "Norme thermique" });
		  console.log("isNormeThermiqueChecked")
        }
        if (this.isDateDepotChecked) {
          justificatifs.push({ typePiece: "Permis de construire" });
        }
		console.log("this.isNormeThermiqueChecked")
		console.log(this.isNormeThermiqueChecked)
  
		console.log("this.isDateDepotChecked")
		console.log(this.isDateDepotChecked)
		currentObject.piecesJustificatives = justificatifs;

	
      }
	checkPiecesJustificatives(treatedFinancement:Financement,index:number) {		
		if (treatedFinancement.objetFinancement[index] != null && treatedFinancement.objetFinancement[index].piecesJustificatives != null) {
			this.presenceJustifDPE = treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'DPE')
			|| treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
			this.presenceJustifDateDepotPC=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
			this.presenceJustifNormeThermique=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
		}
		if(this.presenceJustifDPE && treatedFinancement.objetFinancement[index].bien.dpeActuel!=null){
		this.isDpe= treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'DPE');
		this.isCompromis=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
		//ajouter un moyen pour forcer le passage de l'index
		if(this.isDpe){this.selectedOptionJustif='DPE'}
		if(this.isCompromis){this.selectedOptionJustif='Compromis de vente'}
		this.isDpeChecked=true
		}
		if(!this.presenceJustifDPE && treatedFinancement.objetFinancement[index].bien.dpeActuel!=null  && treatedFinancement.objetFinancement[index].bien.dpeActuel.numeroDpe!=null){this.errorDpeMessage='Justificatif DPE manquant'}	
		if(this.presenceJustifDateDepotPC)
		{this.isDateDepotChecked=true;   
		}
		if(!this.presenceJustifDateDepotPC &&treatedFinancement.objetFinancement[index].bien.dateDepotPc!=null)
		{this.errorDateDepotMessage='Justificatif attestant de la date de dépôt du permis de construire manquant';}
		if(this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC){this.isNormeThermiqueChecked=true }
		if(!this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC && !this.errorDateDepotMessage 
			&&treatedFinancement.objetFinancement[index].bien.codeNormeThermique!=null){this.errorNormeThermiqueMessage='Justificatif Norme thermique manquant'}
}
j'ai le code ci haut je veux mettre en place des listner 
  [(ngModel)]="isDateDepotChecked" 
   [(ngModel)]="isNormeThermiqueChecked"
 [(ngModel)]="isDpeChecked"
et dans la methode save je dois recuperer les valeurs convenablement pour que par la suite faire appel checkPiecesJustificatives
je veux a chaque fois que mon current objet avec son index soit passer en contexte pour chaque current objet

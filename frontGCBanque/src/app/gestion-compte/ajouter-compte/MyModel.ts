private setObjetFinancementProperties(objetFinancement: any): void {
	switch (objetFinancement.codeObjetFinancement) {
  
		case "02":
			this.objetFinance = "Acquisition de bâtiment";
			break;
		case "03":
			this.objetFinance = "Rénovation de bâtiment";
			this.depExist = true;
			break;
		default:
			break;
	}
    if (!objetFinancement || !objetFinancement.bien) return;
    const bien = objetFinancement.bien;

	if (bien.eligibleDpe) {
        this.selectedType = this.eligibleDpeMapping[bien.eligibleDpe].type;
        this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;
       // Écouteur pour `eligibleDpe`
       this.watchPropertyChanges(bien, 'eligibleDpe', (newValue) => {
        this.selectedType = this.eligibleDpeMapping[newValue].type;
        this.hideFieldForm = this.eligibleDpeMapping[newValue].hideFieldForm;
    });
      
      }

	if (bien.etatBien) {this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
    this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
    this.watchPropertyChanges(bien, 'etatBien', (newValue) => {
        this.selectedNatBatiment = this.etatBienMapping[newValue];
    });
  }
    if (bien.codeBatiment) {this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
      this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
      this.watchPropertyChanges(bien, 'codeBatiment', (newValue) => {
          this.codeBatimentSelected = this.codeBatimentMapping[newValue];
      });
    }
    
    this.partLcl = bien?.partLCL;
    this.watchPropertyChanges(bien, 'partLCL', (newValue) => {
      this.partLcl = newValue;
  });
    this.montantLclFinance = bien?.montantFinanceLCL;
    this.watchPropertyChanges(bien, 'montantFinanceLCL', (newValue) => {
      this.montantLclFinance = newValue;
  });

	this.prixAquisitionBien = bien?.prixBien;
  this.watchPropertyChanges(bien, 'prixBien', (newValue) => {
    this.prixAquisitionBien = newValue;
});


	this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
  this.watchPropertyChanges(bien, 'dateDepotPc', (newValue) => {
    this.dateDepot = newValue ? formatDate(newValue, 'yyyy-MM-dd', "en-US") : undefined;
});

    if (bien.codeNormeThermique) {this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];
    
      this.watchPropertyChanges(bien, 'codeNormeThermique', (newValue) => {
        this.normeThermique = this.codeNormeThermiqueMapping[newValue];
    });}
    if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) { this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
      this.watchPropertyChanges(bien.dpeActuel, 'sirenDiagnostiqueur', (newValue) => {
        this.SirenDPE = newValue;
    });
    }
    this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
    this.watchPropertyChanges(bien.dpeActuel, 'numeroDpe', (newValue) => {
      this.numeroDpeAdeme = newValue;
  });


  if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
    this.DpeResults = true;
    this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];

    this.watchPropertyChanges(objetFinancement.alignement, 'topAlignement', (newValue) => {
        this.alignementResultText = this.alignementMapping[newValue];
    });
}



      }

// Méthode pour surveiller les changements de propriété
private watchPropertyChanges(obj: any, prop: string, callback: (newValue: any) => void): void {
  let value = obj[prop];
  Object.defineProperty(obj, prop, {
      get: () => value,
      set: (newValue) => {
          if (value !== newValue) {
              value = newValue;
              callback(newValue);
          }
      },
      enumerable: true,
      configurable: true,
  });
}
onBreadcrumbClick(index: number ) {
			this.selectedObjetIndex=index;
			 // Appliquer les regles metier sur l'element selectionné du fil Ariane a revoir l'adaptation?
       this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
       this.mapFinancementDataMultiOfd(this.extractedInitialFinancement,index)
			this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien,index); 
      this.setFinancementDataOnScreenMultiOfd(this.extractedInitialFinancement,index)
			this.depExist=true; 
		  }

j'ai dapté de cette facon est j'ai testé mais ca ne marche pas en changeant d'un objet a un autre en cliquant et revenant les changement ne se mets pas ajour ca marche pas 

 ajouterObjetFinancement() {
	  
    this.showDeleteIcon =true;
    this.showFileAriane = true;
    const nouvelObjet: ObjetFinancement = {
      idObjetFinancement: null,
      codeObjetFinancement: "02",
      quotePartObjet: null,
      gainCEP: null,
      dateFinTravaux: null,
      bien: new Bien(),
      dpeAvantTravaux: new Dpe(),
      dpeApresTravaux: new Dpe(),
      alignement: new Alignement(),
      eligibilite: new Eligibilite(),
      piecesJustificatives: [],
      codeFamilleObjet: "01",
      garantie: [],
     firstDisconnectionOfd: true,
     
    };
     
    this.idGeneratorService.generateIdObjetFinancement().subscribe(
      id => {
      nouvelObjet.idObjetFinancement = id;
      this.objetsFinancements.push(nouvelObjet);
	  console.log("nouveau objet initilisé et cree lors de click sur le button")
	  console.log(nouvelObjet)
      this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
      this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
      console.log("le financement apres recupération et ajout des objets")
      console.log(this.extractedInitialFinancement)
	
      },
      error => {
      console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
      }
	  
    );
    
    }
j'ai cette fonction et j'ai ce button <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
    je veux a chaque appel de fonction ajouterObjetFinancement griser le button mais le retablir de nouveau si 
des que cette fonction et appeler ( remarque on peut se baser sur l'id de objet en cours deja ajoute )
showAlignement(): void {
	this.calculedAlignementIndexObjects.push(this.selectedObjetIndex)

			this.validateFormFields();
            this.prepareLigneContext();
			this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);

			this.DpeResults = true;
			this.elementResults = true;					
			this.eligibiliteDpe = this.selectedType === "option1" ? "02" : "99";
			this.eligibiliteDpeMessage = this.selectedType === "option1" ? "éligible et" : "";
			
	   this.engineService.alignement(this.ligneContext).subscribe(aligne => {		
				this.alignementResultText = this.alignementMapping[aligne];
				this.alignementResult = aligne;
				console.log('LineContext', this.ligneContext,'Alignement Simulé', this.alignementResult);
			});
		
		this.engineServiceXtra.alignementXtra(this.ligneContextXtra).subscribe(aligneXtra => {				
				this.alignementXtraResult = aligneXtra;
				console.log('LineContext XTRA', this.ligneContextXtra,'Alignement XTRA', aligneXtra);
			});
		
			this.errorDpeMessage = this.checkFileDpeInserted();
			this.errorNormeThermiqueMessage = this.checkNormeThermique();
			this.errorDateDepotMessage = this.checkFileDateDepotInserted();
}		

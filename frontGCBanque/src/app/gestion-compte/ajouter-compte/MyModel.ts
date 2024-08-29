 ajouterObjetFinancement() {
	   // Pop up Attention il faut faire le calcul de l'alignement pour l'objet courant 
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
j'ai cette fonction et je veux ajouter a chaque appel a cette contion  Pop up Attention il faut faire le calcul de l'alignement pour l'objet courant 

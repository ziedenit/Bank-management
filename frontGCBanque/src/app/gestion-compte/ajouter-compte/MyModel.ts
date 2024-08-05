  ajouterObjetFinancement() {
	this.showFileAriane=true;
	const nouvelObjet: ObjetFinancement = {
		idObjetFinancement: "",
		codeObjetFinancement: "",
		quotePartObjet: null,
		gainCEP: null,
		dateFinTravaux: null,
		bien: new Bien(),
		dpeAvantTravaux: new Dpe(),
		dpeApresTravaux: new Dpe(),
		alignement: new Alignement(),
		eligibilite: new Eligibilite(),
		piecesJustificatives: [],
		codeFamilleObjet: "",
		garantie: [],
		firstDisconnectionOfd: false,
	  };
	 
	  this.idGeneratorService.generateIdObjetFinancement().subscribe(
		id => {
		  nouvelObjet.idObjetFinancement = id;
		},
		error => {
		  console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
		}
		this.objetsFinancements.push(nouvelObjet);
		this.extractedInitialFinancement.objetFinancement.push(nouvelObjet);

			
	}
No overload matches this call.
  The last overload gave the following error.
    Argument of type 'number' is not assignable to parameter of type '() => void'.ts(2769)
Observable.d.ts(54, 5): The last overload is declared here.
(property) FilArianeComponent.objetsFinancements: ObjetFinancement[]

ajouterObjetFinancement() {
  this.showFileAriane = true;
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
      this.objetsFinancements.push(nouvelObjet);
      this.extractedInitialFinancement.objetFinancement.push(nouvelObjet);
    },
    error => {
      console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
    }
  );
}

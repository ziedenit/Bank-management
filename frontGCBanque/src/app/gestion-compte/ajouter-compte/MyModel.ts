 onBreadcrumbClick(index: number): void {
    this.selectedObjetIndex = index;

    // Appliquez les règles métier à l'objet sélectionné
    this.applyBusinessRules(this.extractedInitialFinancement, index);
  }

  // Méthode pour appliquer les règles métier à l'objet sélectionné
  applyBusinessRules(financement: any, index: number): void {
    // Appliquez vos règles spécifiques ici
    this.setObjetFinancementData(financement.objetFinancement[index]);
    this.checkRequiredFields(financement, index);
    this.checkPiecesJustificatives(financement, index);
    this.setupFormGroup(financement.objetFinancement[index].bien);
  }

removeBreadcrumbItem(index: number): void {
    this.objetsFinancements.splice(index, 1);
    const manuallyAddedIndex = this.manuallyAddedIndices.indexOf(index);
    if (manuallyAddedIndex > -1) {
      this.manuallyAddedIndices.splice(manuallyAddedIndex, 1);
    }
    if (this.selectedObjetIndex >= index) {
      this.selectedObjetIndex = Math.max(this.selectedObjetIndex - 1, 0);
    }
    this.applyBusinessRules(this.extractedInitialFinancement, this.selectedObjetIndex); // Recalculer les règles métier après suppression
  }

  ajouterObjetFinancement(): void {
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    const nouvelObjet: ObjetFinancement = {
      idObjetFinancement: null,
      codeObjetFinancement: '02',
      quotePartObjet: null,
      gainCEP: null,
      dateFinTravaux: null,
      bien: this.createNewBien(),
      dpeAvantTravaux: this.createNewDpe(),
      dpeApresTravaux: this.createNewDpe(),
      alignement: Alignement.createDefault(),
      eligibilite: new Eligibilite(),
      codeFamilleObjet: '01',
      garantie: [],
      firstDisconnectionOfd: true,
      piecesJustificatives: []
    };

    this.idGeneratorService.generateIdObjetFinancement().subscribe(
      idFinancement => {
        nouvelObjet.idObjetFinancement = idFinancement;
        this.idGeneratorService.generateIdBien().subscribe(
          idBien => {
            nouvelObjet.bien.idBien = idBien;
            this.objetsFinancements.push(nouvelObjet);
            this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];
            this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
            this.newIndex = this.objetsFinancements.length - 1;
            this.ajoutFinancementDisabled = true;
            this.applyBusinessRules(this.extractedInitialFinancement, this.newIndex); // Appliquez les règles métier au nouvel objet ajouté
          },
          error => {
            console.error('Erreur lors de la génération de l\'ID du bien : ', error);
          }
        );
      },
      error => {
        console.error('Erreur lors de la génération de l\'ID de l\'objet de financement : ', error);
      }
    );
  }

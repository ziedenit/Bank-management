ajouterObjetFinancement() {
    // 1. Sauvegarder et valider l'objet de financement actuel
    if (this.selectedObjetIndex !== undefined && this.selectedObjetIndex !== null) {
        this.checkFormFieldsFormGroup(this.selectedObjetIndex); // Valider les champs obligatoires
        this.prepareLigneContext(this.selectedObjetIndex); // Sauvegarder les données de l'objet actuel
    }

    // 2. Réinitialisation des variables et de l'état
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    // 3. Création de l'objet de financement vierge avec toutes les propriétés du bien et du DPE initialisées
    const nouvelObjet: ObjetFinancement = {
        idObjetFinancement: null,
        codeObjetFinancement: "02",
        quotePartObjet: null,
        gainCEP: null,
        dateFinTravaux: null,
        bien: this.createNewBien(),  // Initialise l'objet bien avec tous les champs
        dpeAvantTravaux: this.createNewDpe(), // Initialise DPE avant travaux
        dpeApresTravaux: this.createNewDpe(), // Initialise DPE après travaux
        alignement: Alignement.createDefault(), // Alignement par défaut
        eligibilite: new Eligibilite(), // Eligibilité par défaut
        codeFamilleObjet: "01", // Famille par défaut
        garantie: [],
        firstDisconnectionOfd: true,
        piecesJustificatives: []
    };

    // 4. Générer un nouvel ID pour l'objet de financement
    this.idGeneratorService.generateIdObjetFinancement().subscribe(
        idFinancement => {
            nouvelObjet.idObjetFinancement = idFinancement;

            // 5. Générer l'ID pour le bien de l'objet avant de l'ajouter
            this.idGeneratorService.generateIdBien().subscribe(
                idBien => {
                    nouvelObjet.bien.idBien = idBien;  // Assigner l'ID du bien

                    // 6. Ajouter le nouvel objet de financement à la liste
                    this.objetsFinancements.push(nouvelObjet);
                    this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];  // Mise à jour des objets

                    // 7. Marquer l'objet comme ajouté manuellement
                    this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
                    this.newIndex = this.objetsFinancements.length - 1;

                    // 8. Désactiver le bouton d'ajout tant que l'alignement n'est pas calculé
                    this.ajoutFinancementDisabled = true;

                    console.log("Nouvel objet ajouté avec ID bien et financement générés", nouvelObjet);

                    // 9. Basculer vers le nouvel objet ajouté
                    this.switchObjet(this.newIndex);
                },
                error => {
                    console.error("Erreur lors de la génération de l'ID du bien : ", error);
                }
            );
        },
        error => {
            console.error("Erreur lors de la génération de l'ID de l'objet de financement : ", error);
        }
    );
}

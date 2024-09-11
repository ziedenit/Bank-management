private createNewBien(): Bien {
    return {
        idBien: null,
        surfaceBien: null, // Réinitialisé à vide
        prixBien: null, // Réinitialisé à vide
        montantFinanceLCL: null, // Réinitialisé à vide
        partLCL: null, // Réinitialisé à vide
        dateDepotPc: null, // Réinitialisé à vide
        anneeConstruction: null, // Réinitialisé à vide
        typeBatiment: null, // Réinitialisé à vide
        etatBien: null, // Réinitialisé à vide
        codeBatiment: null, // Réinitialisé à vide
        codeNormeThermique: null, // Réinitialisé à vide
        dpeActuel: this.createNewDpe(), // Réinitialisé à vide
        numeroNomRue: null, // Réinitialisé à vide
        codePostal: null, // Réinitialisé à vide
        nomCommune: null, // Réinitialisé à vide
        typeEnergie: null, // Réinitialisé à vide
        // Propriétés manquantes que le compilateur attend :
        adresseComplete: null, // Réinitialisé à vide
        bienFinanceLCL: null, // Réinitialisé à vide
        numeroVoie: null, // Réinitialisé à vide
        nomRue: null, // Réinitialisé à vide
        numeroEtNomRue: null, // Réinitialisé à vide
        typeBien: null, // Réinitialisé à vide
        // Ajouter toutes les autres propriétés manquantes ici
        // en les initialisant à `null` ou une valeur par défaut
        pays: null, // Réinitialisé à vide
        latitude: null, // Réinitialisé à vide
        longitude: null, // Réinitialisé à vide
        codeInseeCommune: null, // Réinitialisé à vide
        codeDepartement: null, // Réinitialisé à vide
        modeleDpe: null, // Réinitialisé à vide
        numeroDpeRemplace: null, // Réinitialisé à vide
        dateReceptionDpe: null, // Réinitialisé à vide
        dateFinValiditeDpe: null, // Réinitialisé à vide
        versionDpe: null, // Réinitialisé à vide
        methodeDpeApplique: null, // Réinitialisé à vide
        periodeConstruction: null, // Réinitialisé à vide
        coordonneeCartographiqueX: null, // Réinitialisé à vide
        coordonneeCartographiqueY: null, // Réinitialisé à vide
        referenceCadastre: null // Réinitialisé à vide
    };
}

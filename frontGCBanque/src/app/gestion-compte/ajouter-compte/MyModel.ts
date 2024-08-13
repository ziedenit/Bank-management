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

    // Mise à jour des propriétés avec écouteurs
    if (bien.eligibleDpe) {
        this.selectedType = this.eligibleDpeMapping[bien.eligibleDpe].type;
        this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;

        // Écouteur pour `eligibleDpe`
        this.watchPropertyChanges(bien, 'eligibleDpe', (newValue) => {
            this.selectedType = this.eligibleDpeMapping[newValue].type;
            this.hideFieldForm = this.eligibleDpeMapping[newValue].hideFieldForm;
        });
    }

    if (bien.etatBien) {
        this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
        this.watchPropertyChanges(bien, 'etatBien', (newValue) => {
            this.selectedNatBatiment = this.etatBienMapping[newValue];
        });
    }

    if (bien.codeBatiment) {
        this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
        this.watchPropertyChanges(bien, 'codeBatiment', (newValue) => {
            this.codeBatimentSelected = this.codeBatimentMapping[newValue];
        });
    }

    // Écouteur pour chaque champ individuel
    this.watchPropertyChanges(bien, 'partLCL', (newValue) => {
        this.partLcl = newValue;
    });

    this.watchPropertyChanges(bien, 'montantFinanceLCL', (newValue) => {
        this.montantLclFinance = newValue;
    });

    this.watchPropertyChanges(bien, 'prixBien', (newValue) => {
        this.prixAquisitionBien = newValue;
    });

    this.watchPropertyChanges(bien, 'dateDepotPc', (newValue) => {
        this.dateDepot = newValue ? formatDate(newValue, 'yyyy-MM-dd', "en-US") : undefined;
    });

    this.watchPropertyChanges(bien, 'codeNormeThermique', (newValue) => {
        this.normeThermique = this.codeNormeThermiqueMapping[newValue];
    });

    if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) {
        this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
        this.watchPropertyChanges(bien.dpeActuel, 'sirenDiagnostiqueur', (newValue) => {
            this.SirenDPE = newValue;
        });
    }

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

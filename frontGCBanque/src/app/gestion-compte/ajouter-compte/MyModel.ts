import { BehaviorSubject } from 'rxjs';

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

    // Création d'observables pour chaque champ suivi
    this.watchPropertyChanges(bien, 'eligibleDpe').subscribe(newValue => {
        this.selectedType = this.eligibleDpeMapping[newValue]?.type;
        this.hideFieldForm = this.eligibleDpeMapping[newValue]?.hideFieldForm;
    });

    this.watchPropertyChanges(bien, 'etatBien').subscribe(newValue => {
        this.selectedNatBatiment = this.etatBienMapping[newValue];
    });

    this.watchPropertyChanges(bien, 'codeBatiment').subscribe(newValue => {
        this.codeBatimentSelected = this.codeBatimentMapping[newValue];
    });

    this.watchPropertyChanges(bien, 'partLCL').subscribe(newValue => {
        this.partLcl = newValue;
    });

    this.watchPropertyChanges(bien, 'montantFinanceLCL').subscribe(newValue => {
        this.montantLclFinance = newValue;
    });

    this.watchPropertyChanges(bien, 'prixBien').subscribe(newValue => {
        this.prixAquisitionBien = newValue;
    });

    this.watchPropertyChanges(bien, 'dateDepotPc').subscribe(newValue => {
        this.dateDepot = newValue ? formatDate(newValue, 'yyyy-MM-dd', "en-US") : undefined;
    });

    this.watchPropertyChanges(bien, 'codeNormeThermique').subscribe(newValue => {
        this.normeThermique = this.codeNormeThermiqueMapping[newValue];
    });

    if (bien.dpeActuel) {
        this.watchPropertyChanges(bien.dpeActuel, 'sirenDiagnostiqueur').subscribe(newValue => {
            this.SirenDPE = newValue;
        });

        this.watchPropertyChanges(bien.dpeActuel, 'numeroDpe').subscribe(newValue => {
            this.numeroDpeAdeme = newValue;
        });
    }

    if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
        this.DpeResults = true;
        this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];

        this.watchPropertyChanges(objetFinancement.alignement, 'topAlignement').subscribe(newValue => {
            this.alignementResultText = this.alignementMapping[newValue];
        });
    }
}

// Méthode pour surveiller les changements de propriété avec BehaviorSubject
private watchPropertyChanges(obj: any, prop: string): BehaviorSubject<any> {
    if (!obj.__observers) {
        obj.__observers = {};
    }

    if (!obj.__observers[prop]) {
        obj.__observers[prop] = new BehaviorSubject(obj[prop]);
    }

    Object.defineProperty(obj, prop, {
        get: () => obj.__observers[prop].value,
        set: (newValue) => {
            if (obj.__observers[prop].value !== newValue) {
                obj.__observers[prop].next(newValue);
            }
        },
        enumerable: true,
        configurable: true,
    });

    return obj.__observers[prop];
}

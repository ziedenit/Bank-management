export class Dpe {
    id: number;
    origineCreation: string;
    dateCreation: Date;
    origineModification: string;
    dateModification: Date;
    idDpe: string;
    numeroDpe: string;
    estimationCep: number;
    classeCep: string;
    estimationGes: number;
    classeGes: string;
    dateEtablissementDpe: Date;
    dateReceptionDpe: Date;
    dateFinValiditeDpe: Date;
    sirenDiagnostiqueur: string;
    etatBien: string;
    modelDpe: string;
    numeroDpeRemplace: string;
    versionDpe: string;
    methodeDpeApplique: string;

    constructor() {
        this.id = 0;
        this.origineCreation = '';
        this.dateCreation = new Date();
        this.origineModification = '';
        this.dateModification = new Date();
        this.idDpe = '';
        this.numeroDpe = '';
        this.estimationCep = 0;
        this.classeCep = '';
        this.estimationGes = 0;
        this.classeGes = '';
        this.dateEtablissementDpe = null;
        this.dateReceptionDpe = null;
        this.dateFinValiditeDpe = null;
        this.sirenDiagnostiqueur = null;
        this.etatBien = '';
        this.modelDpe = '';
        this.numeroDpeRemplace = '';
        this.versionDpe = '';
        this.methodeDpeApplique = '';
    }
}

export class Bien {
    partLCL: number | null;
    montantFinanceLCL: number | null;
    prixBien: number | null;
    dateDepotPc: Date | null;
    codeNormeThermique: string | null;
    dpeActuel: Dpe;
    codePostal: string | null;
    numeroNomRue: string | null;
    nomCommune: string | null;
    typeEnergie: string | null;
    surfaceBien: number | null;
    anneeConstruction: number | null;
    typeBatiment: string | null;
    codeDepartement: string | null;
    codeInseeCommune: string | null;
    periodeConstruction: string | null;
    coordonneeCartographiqueX: number | null;
    coordonneeCartographiqueY: number | null;
    etatBien: string | null;

    constructor() {
        this.partLCL = null;
        this.montantFinanceLCL = null;
        this.prixBien = null;
        this.dateDepotPc = null;
        this.codeNormeThermique = null;
        this.dpeActuel = new Dpe();
        this.codePostal = null;
        this.numeroNomRue = null;
        this.nomCommune = null;
        this.typeEnergie = null;
        this.surfaceBien = null;
        this.anneeConstruction = null;
        this.typeBatiment = null;
        this.codeDepartement = null;
        this.codeInseeCommune = null;
        this.periodeConstruction = null;
        this.coordonneeCartographiqueX = null;
        this.coordonneeCartographiqueY = null;
        this.etatBien = null;
    }
}

export class Alignement {
    topAlignement: string | null;
    topAlignementXtra: string | null;

    constructor() {
        this.topAlignement = null;
        this.topAlignementXtra = null;
    }
}

export class Eligibilite {
    topEligibilite: string | null;

    constructor() {
        this.topEligibilite = null;
    }
}

export class Piece {
    typePiece: string | null;
    dpeActuel: boolean | null;
    numeroDpe: string | null;

    constructor() {
        this.typePiece = null;
        this.dpeActuel = null;
        this.numeroDpe = null;
    }
}

export class ObjetFinancement {
    idObjetFinancement: string | null;
    codeObjetFinancement: string | null;
    quotePartObjet: number | null;
    gainCEP: number | null;
    dateFinTravaux: Date | null;
    bien: Bien;
    dpeAvantTravaux: Dpe;
    dpeApresTravaux: Dpe;
    alignement: Alignement;
    eligibilite: Eligibilite;
    piecesJustificatives: Piece[];
    codeFamilleObjet: string | null;
    garantie: any[];
    firstDisconnectionOfd: boolean;

    constructor() {
        this.idObjetFinancement = null;
        this.codeObjetFinancement = null;
        this.quotePartObjet = null;
        this.gainCEP = null;
        this.dateFinTravaux = null;
        this.bien = new Bien();
        this.dpeAvantTravaux = new Dpe();
        this.dpeApresTravaux = new Dpe();
        this.alignement = new Alignement();
        this.eligibilite = new Eligibilite();
        this.piecesJustificatives = [];
        this.codeFamilleObjet = null;
        this.garantie = [];
        this.firstDisconnectionOfd = true;
    }
}

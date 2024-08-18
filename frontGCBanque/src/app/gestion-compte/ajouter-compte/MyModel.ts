 constructor() {
        this.id = 0;
        this.origineCreation = '';
        this.dateCreation = new Date(); // Initialise avec la date actuelle
        this.origineModification = '';
        this.dateModification = new Date(); // Initialise avec la date actuelle
        this.idDpe = '';
        this.numeroDpe = '';
        this.estimationCep = 0;
        this.classeCep = '';
        this.estimationGes = 0;
        this.classeGes = '';
        this.dateEtablissementDpe = null; // null si pas de valeur par défaut
        this.dateReceptionDpe = null; // null si pas de valeur par défaut
        this.dateFinValiditeDpe = null; // null si pas de valeur par défaut
        this.sirenDiagnostiqueur = '';
        this.etatBien = '';
        this.modelDpe = '';
        this.numeroDpeRemplace = '';
        this.versionDpe = '';
        this.methodeDpeApplique = '';
    }

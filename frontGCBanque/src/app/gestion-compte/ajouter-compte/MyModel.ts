export class YourComponent {

  // Déclaration des BehaviorSubjects pour chaque champ
  private partLclSubject = new BehaviorSubject<string>(null);
  private montantLclFinanceSubject = new BehaviorSubject<string>(null);
  private prixAquisitionBienSubject = new BehaviorSubject<string>(null);
  private dateDepotSubject = new BehaviorSubject<string>(null);
  private normeThermiqueSubject = new BehaviorSubject<string>(null);
  private selectedNatBatimentSubject = new BehaviorSubject<string>(null);
  private SirenDPESubject = new BehaviorSubject<string>(null);
  private addresseBienSubject = new BehaviorSubject<string>(null);
  private addresseBienCodePostalSubject = new BehaviorSubject<string>(null);
  private addresseBienVilleSubject = new BehaviorSubject<string>(null);
  private codeBatimentSelectedSubject = new BehaviorSubject<string>(null);
  private numeroDpeAdemeSubject = new BehaviorSubject<string>(null);

  // Observables pour les abonnements
  partLcl$ = this.partLclSubject.asObservable();
  montantLclFinance$ = this.montantLclFinanceSubject.asObservable();
  prixAquisitionBien$ = this.prixAquisitionBienSubject.asObservable();
  dateDepot$ = this.dateDepotSubject.asObservable();
  normeThermique$ = this.normeThermiqueSubject.asObservable();
  selectedNatBatiment$ = this.selectedNatBatimentSubject.asObservable();
  SirenDPE$ = this.SirenDPESubject.asObservable();
  addresseBien$ = this.addresseBienSubject.asObservable();
  addresseBienCodePostal$ = this.addresseBienCodePostalSubject.asObservable();
  addresseBienVille$ = this.addresseBienVilleSubject.asObservable();
  codeBatimentSelected$ = this.codeBatimentSelectedSubject.asObservable();
  numeroDpeAdeme$ = this.numeroDpeAdemeSubject.asObservable();

  // Méthode pour gérer les changements des valeurs
  private updateFieldValue(subject: BehaviorSubject<string>, newValue: string) {
    subject.next(newValue);
    // Sauvegarder ou traiter la nouvelle valeur
    console.log(`Field updated: ${newValue}`);
  }

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

    if (bien.eligibleDpe) {
      this.selectedType = this.eligibleDpeMapping[bien.eligibleDpe].type;
      this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;
    }

    if (bien.etatBien) {
      this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
      this.updateFieldValue(this.selectedNatBatimentSubject, this.selectedNatBatiment);
    }
    if (bien.codeBatiment) {
      this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
      this.updateFieldValue(this.codeBatimentSelectedSubject, this.codeBatimentSelected);
    }

    this.partLcl = bien?.partLCL;
    this.updateFieldValue(this.partLclSubject, this.partLcl);
    
    this.montantLclFinance = bien?.montantFinanceLCL;
    this.updateFieldValue(this.montantLclFinanceSubject, this.montantLclFinance);
    
    this.prixAquisitionBien = bien?.prixBien;
    this.updateFieldValue(this.prixAquisitionBienSubject, this.prixAquisitionBien);
    
    this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
    this.updateFieldValue(this.dateDepotSubject, this.dateDepot);
    
    if (bien.codeNormeThermique) {
      this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];
      this.updateFieldValue(this.normeThermiqueSubject, this.normeThermique);
    }
    if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) {
      this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
      this.updateFieldValue(this.SirenDPESubject, this.SirenDPE);
    }
    this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
    this.updateFieldValue(this.numeroDpeAdemeSubject, this.numeroDpeAdeme);

    if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
      this.DpeResults = true;
      this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];
    }
  }
}

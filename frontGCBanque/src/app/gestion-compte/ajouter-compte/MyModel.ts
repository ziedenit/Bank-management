 // Déclaration des BehaviorSubjects pour chaque champ avec le type correct
  private partLclSubject = new BehaviorSubject<number | null>(null);
  private montantLclFinanceSubject = new BehaviorSubject<number | null>(null);
  private prixAquisitionBienSubject = new BehaviorSubject<number | null>(null);
  private dateDepotSubject = new BehaviorSubject<string | null>(null);
  private normeThermiqueSubject = new BehaviorSubject<string | null>(null);
  private selectedNatBatimentSubject = new BehaviorSubject<string | null>(null);
  private SirenDPESubject = new BehaviorSubject<string | null>(null);
  private addresseBienSubject = new BehaviorSubject<string | null>(null);
  private addresseBienCodePostalSubject = new BehaviorSubject<string | null>(null);
  private addresseBienVilleSubject = new BehaviorSubject<string | null>(null);
  private codeBatimentSelectedSubject = new BehaviorSubject<string | null>(null);
  private numeroDpeAdemeSubject = new BehaviorSubject<string | null>(null);

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

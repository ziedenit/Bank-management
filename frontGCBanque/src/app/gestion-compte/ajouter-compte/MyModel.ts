import { BehaviorSubject } from 'rxjs';

export class VotreComposant implements OnInit {
    private objetFinanceSubject = new BehaviorSubject<string>(null);
    private selectedTypeSubject = new BehaviorSubject<string>(null);
    private hideFieldFormSubject = new BehaviorSubject<boolean>(null);
    private selectedNatBatimentSubject = new BehaviorSubject<string>(null);
    private codeBatimentSelectedSubject = new BehaviorSubject<string>(null);
    private partLclSubject = new BehaviorSubject<number>(null);
    private montantLclFinanceSubject = new BehaviorSubject<number>(null);
    private prixAquisitionBienSubject = new BehaviorSubject<number>(null);
    private SirenDPESubject = new BehaviorSubject<string>(null);
    private numeroDpeAdemeSubject = new BehaviorSubject<string>(null);
    private normeThermiqueSubject = new BehaviorSubject<string>(null);

    private selectedObjetIndex: number;
    private formGroup: FormGroup;
    private extractedInitialFinancement: any;

    ngOnInit(): void {
        this.id = this.route.snapshot.queryParams["idFinancement"];
        this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

        if (this.Url_Retour_Base64) {
            this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
        }

        this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
            this.extractedInitialFinancement = responseFinancement;
            console.log("Le financement récupéré de la BDD est:", responseFinancement);

            // Initialisation sur le premier objet
            this.setObjetFinancementProperties(responseFinancement.objetFinancement[0]);
            this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
        });

        this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
            this.objetsFinancements = objets;
            this.showDeleteIcon = false;

            if (this.objetsFinancements.length > 1) {
                this.showFileAriane = true;
            }
            console.log("Les objets récupérés:", this.objetsFinancements);
        });
    }
    
    private setObjetFinancementProperties(objetFinancement: any): void {
        switch (objetFinancement.codeObjetFinancement) {
            case "02":
                this.objetFinanceSubject.next("Acquisition de bâtiment");
                break;
            case "03":
                this.objetFinanceSubject.next("Rénovation de bâtiment");
                this.depExist = true;
                break;
            default:
                break;
        }

        if (!objetFinancement || !objetFinancement.bien) return;
        const bien = objetFinancement.bien;

        if (bien.eligibleDpe) {
            this.selectedTypeSubject.next(this.eligibleDpeMapping[bien.eligibleDpe].type);
            this.hideFieldFormSubject.next(this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm);
        }

        if (bien.etatBien) {
            this.selectedNatBatimentSubject.next(this.etatBienMapping[bien.etatBien]);
        }
        if (bien.codeBatiment) {
            this.codeBatimentSelectedSubject.next(this.codeBatimentMapping[bien.codeBatiment]);
        }

        this.partLclSubject.next(bien?.partLCL);
        this.montantLclFinanceSubject.next(bien?.montantFinanceLCL);
        this.prixAquisitionBienSubject.next(bien?.prixBien);
        this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
        if (bien.codeNormeThermique) {
            this.normeThermiqueSubject.next(this.codeNormeThermiqueMapping[bien.codeNormeThermique]);
        }
        if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) {
            this.SirenDPESubject.next(bien.dpeActuel.sirenDiagnostiqueur);
        }
        this.numeroDpeAdemeSubject.next(bien.dpeActuel?.numeroDpe);

        if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
            this.DpeResults = true;
            this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];
        }
    }
    
    private updateObjetFinancementProperties(): void {
        const index = this.selectedObjetIndex;
        if (index === undefined || !this.extractedInitialFinancement) return;

        const objetFinancement = this.extractedInitialFinancement.objetFinancement[index];
        const bien = objetFinancement.bien;

        if (bien) {
            this.objetFinance = this.objetFinanceSubject.value;
            this.selectedType = this.selectedTypeSubject.value;
            this.hideFieldForm = this.hideFieldFormSubject.value;
            this.selectedNatBatiment = this.selectedNatBatimentSubject.value;
            this.codeBatimentSelected = this.codeBatimentSelectedSubject.value;
            this.partLcl = this.partLclSubject.value;
            this.montantLclFinance = this.montantLclFinanceSubject.value;
            this.prixAquisitionBien = this.prixAquisitionBienSubject.value;
            this.SirenDPE = this.SirenDPESubject.value;
            this.numeroDpeAdeme = this.numeroDpeAdemeSubject.value;
            this.normeThermique = this.normeThermiqueSubject.value;
        }
    }

    onBreadcrumbClick(index: number): void {
        // Sauvegarder les valeurs actuelles avant de passer à un autre objet
        this.saveFormData();
        this.updateObjetFinancementProperties(); // Mettre à jour les propriétés avant de changer d'objet

        // Passer au nouvel objet
        this.selectedObjetIndex = index;

        // Recharger les nouvelles valeurs dans le formulaire à partir de extractedInitialFinancement
        this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
    }
}

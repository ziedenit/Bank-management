import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import { FinancementService } from 'src/app/services/financement.service';
import { Bien } from 'src/app/model/bien';
import { Piece } from 'src/app/model/piece';
import {FormBuilder, FormGroup,FormControl} from '@angular/forms'
import { EngineService } from '../../services/engine.service';
import { PatchFinancement } from '../../services/patch-financement.service';
import { EngineXtraService } from '../../services/engine-xtra.service';
import { LigneContext } from '../../model/ligneContext';
import { Financement } from 'src/app/model/financement';
import { ObjetFinancement } from 'src/app/model/objetFinancement';
import { Alignement } from 'src/app/model/alignement';
import { Eligibilite } from 'src/app/model/eligibilite';
import { Intervenant } from 'src/app/model/intervenant';
import { Dpe } from 'src/app/model/dpe';
import { LigneContextXtra } from 'src/app/model/ligneContextXtra';
import { AdresseService } from '../../services/adresse.service';
import { formatDate,registerLocaleData} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SirenValidatorService } from '../../services/siren-validator.service';
 import localeFr from '@angular/common/locales/fr'; 

 registerLocaleData(localeFr);  
 @Component({
	selector: 'app-financement.component',
	templateUrl: './financement.component.html',
	styleUrls: ['./financement.component.scss']
})

export class FinancementComponent implements OnInit  {
	partLclContext:boolean;
	anneeConstObligatoire:boolean;
	lettreCpeObligatoire:boolean;
	lettreGesObligatoire:boolean;
	surfaceObligatoire:boolean;
	valCepObligatoire:boolean;
	valGesObligatoire:boolean;
	champObligatoire:boolean=false;
	selectedNatBatiment:string='option0';
	DpeSelected:boolean;
	codeBatimentSelected:string='option0';
    idRepers: string[]=[];
	idObjetFinancement: string;
	hideField=false;
	contextAdress: boolean;
    donneeObligatoire: string;
	depExist=false;
	selectedType:string ='option1';
	numeroDpeAdeme:string=null;
	prixAquisitionBien: number=null;
	montantLclFinance:number=null;
	partLcl:number=null;
	showFirstEligiblite: boolean=false;
	id: any;
	addresseBien:string;
	addresseBienCodePostal:string;
	addresseBienVille:string;
	referenceGED : string;
	typePiece:string;
	typeObjetFinancement:string;
	codeApplicatifOrigine : string
	idFinancement:any;
	presenceadresse:boolean=false;
	familleObjet:string;
	selectedObjetFinancement:string='option0';
	selectedFamilleObjet:string='option0';
	selectedOptionJustif:string='DPE';
	agenceCompte:string=null;
	objetFinance:string=null;
	familleObjetText:string=null;
	Url_Retour_Base64:string="";
	Url_Retour_Utf8:string="";
	DpeResults:boolean=false;
	presenceJustifDPE:boolean = false;
	presenceJustifNormeThermique:boolean = false;
	presenceJustifDateDepotPC:boolean = false;
	isDpe:boolean;
	isCompromis:boolean;
	dateReceptionDpe:Date=null;
	dateFinValiditeDpe:Date=null;
	isDateDepotChecked: boolean = false;
    isDpeChecked: boolean = false;
    isNormeThermiqueChecked: boolean = false;
	alignementResult: string ;
	alignementXtraResult: string;
	alignementResultText: string ;
	alignementXtraResultText: string ;
	dateDepot:any;
	normeThermique:string;
	selectedCepList:string
	eligibiliteDpe:string;
	eligibiliteDpeMessage:string;
	isValid: boolean | null = null;
	elementResults:boolean=false;
	dpeAdeme :any;
    message: string;
    dpeExisteAdeme:boolean;
    modelDpe:string;
    numeroDpeRemplace:string;
    versionDpe: string;
    methodeDpeApplique:string;
    typeEnergie:string;
    codeDepartement:string;
    codeInseeCommune:string;
    periodeConstruction:string;
    coordonneeCartographiqueX:number;
    coordonneeCartographiqueY:number;
    messageSiren:string;
	hiddenObjetfinancement=false;
	elementObjetfinancement=true;
	hiddenDPE=false;
	elemenDPE=true;
		
	options: { value: string, label: string, description: string }[] = [		
		{ value: 'option2', label: 'Construction provisoire (durée d\'utilisation ≤ 2 ans)', description: 'Constructions provisoires prévues pour une durée d\'utilisation ≤ à deux ans' },
		{ value: 'option3', label: 'Bâtiment indépendant avec superficie <50 m²', description: 'Bâtiments indépendants dont la surface de plancher au sens de l\'article R. 111-22 du code de l\'urbanisme est < à 50 m²' },
		{ value: 'option4', label: 'Usage agricole, artisanal ou industriel', description: 'Bâtiments ou parties de bâtiments à usage agricole, artisanal ou industriel, autres que les locaux servant à l\'habitation, dans lesquels le système de chauffage ou de refroidissement ou de production d\'eau chaude pour l\'occupation humaine produit une faible quantité d\'énergie au regard de celle nécessaire aux activités économiques' },
		{ value: 'option5', label: 'Lieux de culte', description: 'Bâtiments servant de lieux de culte' },
		{ value: 'option6', label: 'Monument historique classé', description: 'Monuments historiques classés ou inscrits à l\'inventaire en application du code du patrimoine' },
		{ value: 'option7', label: 'Bâtiment non chauffé', description: 'Bâtiments ou parties de bâtiments non chauffés ou pour lesquels les seuls équipements fixes de chauffage sont des cheminées à foyer ouvert, et ne disposant pas de dispositif de refroidissement des locaux' },
		{ value: 'option8', label: 'Utilisation < 4 mois/an', description: 'Bâtiments ou parties de bâtiments résidentiels qui sont destinés à être utilisés moins de quatre mois par an"' },
		{ value: 'option9', label: 'Bâtiment situé dans les DOM-TOM', description: 'Bâtiment situé dans les DOM TOM' },
		{ value: 'option10', label: 'Bâtiment situé à l\'étranger', description: 'Bâtiment situé à l\'étranger' },
		{value: 'option1', label: 'Autre bien immobilier éligible au DPE ', description: 'Autre bien immobilier' }
	  ];
	  
    formGroup = new FormGroup({
	numeroNomRue : new FormControl(),
	codePostal : new FormControl(),
	ville : new FormControl(),
	dateDiangnostique: new FormControl(),
	anneeConstruction: new FormControl(),
	typeBatiment: new FormControl(),
	lettreCEP: new FormControl(),
	lettreGES: new FormControl(),
	surfaceBien: new FormControl(),
	valeurCep: new FormControl(),
	valeurGes: new FormControl(),
	energieType: new FormControl(),
});

    ligneContext: LigneContext =
      {
	typeObjetFinancement: null,
	dateDepotPc: new Date(''),
	anneeConstruction: 0 ,
	etiquetteDpe: null,
	valeurCep: 0,
	presenceDpe:true,
	presenceDateDepotPc: false,
	presenceAttestation: false,
	normeThermique: null,
	presenceDpeAvantTravaux: false,
	presenceDpeApresTravaux: false,
	gainCep: 0,
	codeBatiment:null
};

ligneContextXtra: LigneContextXtra =
{
	typeObjetFinancement: '',
	codeBatiment: null,
	presenceDateDepotPc: false,
	presenceDateDepotPcJustificatif: false,
	dateDepotPc: new Date(''),
	presenceDpe: false,
	presenceDpeJustificatif: false,
	presenceNormeThermique: false,
	normeThermique: null,
	presenceNormeThermiqueJustificatif: false,
	anneeConstruction: 0,
	etiquetteDpe: null,
	valeurCep: 0,
	presenceDpeAvantTravaux: false,
	presenceDpeApresTravaux: false,
	gainCep : 0,
};

alignementMapping = {
	'01': 'aligné à la Taxonomie',
	'06': 'non aligné à la Taxonomie',
	'07': 'alignement à la Taxonomie non évalué'
};
eligibleDpeMapping = {
	"99": { type: "option1", hideFieldForm: false }, 
	"01": { type: "option2", hideFieldForm: true },
	"02": { type: "option3", hideFieldForm: true },
	"03": { type: "option4", hideFieldForm: true },
	"04": { type: "option5", hideFieldForm: true },
	"05": { type: "option6", hideFieldForm: true },
	"06": { type: "option7", hideFieldForm: true }, 
	"07": { type: "option8", hideFieldForm: true },
	"08": { type: "option9", hideFieldForm: true }, 
	"09": { type: "option10", hideFieldForm: true}
};
codeBatimentMapping = {
	 "00001": "option1", "00002": "option2", "00003": "option3",
	  "00004": "option4", "00005": "option5", "00006": "option6", "99999": "option7"
  };

 etatBienMapping = {
	null: "option0",  "Ancien": "option1", "Neuf": "option2"
  };

codeNormeThermiqueMapping = {
	  null: "option0", "01": "option1", "02": "option2", "99": "option3"
  };	

lettreCepMapping = {
	'option0': null,
	'option1': 'A',
	'option2': 'B',
	'option3': 'C',
	'option4': 'D',
	'option5': 'E',
	'option6': 'F',
	'option7': 'G'
};
typeOptions = {
	option1: "99",
	option2: "01",
	option3: "02",
	option4: "03",
	option5: "04",
	option6: "05",
	option7: "06",
	option8: "07",
	option9: "08",
	option10: "09"
  };

constructor (private fb:FormBuilder,private financementService:FinancementService,
private engineService: EngineService,private engineServiceXtra: EngineXtraService, private adresseService: AdresseService,
private patchFinancementService: PatchFinancement,private route: ActivatedRoute,private router :Router,private sirenValidator: SirenValidatorService )

 {
	this.formGroup = this.fb.group({
		numeroNomRue :[''] ,
		codePostal : [''],
        ville : [''],
		dateDiangnostique: [null],
		anneeConstruction: [null],
		typeBatiment: [null],
		lettreCEP: [null],
		lettreGES: [null],
		surfaceBien: [null],
		valeurCep: [null],
		valeurGes: [null],
		energieType:[null]
	  });
	}

onFamilleSelected(value: string)
 { this.selectedFamilleObjet = value;} 

onObjetFinancementSelected(value: string)
 { this.selectedObjetFinancement = value; }	
 
onSelectedOptionJustifChange(newValue:string)
{ this.selectedOptionJustif=newValue}
	

hideDataObjetFinancement() {
	this.hiddenObjetfinancement = true;
	this.elementObjetfinancement = false;}
showDataObjetFinancement() {
	this.hiddenObjetfinancement=false;
	this.elementObjetfinancement = true;}

hideDataDPE() {
	this.hiddenDPE=true;
	this.elemenDPE = false;}
showDataDPE() {
	this.hiddenDPE=false;
	this.elemenDPE = true; }
	 

onChangeEtatBien():void{
	this.depExist = this.selectedNatBatiment === 'option2';
	this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
		{this.searchAddress();});
        this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
		{this.searchAddress();});
    this.formGroup.get('ville').valueChanges.subscribe(ville=>
		{this.searchAddress();});
}

onPriceChange(value: string): void { 
	 const cleanedValue = value.replace(/\s/g, '').replace('€', '').replace(',', '.'); 
	  this.prixAquisitionBien = parseFloat(cleanedValue) ; 	  
	if (isNaN(this.prixAquisitionBien)){
		  this.prixAquisitionBien= null;
	  }}  

onMontantChange(value: string): void { 
		const cleanedValue = value.replace(/\s/g, '').replace('€', '').replace(',', '.'); 
		this.montantLclFinance = parseFloat(cleanedValue) ; 
		if (isNaN(this.montantLclFinance)){
			this.montantLclFinance= null;
		} }
   
onPartChange(value: string): void { 
	const cleanedValue = value.replace(/\s/g, '').replace('€', '').replace(',', '.'); 
	this.partLcl = parseFloat(cleanedValue) ;
	if (isNaN(this.partLcl)){
		this.partLcl= null;
	} 
  }	

isfirstDebranchement:Boolean
private mapFinancementData(responseFinancement: any): void {
	this.idObjetFinancement = responseFinancement.objetFinancement[0].idObjetFinancement;
	this.idRepers=responseFinancement.intervenant.idReper;
	this.codeApplicatifOrigine=responseFinancement.codeApplicatifOrigine;
	this.familleObjet=responseFinancement.objetFinancement[0].codeFamilleObjet;
	this.typeObjetFinancement=responseFinancement.objetFinancement[0].codeObjetFinancement;
	this.agenceCompte=responseFinancement.agenceCompte;		
	this.isfirstDebranchement = responseFinancement.objetFinancement[0].firstDisconnectionOfd;
	this.selectedFamilleObjet = this.familleObjet === "01" ? "option1" : this.familleObjet === "05" ? "option4" : "option0" ;
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
        this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;}

	if (bien.etatBien) {this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];}
    if (bien.codeBatiment) {this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];}
    
    this.partLcl = bien?.partLCL;
    this.montantLclFinance = bien?.montantFinanceLCL;
	this.prixAquisitionBien = bien?.prixBien;

	this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
    if (bien.codeNormeThermique) {this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];}
    if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) { this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;}
    this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;

	if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
        this.DpeResults = true;
        this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];}
}

private checkRequiredFields(responseFinancement: any): void {
    const bien = responseFinancement.objetFinancement[0]?.bien;
    const dpeActuel = bien?.dpeActuel;
    this.checkAndHighlightRequiredField(bien && bien.etatBien == null, "natureBien");
    this.checkAndHighlightRequiredField(bien && bien.codeBatiment == null, "categorieBatiment");
    this.checkAndHighlightRequiredField(bien && bien.partLCL == null, "partLcl");
    this.checkAndHighlightRequiredField(bien && bien.prixBien == null, "prixAquisitionBien");
    this.checkAndHighlightRequiredField(bien && bien.montantFinanceLCL == null, "montantLclFinance");
	
    if (bien?.etatBien == "Ancien" && dpeActuel) {
        this.checkAndHighlightRequiredField(dpeActuel.numeroDpe == null || dpeActuel.numeroDpe == "", "numeroDpeAdeme");
        this.checkAndHighlightRequiredField(dpeActuel.sirenDiagnostiqueur == null || (dpeActuel.numeroDpe != null && dpeActuel.sirenDiagnostiqueur == null), "SirenDPE");
        this.checkAndHighlightRequiredField(dpeActuel.classeCep == null || dpeActuel.classeCep == "", "LettreCEP");
        this.checkAndHighlightRequiredField(dpeActuel.classeGes == null || dpeActuel.classeGes == "", "LettreGES");
        this.checkAndHighlightRequiredField(dpeActuel.estimationCep == null, "ValeurCEP");
        this.checkAndHighlightRequiredField(dpeActuel.estimationGes == null, "ValeurGES");
        this.checkAndHighlightRequiredField(bien.anneeConstruction == null, "anneeConstruction");
    }
    if (bien?.etatBien == "Neuf") {
        this.checkAndHighlightRequiredField(bien.dateDepotPc == null, "dateDepot");
		this.checkAndHighlightRequiredField(bien.dpeActuel.numeroDpe != null || bien.dpeActuel.numeroDpe !="" && bien.dpeActuel.sirenDiagnostiqueur == null, "SirenDPE");
    }
    this.checkAndHighlightRequiredField(bien && (bien.numeroNomRue == null || bien.numeroNomRue == ""), "numeroNomRue");
    this.checkAndHighlightRequiredField(bien && (bien.codePostal == null || bien.codePostal == ""), "codePostal");
    this.checkAndHighlightRequiredField(bien && (bien.nomCommune == null || bien.nomCommune == ""), "ville");
    this.checkAndHighlightRequiredField(responseFinancement.objetFinancement[0]?.codeObjetFinancement == null, "selectedObjetFinancement");
	this.checkAndHighlightRequiredField(
		responseFinancement.objetFinancement[0] != null &&
		responseFinancement.objetFinancement[0].bien != null &&
		(responseFinancement.objetFinancement[0].bien.etatBien == "Neuf" ||
			responseFinancement.objetFinancement[0].bien.etatBien == "Ancien") &&
		responseFinancement.objetFinancement[0].bien.surfaceBien == null,
		"SurfaceDuBien"
	);
}
private setFinancementDataOnScreen(responseFinancement: any): void {
    const bien = responseFinancement.objetFinancement[0]?.bien;
    const dpeActuel = bien?.dpeActuel;
    if (dpeActuel) {
    this.dateReceptionDpe = dpeActuel.dateReceptionDpe;
    this.dateFinValiditeDpe = dpeActuel.dateFinValiditeDpe;
    this.depExist = true;
    }
}

private setupFormGroup(bien: any): void {
    if (!bien) return;
    this.formGroup = this.fb.group({
        numeroNomRue: [bien.numeroNomRue || null],
        codePostal: [bien.codePostal || null],
        ville: [bien.nomCommune || null],
        dateDiangnostique: [bien.dpeActuel?.dateEtablissementDpe?.toString().substring(0, 10) || null],
        anneeConstruction: [bien.anneeConstruction || null],
        typeBatiment: [bien.typeBatiment || null],
        lettreCEP: [bien.dpeActuel?.classeCep || null],
        lettreGES: [bien.dpeActuel?.classeGes || null],
        surfaceBien: [bien.surfaceBien || null],
        valeurCep: [bien.dpeActuel?.estimationCep || null],
        valeurGes: [bien.dpeActuel?.estimationGes || null],
		energieType:[bien.typeEnergie || null]
    });
}

checkAndHighlightRequiredField(condition, elementId) {
	console.log("CC")
		console.log(this.isfirstDebranchement)
    if (condition && ! this.isfirstDebranchement) {
        this.champObligatoire = true;
        this.donneeObligatoire = 'Donnée obligatoire';
        document.getElementById(elementId).style.border = "1px solid red";
    } else {
        document.getElementById(elementId).style.removeProperty('border');
    }}

traiterPiecesJustificatives(responseFinancement) {		
		if (responseFinancement.objetFinancement[0] != null && responseFinancement.objetFinancement[0].piecesJustificatives != null) {
			this.presenceJustifDPE = responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'DPE')
			|| responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
			this.presenceJustifDateDepotPC=responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
			this.presenceJustifNormeThermique=responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
		}
		if(this.presenceJustifDPE && responseFinancement.objetFinancement[0].bien.dpeActuel!=null){
		this.isDpe= responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'DPE');
		this.isCompromis=responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
		
		if(this.isDpe){this.selectedOptionJustif='DPE'}
		if(this.isCompromis){this.selectedOptionJustif='Compromis de vente'}
		this.isDpeChecked=true
		}
		if(!this.presenceJustifDPE && responseFinancement.objetFinancement[0].bien.dpeActuel!=null  && responseFinancement.objetFinancement[0].bien.dpeActuel.numeroDpe!=null){this.errorDpeMessage='Justificatif DPE manquant'}	
		if(this.presenceJustifDateDepotPC)
		{this.isDateDepotChecked=true;  this.isNormeThermiqueChecked=true; 
		}
		if(!this.presenceJustifDateDepotPC &&responseFinancement.objetFinancement[0].bien.dateDepotPc!=null)
		{this.errorDateDepotMessage='Justificatif attestant de la date de dépôt du permis de construire manquant';}
		if(this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC){this.isNormeThermiqueChecked=true }
		if(!this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC && !this.errorDateDepotMessage 
			&&responseFinancement.objetFinancement[0].bien.codeNormeThermique!=null){this.errorNormeThermiqueMessage='Justificatif Norme thermique manquant'}
}

ngOnInit(): void {
    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

    if (this.Url_Retour_Base64) {this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);}
	
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
		console.log("le financement récupéré de la BDD est:",responseFinancement )
		
        this.mapFinancementData(responseFinancement);
        this.setObjetFinancementProperties(responseFinancement.objetFinancement[0]);
        this.checkRequiredFields(responseFinancement);
		this.traiterPiecesJustificatives(responseFinancement);
        this.setFinancementDataOnScreen(responseFinancement);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);

		this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
			{	this.searchAddress();});
		this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
			{	this.searchAddress();});
		this.formGroup.get('ville').valueChanges.subscribe(ville=>
			{	this.searchAddress();});
    });

	// Ajouter une fonction qui permet de calculer pour chaque objet l'ensemble des param a passer pour la composant fils filAriane 
}

errorDpeMessage: string;
checkFileDpeInserted(): string | null {
    if (!this.numeroDpeAdeme) return null;
    if (!this.isDpeChecked) return 'Justificatif DPE manquant';
    return null;
}

errorNormeThermiqueMessage: string;
checkNormeThermique(): string | null {
    if (!this.normeThermique || this.normeThermique === 'option0') return null;
    if (this.dateDepot && this.isDateDepotChecked) return null;
    if (!this.dateDepot && !this.isNormeThermiqueChecked) return 'Justificatif Norme thermique manquant';
    return null;
}

errorDateDepotMessage: string;
checkFileDateDepotInserted(): string | null {
if (!this.dateDepot ) {return null;   } 
if (!this.isDateDepotChecked) {return 'Justificatif attestant de la date de dépôt du permis de construire manquant';}
return null;
}

prepareLigneContext() {
			const formData = this.formGroup.value;			
			this.ligneContext.anneeConstruction = formData.anneeConstruction;
			this.ligneContext.valeurCep = formData.valeurCep;
			this.ligneContextXtra.anneeConstruction = formData.anneeConstruction;
			this.ligneContextXtra.valeurCep = formData.valeurCep;
			this.ligneContext.etiquetteDpe = this.hideField ? this.lettreCepMapping[formData.lettreCEP] : formData.lettreCEP;
			this.ligneContextXtra.etiquetteDpe = this.hideField ? this.lettreCepMapping[formData.lettreCEP] : formData.lettreCEP;
			this.ligneContext.codeBatiment = this.codeBatimentMapping[this.codeBatimentSelected];
			this.ligneContextXtra.codeBatiment = this.codeBatimentMapping[this.codeBatimentSelected];
			const typeObjetFinancement = this.objetFinance === 'Acquisition de bâtiment' || this.selectedObjetFinancement === 'option2' ? '02' :
									this.objetFinance === 'Rénovation de bâtiment' || this.selectedObjetFinancement === 'option3' ? '03' : null;
			this.ligneContext.typeObjetFinancement = typeObjetFinancement;
			this.ligneContextXtra.typeObjetFinancement = typeObjetFinancement;
			const presenceDateDepotPc = !!this.dateDepot;
			this.ligneContext.presenceDateDepotPc = presenceDateDepotPc;
			this.ligneContext.dateDepotPc = presenceDateDepotPc ? this.dateDepot : null;
			this.ligneContextXtra.presenceDateDepotPc = presenceDateDepotPc;
			this.ligneContextXtra.dateDepotPc = presenceDateDepotPc ? this.dateDepot : null;
			const presenceAttestation = !!this.normeThermique;
			const normeThermique = presenceAttestation ? (this.normeThermique === 'option1' ? '2012' : (this.normeThermique === 'option2' ? '2020' : '')) : null;
			this.ligneContext.presenceAttestation = presenceAttestation;
			this.ligneContext.normeThermique = normeThermique;
			this.ligneContextXtra.presenceNormeThermique = presenceAttestation;
			this.ligneContextXtra.normeThermique = normeThermique;
			this.ligneContext.presenceDpe = this.numeroDpeAdeme && this.selectedNatBatiment === 'option2';
			this.ligneContextXtra.presenceDpe = this.ligneContext.presenceDpe;
			this.ligneContextXtra.presenceDpeJustificatif = this.isDpeChecked;
			this.ligneContextXtra.presenceDateDepotPcJustificatif = this.isDateDepotChecked;
			this.ligneContextXtra.presenceNormeThermiqueJustificatif = this.isDateDepotChecked || (!this.isDateDepotChecked && this.isNormeThermiqueChecked);
		}
				
showAlignement(): void {
			this.validateFormFields();
            this.prepareLigneContext();
			this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);

			this.DpeResults = true;
			this.elementResults = true;					
			this.eligibiliteDpe = this.selectedType === "option1" ? "02" : "99";
			this.eligibiliteDpeMessage = this.selectedType === "option1" ? "éligible et" : "";
			
	   this.engineService.alignement(this.ligneContext).subscribe(aligne => {		
				this.alignementResultText = this.alignementMapping[aligne];
				this.alignementResult = aligne;
				console.log('LineContext', this.ligneContext,'Alignement Simulé', this.alignementResult);
			});
		
		this.engineServiceXtra.alignementXtra(this.ligneContextXtra).subscribe(aligneXtra => {				
				this.alignementXtraResult = aligneXtra;
				console.log('LineContext XTRA', this.ligneContextXtra,'Alignement XTRA', aligneXtra);
			});
		
			this.errorDpeMessage = this.checkFileDpeInserted();
			this.errorNormeThermiqueMessage = this.checkNormeThermique();
			this.errorDateDepotMessage = this.checkFileDateDepotInserted();
}		
validateFormFields() {
			const formData=this.formGroup.value;
			this.champObligatoire = false;
			this.donneeObligatoire = '';
			
			const validateField = (fieldName: string, condition: boolean) => {
			  if (condition) {
				this.champObligatoire = true;
				this.donneeObligatoire = 'Donnée obligatoire';
				document.getElementById(fieldName)?.style.setProperty('border', '1px solid red');
			  } else {
				document.getElementById(fieldName)?.style.removeProperty('border');
			  }
			};		 
			validateField('prixAquisitionBien', this.prixAquisitionBien == null || this.prixAquisitionBien == 0);
			validateField('montantLclFinance', this.montantLclFinance == null || this.montantLclFinance == 0);
			validateField('partLcl', this.partLcl == null || this.partLcl == 0);
			validateField('numeroDpeAdeme', this.selectedNatBatiment == 'option1' && (!this.numeroDpeAdeme));
			validateField('SirenDPE', 
			  (this.selectedNatBatiment == 'option1' && (!this.SirenDPE)) || 
			  (this.numeroDpeAdeme && (!this.SirenDPE))
			);
			if (this.objetFinance == '' || this.objetFinance == null) {
			validateField('selectedObjetFinancement', this.selectedObjetFinancement == '' || this.selectedObjetFinancement == undefined || this.selectedObjetFinancement == 'option0');
			}
			validateField('anneeConstruction', (formData.anneeConstruction == "" || formData.anneeConstruction == null) && this.selectedNatBatiment == "option1");
			validateField('numeroNomRue', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.numeroNomRue));
			validateField('codePostal', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.codePostal));
			validateField('ville', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.ville));
			validateField('LettreCEP', (formData.lettreCEP == "" || !formData.lettreCEP) && this.selectedNatBatiment == "option1");
			if (this.hideField) {
			validateField('LettreCEPlist', (formData.lettreCEP == "" || !formData.lettreCEP || formData.lettreCEP == 'option0') && this.selectedNatBatiment == "option1");
			}
			validateField('LettreGES', (formData.lettreGES == "" || !formData.lettreGES) && this.selectedNatBatiment == "option1");
			if (this.hideField) {
			validateField('lettreGeslist', (formData.lettreGES == "" || !formData.lettreGES || formData.lettreGES == 'option0') && this.selectedNatBatiment == "option1");
			}
			validateField('ValeurGES', (formData.valeurGes == "" || !formData.valeurGes) && this.selectedNatBatiment == "option1");
			validateField('ValeurCEP', (formData.valeurCep == "" || !formData.valeurCep) && this.selectedNatBatiment == "option1");
			validateField('SurfaceDuBien', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.surfaceBien));
			validateField('categorieBatiment', !this.codeBatimentSelected || this.codeBatimentSelected == 'option0');
			validateField('natureBien', !this.selectedNatBatiment || this.selectedNatBatiment == 'option0');
			validateField('dateDepot', this.selectedNatBatiment == 'option2' && (!this.dateDepot));
}
		  		
showAdemeResult(numeroDpeAdeme:string)
{	
this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
    this.depExist=true;
    this.DpeSelected=true;
      console.log("interoge ademe api with numéro ADEME: ", numeroDpeAdeme)
      this.anneeConstObligatoire=false;
      if(String(numeroDpeAdeme).length !==13)
        {
          this.message='Le champs N° du DPE doit être valide';
          this.hideField=true;
          this.formGroup=this.fb.group({
              numeroNomRue :[''] ,
              codePostal : [''],
              ville : [''],
              dateDiangnostique:[null],
              anneeConstruction:[null],
              typeBatiment:[null],
              lettreCEP:['option0'],
              lettreGES:['option0'],
              surfaceBien:[null],
              valeurCep:[null],
			  valeurGes:[null],
			  energieType:[null],
          });
        }
     else
    { this.financementService.getDpeAdeme(this.numeroDpeAdeme).subscribe(
    (data) => {
                this.message='';
				this.dpeAdeme=data;

	 this.dpeExisteAdeme=true;
	 this. dateReceptionDpe =this.dpeAdeme['Date_réception_DPE'] ? this.dpeAdeme['Date_réception_DPE'] : '';
	 this.dateFinValiditeDpe=this.dpeAdeme['Date_fin_validité_DPE'] ? this.dpeAdeme['Date_fin_validité_DPE'] : '';
	 this.modelDpe=this.dpeAdeme['Modèle_DPE'] ? this.dpeAdeme['Modèle_DPE'] : '';
	 this.numeroDpeRemplace=this.dpeAdeme['N°_DPE_remplacé'];
	 this.versionDpe=this.dpeAdeme['N°_DPE_remplacé'] ? this.dpeAdeme['N°_DPE_remplacé'] : '';
	 this.methodeDpeApplique=this.dpeAdeme['Méthode_application_DPE'] ? this.dpeAdeme['Méthode_application_DPE'] : '';
	 this.codeDepartement=this.dpeAdeme['N°_département_(BAN)'] ? this.dpeAdeme['N°_département_(BAN)'] : '';
	 this.codeInseeCommune=this.dpeAdeme['Code_INSEE_(BAN)'] ? this.dpeAdeme['Code_INSEE_(BAN)'] : '';
	 this.periodeConstruction=this.dpeAdeme['Période_construction'] ? this.dpeAdeme['Période_construction'] : '';
	 this.coordonneeCartographiqueX=this.dpeAdeme['Coordonnée_cartographique_X_(BAN)'] ? this.dpeAdeme['Coordonnée_cartographique_X_(BAN)'] : '';
	 this.coordonneeCartographiqueY=this.dpeAdeme['Coordonnée_cartographique_Y_(BAN)'] ? this.dpeAdeme['Coordonnée_cartographique_Y_(BAN)'] : '';
	 
                this.anneeConstObligatoire=false;
                this.lettreCpeObligatoire=false;
                this.lettreGesObligatoire=false;
                this.valGesObligatoire=false;
                this.valCepObligatoire=false;
                this.surfaceObligatoire=false;
                this.hideField=false;
				this.contextAdress=true;

	 this.formGroup = this.fb.group({
		numeroNomRue: (this.dpeAdeme['N°_voie_(BAN)'] ? this.dpeAdeme['N°_voie_(BAN)'] : '') + ' ' + (this.dpeAdeme['Nom__rue_(BAN)'] ? this.dpeAdeme['Nom__rue_(BAN)'] : ''),
		codePostal: this.dpeAdeme['Code_postal_(BAN)'] ? this.dpeAdeme['Code_postal_(BAN)'] : '',
		ville: this.dpeAdeme['Nom__commune_(BAN)'] ? this.dpeAdeme['Nom__commune_(BAN)'] : '',
		dateDiangnostique: this.dpeAdeme['Date_établissement_DPE'] ? this.dpeAdeme['Date_établissement_DPE'].toString().substring(0, 10) : '',
		anneeConstruction: this.dpeAdeme['Année_construction'] ? this.dpeAdeme['Année_construction'] : '',
		typeBatiment: this.dpeAdeme['Type_bâtiment'] ? this.dpeAdeme['Type_bâtiment'] : '',
		lettreCEP: this.dpeAdeme['Etiquette_DPE'] ? this.dpeAdeme['Etiquette_DPE'] : '',
		lettreGES: this.dpeAdeme['Etiquette_GES'] ? this.dpeAdeme['Etiquette_GES'] : '',
		surfaceBien: this.dpeAdeme['Surface_habitable_logement'] ? this.dpeAdeme['Surface_habitable_logement'] : '',
		valeurCep: this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] ? this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] : '',
		valeurGes: this.dpeAdeme['Emission_GES_5_usages_par_m²'] ? this.dpeAdeme['Emission_GES_5_usages_par_m²'] : '',
		energieType: this.dpeAdeme['Type_énergie_n°1'] ? this.dpeAdeme['Type_énergie_n°1'] : ''
		});
		console.log("Ademe retour") 
				console.log(this.formGroup.value,this.dpeAdeme['Année_construction']) 
				
    this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
	{this.searchAddress();});
    this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
	{this.searchAddress();});
    this.formGroup.get('ville').valueChanges.subscribe(ville=>
	{this.searchAddress();});
      },
            (errorP) => {
                this.hideField=true;
                this.contextAdress=true;
                this.message='DPE introuvable dans l\'ADEME';
                this.formGroup=this.fb.group({
                        numeroNomRue :[''] ,
                        codePostal : [''],
                        ville : [''],
                        dateDiangnostique:[''],
                        anneeConstruction:[''],
                        typeBatiment:[''],
                        lettreCEP:[''],
                        lettreGES:[''],
                        surfaceBien:[''],
                        valeurCEP:[''],
                        valeurGES:[''],
                    });
				this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
						{this.searchAddress();});
				this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
						{this.searchAddress();});
				this.formGroup.get('ville').valueChanges.subscribe(ville=>
						{this.searchAddress();});     } );
    }

	this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
		{this.searchAddress();});
		 this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
			{ this.searchAddress(); });
		 this.formGroup.get('ville').valueChanges.subscribe(ville=>
				{ this.searchAddress();});
				
}


hideFieldForm:boolean=false;
messageAlert:string;
financementDedie:string='Y';

showDescription(event: MouseEvent): void {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    const selectedOption = this.options[selectedIndex];
    if (selectedOption.value!=='option1') {
      target.setAttribute('title', selectedOption.description);
	  this.showFirstEligiblite=true;
	  this.hideFieldForm=true; 
	  this.messageAlert=selectedOption.description
    }
	else{this.showFirstEligiblite=false;
		this.hideFieldForm=false; }
}

SirenDPE:string=null;
bienToPatch:Bien=new Bien();
dpeToPatch:Dpe=new Dpe();
financementContext: Financement=new Financement ();
objetFinancementContext:ObjetFinancement=new ObjetFinancement();
alignementContext:Alignement=new Alignement();
elegibiliteContext:Eligibilite=new Eligibilite();
intervenantContext:Intervenant=new Intervenant();
pieceJustificativeContextDpe: Piece=new  Piece();
pieceJustificativeContextNth: Piece=new  Piece();
pieceJustificativeContextPC: Piece=new  Piece();
alignementXtraResultC:string;
alignementResultC:string;
piecesJustificatives : Piece [] ;

callPatchFinancement(idFinancement:string, financementAUpdate:Financement ){
	console.log("le financement a mettre a jour ")
	console.log(financementAUpdate)
	console.log(idFinancement)
	this.patchFinancementService.patchFinancement(idFinancement, financementAUpdate).subscribe(
		response => {
		  console.log('Financement mis à jour avec succès:', response);
		},
		error => {
		  console.error('Erreur lors de la mise à jour du financement:', error);
		}
	  );
	}

	postContinuer(): void {
		this.piecesJustificatives = [];
		this.prepareLigneContext();
		this.updateBienToPatch();
		this.updateEligibiliteContext();
		this.updateFormData();
	
		forkJoin([
			this.engineService.alignement(this.ligneContext),
			this.engineServiceXtra.alignementXtra(this.ligneContextXtra)
		]).subscribe(([aligne, aligneXtra]) => {
			this.alignementResultText = this.alignementMapping[aligne] || "";
			this.alignementResult = aligne;
			this.alignementXtraResult = aligneXtra;
	
			this.updateJustificatifs();
			this.updateContexts();
			this.callPatchFinancement(this.id, this.financementContext);
	
			console.log("le financement a patcher est le suivant : ", this.financementContext);
			console.log("ligne contexte continuer : ", this.ligneContext);
			console.log("ligne contexteXtra continuer : ", this.ligneContextXtra);
	
			// Redirection vers l'application d'octroi
			window.location.href = this.Url_Retour_Utf8;
		});
	}
	
	private updateBienToPatch(): void {
		const formData = this.formGroup.value;
			
			this.bienToPatch.eligibleDpe= this.typeOptions[this.selectedType] || null,
			this.bienToPatch.etatBien= this.selectedNatBatiment === 'option2' ? "Neuf" :
					  this.selectedNatBatiment === 'option1' ? "Ancien" : null,
			this.bienToPatch.dateDepotPc = this.dateDepot ||null,
			this.bienToPatch.prixBien= this.prixAquisitionBien ||null,
			this.bienToPatch.montantFinanceLCL= this.montantLclFinance ||null,
			this.bienToPatch.partLCL= this.partLcl || null,
			this.bienToPatch.codeNormeThermique= this.normeThermique === 'option0'? null :
								this.normeThermique === 'option1'? "01" :
								this.normeThermique === 'option2'? "02" : 
								this.normeThermique === 'option3'? "99" : null,
			

			this.bienToPatch.codeBatiment=this.codeBatimentSelected === 'option1' ? "00001" :
					      this.codeBatimentSelected === 'option2' ? "00002" : 
						  this.codeBatimentSelected === 'option3' ? "00003" : 
						  this.codeBatimentSelected === 'option4' ? "00004" : 
						  this.codeBatimentSelected === 'option5' ? "00005" : 
						  this.codeBatimentSelected === 'option6' ? "00006" : 
						  this.codeBatimentSelected === 'option7' ? "99999" : null	
						  this.bienToPatch.typeEnergie=	formData.energieType;		 
		
		this.objetFinancementContext.codeObjetFinancement = (this.selectedObjetFinancement === 'option2'
			 && !this.typeObjetFinancement) ? "02" : this.objetFinancementContext.codeObjetFinancement;
	}
	
	private updateEligibiliteContext(): void {
		this.eligibiliteDpe = this.selectedType === "option1" ? "02" : "99";
		this.elegibiliteContext.topEligibilite = this.eligibiliteDpe;
	}
	
	
	
	private updateFormData(): void {
		const formData = this.formGroup.value;
		console.log("formData");
		console.log(formData);
		const addressMatch = formData.numeroNomRue?.match(/^(\d+)\s+(.+)$/);
	this.objetFinancementContext.idObjetFinancement=this.idObjetFinancement;
	console.log("id objet financement a patcher")
	console.log(this.objetFinancementContext.idObjetFinancement)
		this.bienToPatch = {
			...this.bienToPatch,
			numeroNomRue: formData.numeroNomRue,
			codePostal: formData.codePostal,
			nomCommune: formData.ville,
			adresseComplete: `${formData.numeroNomRue} ${formData.codePostal} ${formData.ville}`,
			anneeConstruction: formData.anneeConstruction,
			surfaceBien: formData.surfaceBien,
			typeEnergie: formData.energieType,
			typeBatiment: formData.typeBatiment,
			codeDepartement: this.codeDepartement,
			codeInseeCommune: this.codeInseeCommune,
			periodeConstruction: this.periodeConstruction,
			coordonneeCartographiqueX: this.coordonneeCartographiqueX,
			coordonneeCartographiqueY: this.coordonneeCartographiqueY,
			numeroVoie: addressMatch ? addressMatch[1] : undefined,
			typeVoie: addressMatch ? addressMatch[2] : undefined,
			nomRue: addressMatch ? addressMatch[3] : undefined
		};
		console.log("Avant patch form data")
		console.log(this.dpeToPatch)
		
			this.dpeToPatch.numeroDpe = this.numeroDpeAdeme,
			this.dpeToPatch.sirenDiagnostiqueur=this.SirenDPE,
			this.dpeToPatch.estimationCep= formData.valeurCep,
			this.dpeToPatch.estimationGes= formData.valeurGes,
			this.dpeToPatch.classeCep= this.hideField ? this.lettreCepMapping[formData.lettreCEP] || formData.lettreCEP : formData.lettreCEP,
			this.dpeToPatch.classeGes= this.hideField ? this.lettreCepMapping[formData.lettreGES] || formData.lettreGES : formData.lettreGES,
			this.dpeToPatch.dateEtablissementDpe= formData.dateDiangnostique,
			this.dpeToPatch.dateReceptionDpe= this.dateReceptionDpe,
			this.dpeToPatch.dateFinValiditeDpe= this.dateFinValiditeDpe

		

	
	}
	
	private updateJustificatifs(): void {
		const justificatifs = [];
		if (this.isDpeChecked) {
		  justificatifs.push({
			typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
			dpeActuel: this.selectedOptionJustif === "DPE",
			numeroDpe: this.numeroDpeAdeme
		  });
		}
		  
		if (this.isNormeThermiqueChecked) {
		  justificatifs.push({ typePiece: "Norme thermique" });
		}
		if (this.isDateDepotChecked) {
		  justificatifs.push({ typePiece: "Permis de construire" });
		}
	
		this.piecesJustificatives = justificatifs;
		this.objetFinancementContext.piecesJustificatives=this.piecesJustificatives;
	}
  
	
	private updateContexts(): void {
		this.alignementContext = {
			topAlignement: this.alignementResult,
			topAlignementXtra: this.alignementXtraResult,
		};
	
		this.bienToPatch.dpeActuel = this.dpeToPatch;
			this.financementContext.indicateurFinancementDedie= this.financementDedie,
			this.objetFinancementContext.firstDisconnectionOfd= false,
			this.objetFinancementContext.alignement=this.alignementContext,
			this.objetFinancementContext.eligibilite=this.elegibiliteContext,
			this.objetFinancementContext.bien=this.bienToPatch,
			this.financementContext.objetFinancement=[];
			this.financementContext.objetFinancement.push(this.objetFinancementContext);
			this.financementContext.alignement=this.alignementContext,
			this.financementContext.eligibilite= this.elegibiliteContext
	}
	
address: string = '';
postalCode: string = '';
city: string = '';
addressResults: any[] = [];
addressResult: any[] = [];
selectedAddress: any;
showAdressResults:boolean=true;
showAdressResult:boolean=true;

searchAddres(): void {
const query = `${this.addresseBien} ${this.addresseBienCodePostal} ${this.addresseBienVille}`;
this.adresseService.autoCompleteAddress(query).subscribe((data) => {
this.addressResult = data.features;
});
if (this.addresseBien ||this.addresseBienCodePostal||this.addresseBienVille)
{this.showAdressResult=true;}
}

searchAddress(): void {
	const query = `${this.formGroup.get('numeroNomRue').value} ${this.formGroup.get('codePostal').value} ${this.formGroup.get('ville').value}`;
    this.adresseService.autoCompleteAddress(query).subscribe((data) => {
	this.addressResults = data.features;
	});
	if (this.formGroup.get('numeroNomRue')||this.formGroup.get('codePostal')||this.formGroup.get('ville'))
	{this.showAdressResults=true;}
  }

selectAddress(address: any): void {
	this.selectedAddress = address;
	this.formGroup.patchValue({
	numeroNomRue: address.properties.name,
	codePostal: address.properties.postcode,
	ville: address.properties.city
	});
	this.showAdressResults=false;
	this.addressResults=[];
  }

selectAddres(address: any): void {
	this.selectedAddress = address;
	this.addresseBien= address.properties.name
	this.addresseBienCodePostal= address.properties.postcode
	this.addresseBienVille= address.properties.city
	this.showAdressResult=false;
	this.addressResult=[];
  }

}




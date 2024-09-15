import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import { FinancementService } from 'src/app/services/financement.service';
import { Bien } from 'src/app/model/bien';
import { Piece } from 'src/app/model/piece';
import {FormBuilder, FormGroup,FormControl} from '@angular/forms'
import { EngineService } from '../../services/engine.service';
import { PatchFinancement } from '../../services/patch-financement.service';
import { LigneContext } from '../../model/ligneContext';
import { Financement } from 'src/app/model/financement';
import { ObjetFinancement } from 'src/app/model/objetFinancement';
import { Alignement } from 'src/app/model/alignement';
import { Eligibilite } from 'src/app/model/eligibilite';
import { Intervenant } from 'src/app/model/intervenant';
import { Dpe } from 'src/app/model/dpe';
import { LigneContextXtra } from 'src/app/model/ligneContextXtra';
import { AdresseService } from '../../services/adresse.service';
import {XtraRepriseService  } from '../../services/xtra-reprise.service';
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
	partLclContext:boolean; anneeConstObligatoire:boolean;
	lettreCpeObligatoire:boolean;
	lettreGesObligatoire:boolean;
	surfaceObligatoire:boolean;
	valCepObligatoire:boolean;
	valGesObligatoire:boolean;
	champObligatoire:boolean=false;
	selectedNatBatiment:string='option0';
	codeBatimentSelected:string='option0';
    idRepers: string[]=[];
	idObjetFinancement: string;
	hideField=false;
	hideFieldCEP=false;
	hideFieldGES=false;
	contextAdress: boolean;
    donneeObligatoire: string;
	depExist=false;
	selectedType:string ='option1';
	numeroDpeAdeme:string=null;
	prixAquisitionBien: number=null;
	montantLclFinance:number=null;
	partLcl:number=null;
	showFirstEligiblite: boolean=false;
	id: string;
	addresseBien:string;
	addresseBienCodePostal:string;
	addresseBienVille:string;
	typeObjetFinancement:string;
	codeApplicatifOrigine : string
	idFinancement:string;
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
	dateDepot:any;
	normeThermique:string;
	selectedCepList:string
	eligibiliteDpe:string;
	eligibiliteDpeMessage:string;
	isValid: boolean | null = null;
	elementResults:boolean=false;
	dpeAdeme :string;
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
    isfirstDebranchement:Boolean

		
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
	presenceDpe:false,
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
	typeObjetFinancement: null,
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
	'01': 'L\'actif financé a un impact positif sur l\'un des 6 objectifs environnementaux de l\'UE',
	'06': 'L\'actif financé ne répond à aucun des 6 objectifs environnementaux de l\'UE',
	'07': 'Les informations collectées sur l\'actif financé ne permettent pas d\'apprécier sa contribution à un des 6 objectifs environnementaux'
};

alignementMappingReprise={
'06':{
	'Y':'L\'actif financé a un impact positif sur l\'un des 6 objectifs environnementaux de l\'UE',
	'N':'L\'actif financé ne répond à aucun des 6 objectifs environnementaux de l\'UE',
},
'07': 'Les informations collectées sur l\'actif financé ne permettent pas d\'apprécier sa contribution à un des 6 objectifs environnementaux'
}

eligibleDpeMapping = {
	"99": { type: "option1", hideFieldForm: false}, 
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

codeBatimentOptionMapping = {
    "option1": "00001", "option2": "00002", "option3": "00003",
    "option4": "00004", "option5": "00005", "option6": "00006",
    "option7": "99999","option0":null
};
 etatBienMapping = {
	null: "option0",  "Ancien": "option1", "Neuf": "option2"
  };

codeNormeThermiqueMapping = {
	  null: "option0", "01": "option1", "02": "option2", "99": "option3"
  };	

lettreCepMapping = {
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
private engineService: EngineService, private adresseService: AdresseService,
private patchFinancementService: PatchFinancement,private route: ActivatedRoute,private router :Router,private sirenValidator: SirenValidatorService,
private xtraRepriseService: XtraRepriseService )

 {
	this.formGroup = this.fb.group({
		numeroNomRue :[null] ,
		codePostal : [null],
		ville : [null],
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
	this.depExist = this.selectedNatBatiment ==='option2';
	this.formGroup=this.fb.group({
		numeroNomRue :[''] ,
		codePostal : [''],
		ville : [''] ,
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
		}}

onPartChange(value: string): void { 
	const cleanedValue = value.replace(/\s/g, '').replace('€', '').replace(',', '.'); 
	this.partLcl = parseFloat(cleanedValue) ;
	if (isNaN(this.partLcl)){
		this.partLcl= null;
	} 
  }	

private setFinancementData(responseFinancement: Financement): void {	
	this.idRepers=responseFinancement.intervenant.idReper;
	this.codeApplicatifOrigine=responseFinancement.codeApplicatifOrigine;
	this.agenceCompte=responseFinancement.agenceCompte;		
}

private setObjetFinancementData(objetFinancement: ObjetFinancement): void {
	this.idObjetFinancement = objetFinancement.idObjetFinancement;
	this.familleObjet=objetFinancement.codeFamilleObjet;
	this.typeObjetFinancement=objetFinancement.codeObjetFinancement;
	this.isfirstDebranchement = objetFinancement.firstDisconnectionOfd;
	this.selectedFamilleObjet = this.familleObjet === "01" ? "option1" : this.familleObjet === "05" ? "option4" : "option0" ;

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
        this.alignementResultText = this.alignementMappingReprise[objetFinancement.alignement.topAlignement][objetFinancement.alignement.xtra275TopAlignement] ;}	
	const dpeActuel = bien?.dpeActuel;
    if (dpeActuel) {
    this.dateReceptionDpe = dpeActuel.dateReceptionDpe;
    this.dateFinValiditeDpe = dpeActuel.dateFinValiditeDpe;
    this.depExist = true;
    if(dpeActuel.classeCep==null || dpeActuel.classeCep==""){this.hideFieldCEP=true}
	if(dpeActuel.classeGes==null || dpeActuel.classeGes=="" ){this.hideFieldGES=true}	
}
}

private checkRequiredFields(responseFinancement: Financement): void {
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
		this.checkAndHighlightRequiredField((dpeActuel.classeCep == null || dpeActuel.classeCep == "" ) && (this.hideFieldCEP), "LettreCEPlist");
        this.checkAndHighlightRequiredField((dpeActuel.classeGes == null || dpeActuel.classeGes == "") && this.hideFieldGES, "lettreGeslist");
        this.checkAndHighlightRequiredField(dpeActuel.estimationCep == null, "ValeurCEP");
        this.checkAndHighlightRequiredField(dpeActuel.estimationGes == null, "ValeurGES");
        this.checkAndHighlightRequiredField(bien.anneeConstruction == null, "anneeConstruction");
    }
    if (bien?.etatBien == "Neuf") {
        this.checkAndHighlightRequiredField(bien.dateDepotPc == null, "dateDepot");
		console.log ("popopopopopopopop", bien.dpeActuel.numeroDpe, bien.dpeActuel.sirenDiagnostiqueur)
		this.checkAndHighlightRequiredField(bien.dpeActuel.numeroDpe != null&& bien.dpeActuel.sirenDiagnostiqueur == null, "SirenDPE");
    }
    this.checkAndHighlightRequiredField(bien && (bien.numeroNomRue == null || bien.numeroNomRue == ""), "numeroNomRue");
    this.checkAndHighlightRequiredField(bien && (bien.codePostal == null || bien.codePostal == ""), "codePostal");
    this.checkAndHighlightRequiredField(bien && (bien.nomCommune == null || bien.nomCommune == ""), "ville");
    this.checkAndHighlightRequiredField(responseFinancement.objetFinancement[0]?.codeObjetFinancement == null, "selectedObjetFinancement");
	this.checkAndHighlightRequiredField(
		responseFinancement.objetFinancement[0] != null &&responseFinancement.objetFinancement[0].bien != null &&
		(responseFinancement.objetFinancement[0].bien.etatBien == "Neuf" ||responseFinancement.objetFinancement[0].bien.etatBien == "Ancien") &&
		responseFinancement.objetFinancement[0].bien.surfaceBien == null,
		"SurfaceDuBien"
	);
}

private setupFormGroup(bien: Bien): void {
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
    if (condition && ! this.isfirstDebranchement) {
        this.champObligatoire = true;
        this.donneeObligatoire = 'Donnée obligatoire';
        document.getElementById(elementId).style.border = "1px solid red";
    } else {
        document.getElementById(elementId).style.removeProperty('border');
    }}

	checkPiecesJustificatives(responseFinancement) {		
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
    if (this.Url_Retour_Base64) {
		this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
	}
	else {
		console.warn("Url_Retour_Base64 est falsy. Impossible de le convertir en Utf8.");
	}
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
		console.log("le financement récupéré de la BDD est le suivant:",responseFinancement )	
        this.setFinancementData(responseFinancement);
        this.setObjetFinancementData(responseFinancement.objetFinancement[0]);
        this.checkRequiredFields(responseFinancement);
		this.checkPiecesJustificatives(responseFinancement);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * -----------calcul de l'alignement simulé 
 * button "Calculer"-------------------------------
 */
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
	this.ligneContextXtra.anneeConstruction = formData.anneeConstruction;
	this.ligneContext.valeurCep = formData.valeurCep;
	this.ligneContextXtra.valeurCep = formData.valeurCep;
	this.ligneContext.etiquetteDpe = this.hideField || this.hideFieldCEP ? this.lettreCepMapping[formData.lettreCEP] : formData.lettreCEP;
	this.ligneContextXtra.etiquetteDpe = this.hideField || this.hideFieldCEP ? this.lettreCepMapping[formData.lettreCEP] : formData.lettreCEP;
	this.ligneContext.codeBatiment = this.codeBatimentOptionMapping [this.codeBatimentSelected];
	this.ligneContextXtra.codeBatiment = this.codeBatimentOptionMapping [this.codeBatimentSelected];
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
	this.ligneContext.presenceDpe = this.numeroDpeAdeme!=null;
	this.ligneContextXtra.presenceDpe = this.numeroDpeAdeme!=null;
	this.ligneContextXtra.presenceDpeJustificatif = this.isDpeChecked;
	this.ligneContextXtra.presenceDateDepotPcJustificatif = this.isDateDepotChecked;
	this.ligneContextXtra.presenceNormeThermiqueJustificatif = this.isDateDepotChecked || (!this.isDateDepotChecked && this.isNormeThermiqueChecked);
}

			
checkFormFieldsFormGroup() {
			const formData=this.formGroup.value;
			console.log("la valeur de formGroupe est la suivante:", this.formGroup.value)
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
			validateField('ValeurGES', (formData.valeurGes == "" || formData.valeurGes==null) && this.selectedNatBatiment == "option1");
			validateField('ValeurCEP', (formData.valeurCep == "" || formData.valeurCep==null) && this.selectedNatBatiment == "option1");
			console.log("helooooooo surface", formData.surfaceBien)
			validateField('SurfaceDuBien', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.surfaceBien ));
			validateField('categorieBatiment', !this.codeBatimentSelected || this.codeBatimentSelected == 'option0');
			validateField('natureBien', !this.selectedNatBatiment || this.selectedNatBatiment == 'option0');
			validateField('dateDepot', this.selectedNatBatiment == 'option2' && (!this.dateDepot));
}

showAlignement(): void {
			this.checkFormFieldsFormGroup();
            this.prepareLigneContext();
			this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
			this.DpeResults = true;
			this.elementResults = true;								
	   this.engineService.alignement(this.ligneContext).subscribe(aligne => {		
				this.alignementResultText = this.alignementMapping[aligne];
				this.alignementResult = aligne;

			});		
			this.errorDpeMessage = this.checkFileDpeInserted();
			this.errorNormeThermiqueMessage = this.checkNormeThermique();
			this.errorDateDepotMessage = this.checkFileDateDepotInserted();
}	

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * -----------Recherche Ademe 
 * button "Rechercher ==>numéro DPE"-------------------------------
 */
	  		
showAdemeResult(numeroDpeAdeme:string)
{	
this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
    this.depExist=true;
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
	console.log("le numéro DPE récupéré est le suivant:", this.dpeAdeme)

	 this.dpeExisteAdeme=true;
	 this. dateReceptionDpe =this.dpeAdeme['Date_réception_DPE'] ? this.dpeAdeme['Date_réception_DPE'] : 
	                         this.dpeAdeme['date_reception_dpe'] ? this.dpeAdeme['date_reception_dpe'] : '';

	 this.dateFinValiditeDpe=this.dpeAdeme['Date_fin_validité_DPE'] ? this.dpeAdeme['Date_fin_validité_DPE'] : '';
	 this.modelDpe=this.dpeAdeme['Modèle_DPE'] ? this.dpeAdeme['Modèle_DPE'] : '';
	 this.numeroDpeRemplace=this.dpeAdeme['N°_DPE_remplacé'];
	 this.versionDpe=this.dpeAdeme['N°_DPE_remplacé'] ? this.dpeAdeme['N°_DPE_remplacé'] : '';
	 this.methodeDpeApplique=this.dpeAdeme['Méthode_application_DPE'] ? this.dpeAdeme['Méthode_application_DPE'] : '';
	 this.codeDepartement=this.dpeAdeme['N°_département_(BAN)'] ? this.dpeAdeme['N°_département_(BAN)'] : '';

	 this.codeInseeCommune=this.dpeAdeme['Code_INSEE_(BAN)'] ? this.dpeAdeme['Code_INSEE_(BAN)'] : 
	                       this.dpeAdeme['code_insee_commune'] ? this.dpeAdeme['code_insee_commune'] : '';

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
		numeroNomRue: (this.dpeAdeme['N°_voie_(BAN)'] ? this.dpeAdeme['N°_voie_(BAN)'] :
		               this.dpeAdeme['numero_rue'] ? this.dpeAdeme['numero_rue'] : '')
		      + ' ' + (this.dpeAdeme['Nom__rue_(BAN)'] ? this.dpeAdeme['Nom__rue_(BAN)'] :
		               this.dpeAdeme['nom_rue'] ? this.dpeAdeme['nom_rue'] : ''),

		codePostal: this.dpeAdeme['Code_postal_(BAN)'] ? this.dpeAdeme['Code_postal_(BAN)'] : this.dpeAdeme['code_postal'] ? this.dpeAdeme['code_postal'] : '',
		ville: this.dpeAdeme['Nom__commune_(BAN)'] ? this.dpeAdeme['Nom__commune_(BAN)'] :this.dpeAdeme['commune'] ? this.dpeAdeme['commune'] : '',

		dateDiangnostique: this.dpeAdeme['Date_établissement_DPE'] ? this.dpeAdeme['Date_établissement_DPE'].toString().substring(0, 10) : 
		                   this.dpeAdeme['date_etablissement_dpe'] ? this.dpeAdeme['date_etablissement_dpe'].toString().substring(0, 10) : '',

		anneeConstruction: this.dpeAdeme['Année_construction'] ? this.dpeAdeme['Année_construction'] :this.dpeAdeme['annee_construction'] ? this.dpeAdeme['annee_construction'] : '',
		typeBatiment: this.dpeAdeme['Type_bâtiment'] ? this.dpeAdeme['Type_bâtiment'] : '',

		lettreCEP: this.dpeAdeme['Etiquette_DPE'] ? this.dpeAdeme['Etiquette_DPE'] : 
				   this.dpeAdeme['classe_consommation_energie'] ?this.dpeAdeme['classe_consommation_energie'] : '',

		lettreGES: this.dpeAdeme['Etiquette_GES'] ? this.dpeAdeme['Etiquette_GES'] : 
				   this.dpeAdeme['classe_estimation_ges'] ? this.dpeAdeme['classe_estimation_ges'] : '',
				   
		surfaceBien: this.dpeAdeme['Surface_habitable_logement'] ? this.dpeAdeme['Surface_habitable_logement'] 
		            :this.dpeAdeme['Surface_utile']? this.dpeAdeme['Surface_utile'] 
		            :this.dpeAdeme['surface_habitable']? this.dpeAdeme['surface_habitable']:'',

		valeurCep: this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] ? this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] :
		           this.dpeAdeme['Conso_kWhep/m²/an'] ? this.dpeAdeme['Conso_kWhep/m²/an'] :
				   this.dpeAdeme['consommation_energie'] ? this.dpeAdeme['consommation_energie'] :'',
				   
		valeurGes: this.dpeAdeme['Emission_GES_5_usages_par_m²'] ? this.dpeAdeme['Emission_GES_5_usages_par_m²'] :
		           this.dpeAdeme['Emission_GES_kgCO2/m²/an'] ? this.dpeAdeme['Emission_GES_kgCO2/m²/an'] :
				   this.dpeAdeme['estimation_ges'] ? this.dpeAdeme['estimation_ges'] :'',

		energieType: this.dpeAdeme['Type_énergie_n°1'] ? this.dpeAdeme['Type_énergie_n°1'] : ''
		});

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
                        dateDiangnostique:[null],
                        anneeConstruction:[null],
                        typeBatiment:[null],
                        lettreCEP:[null],
                        lettreGES:[null],
                        surfaceBien:[null],
                        valeurCEP:[null],
                        valeurGES:[null],
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * -----------Patch Financement==>sauvgarde dans la Base de données 
 * button "Continuer"-------------------------------
 */
hideFieldForm:boolean=false;
messageAlert:string;
financementDedie:string='Y';
SirenDPE:string=null;
bienToPatch:Bien=new Bien();
dpeToPatch:Dpe=new Dpe();
financementContext: Financement=new Financement ();
objetFinancementContext:ObjetFinancement=new ObjetFinancement();
alignementContext:Alignement=Alignement.createDefault();
elegibiliteContext:Eligibilite=new Eligibilite();
intervenantContext:Intervenant=new Intervenant();
pieceJustificativeContextDpe: Piece=new  Piece();
pieceJustificativeContextNth: Piece=new  Piece();
pieceJustificativeContextPC: Piece=new  Piece();
alignementXtraResultC:string;
alignementResultC:string;
piecesJustificatives : Piece [] ;

callPatchFinancement(idFinancement:string, financementAUpdate:Financement ){
	this.patchFinancementService.patchFinancement(idFinancement, financementAUpdate).subscribe(
		response => {console.log('Financement mis à jour avec succès:', response);},
		error => { console.error('Erreur lors de la mise à jour du financement:', error);});
	}

private updateObjetFinancementData(): void {
		const formData = this.formGroup.value;	
		    this.bienToPatch.bienFinanceLCL	=true	
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
			this.bienToPatch.codeBatiment=this.codeBatimentOptionMapping [this.codeBatimentSelected];	
			console.log("this.codeBatimentOptionMapping [this.codeBatimentSelected]",this.codeBatimentOptionMapping [this.codeBatimentSelected])				   
            this.bienToPatch.typeEnergie=	formData.energieType;
			this.objetFinancementContext.codeObjetFinancement = this.typeObjetFinancement ?? (this.selectedObjetFinancement === 'option2' ? '02' : null);
			this.objetFinancementContext.codeFamilleObjet=this.familleObjet??(this.selectedFamilleObjet==='option1' ?'01': null)
		    this.eligibiliteDpe = this.selectedType === "option1" ? "02" : "99";
		    this.elegibiliteContext.topEligibilite = this.eligibiliteDpe;
	}
				
private updateDpeAdemeData(): void {
		const formData = this.formGroup.value;
		const addressMatch = formData.numeroNomRue?.match(/^(\d+)\s+(.+)$/);
	    this.objetFinancementContext.idObjetFinancement=this.idObjetFinancement;
		this.bienToPatch = {
			...this.bienToPatch,
			numeroNomRue: formData.numeroNomRue !=""? formData.numeroNomRue :null,
			codePostal: formData.codePostal !="" ?formData.codePostal:null,
			nomCommune: formData.ville !=""?formData.ville :null,
			adresseComplete: `${formData.numeroNomRue} ${formData.codePostal} ${formData.ville}`,
			anneeConstruction: formData.anneeConstruction,
			surfaceBien: formData.surfaceBien,
			typeEnergie: formData.energieType,
			typeBatiment: formData.typeBatiment,
			codeDepartement: this.codeDepartement?this.codeDepartement:null,
			codeInseeCommune: this.codeInseeCommune ? this.codeInseeCommune :null,
			periodeConstruction: this.periodeConstruction ?this.periodeConstruction :null,
			coordonneeCartographiqueX: this.coordonneeCartographiqueX ? this.coordonneeCartographiqueX : null,
			coordonneeCartographiqueY: this.coordonneeCartographiqueY ?this.coordonneeCartographiqueY :null,
			numeroVoie: addressMatch ? addressMatch[1] : null,
			typeVoie: addressMatch ? addressMatch[2] : null,
			nomRue: addressMatch ? addressMatch[3] : null
		};	
			this.dpeToPatch.numeroDpe = this.numeroDpeAdeme !=""? this.numeroDpeAdeme :null,
			this.dpeToPatch.sirenDiagnostiqueur=this.SirenDPE !="" ? this.SirenDPE :null,
			this.dpeToPatch.estimationCep= formData.valeurCep,
			this.dpeToPatch.estimationGes= formData.valeurGes,
			this.dpeToPatch.classeCep= this.hideField ? this.lettreCepMapping[formData.lettreCEP] || null : formData.lettreCEP ,
			this.dpeToPatch.classeGes= this.hideField ? this.lettreCepMapping[formData.lettreGES] || null: formData.lettreGES,
			this.dpeToPatch.dateEtablissementDpe= formData.dateDiangnostique,
			this.dpeToPatch.dateReceptionDpe= this.dateReceptionDpe,
			this.dpeToPatch.dateFinValiditeDpe= this.dateFinValiditeDpe
	}
	
private checkUpdateJustificatifs(): void {
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
  
	
private prepareFinancementToPatch(): void {
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
	

 postContinuer(): void {
		this.piecesJustificatives = [];
		this.prepareLigneContext();
		this.updateObjetFinancementData();
		this.updateDpeAdemeData();	
				forkJoin([
			this.engineService.alignement(this.ligneContext),
			this.engineService.alignementXtra(this.ligneContextXtra)			
		]).subscribe(([aligne, aligneXtra]) => {	
			this.alignementResult = aligne;
			this.alignementXtraResult = aligneXtra;
			this.alignementContext= this.xtraRepriseService.calculXtra(aligne,aligneXtra);

			this.checkUpdateJustificatifs();
			this.prepareFinancementToPatch();
			this.callPatchFinancement(this.id, this.financementContext);
			console.log("le financement à patcher est le suivant:",this.financementContext)	
			//window.location.href = this.Url_Retour_Utf8;
		});
	}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
/** complitude Adresse du bien auto 
 */
address: string ;
postalCode: string ;
city: string;
addressResults: any[] ;
selectedAddress: any;
showAdressResults:boolean=true;
showAdressResult:boolean=true;

searchAddress(): void {
	const numeroNomRue = this.formGroup.get('numeroNomRue').value ;
    const codePostal = this.formGroup.get('codePostal').value ;
    const ville = this.formGroup.get('ville').value ;
		let query = '';
		if (numeroNomRue) {
			query = `${numeroNomRue} ${codePostal} ${ville}`;
		} else if (codePostal && ville) {
			query = `${codePostal} ${ville}`;
		} else if (codePostal) {
			query = `${codePostal}`;
		} else if (ville) {
			query = `${ville}`;
		}
    this.adresseService.autoCompleteAddress(query).subscribe((data) => {		
	this.addressResults = data.features;
	});
	if (this.formGroup.get('numeroNomRue')||this.formGroup.get('codePostal')||this.formGroup.get('ville'))
	{this.showAdressResults=true;}
  }

selectAddress(address: any): void {
	const numeroNomRue = this.formGroup.get('numeroNomRue').value;
	this.selectedAddress = address;
     if (!numeroNomRue){
		this.formGroup.patchValue({
			codePostal: address.properties.postcode,
			ville: address.properties.city
			});
	 }
	 else{
	this.formGroup.patchValue({
	numeroNomRue: address.properties.name,
	codePostal: address.properties.postcode,
	ville: address.properties.city
	});}
	this.showAdressResults=false;
	this.addressResults=[];
  }
}

<h2 class ="Titre-01"> Acquisition des données et des justificatifs</h2>

<app-client [codeApplicatifOrigine]="codeApplicatifOrigine" [idRepers]="idRepers"></app-client>

<app-type-objet-financement 
 [typeObjetFinancement]="typeObjetFinancement"
 [hideFieldForm]="hideFieldForm" 
 (selectedFamilleObjet)="onFamilleSelected($event)" 
 (selectedObjetFinancement)="onObjetFinancementSelected($event)" >
</app-type-objet-financement> 

<div class="container-fluid">  
  <div class="row" >
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize">
          <h3 class="d-inline-block font-weight-bold"  style="font-size: 17px;">Objet de financement</h3>
        <span class="float-right" >
            <img *ngIf="hiddenObjetfinancement==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
            <img *ngIf="hiddenObjetfinancement==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
          </span> 
         <div *ngIf="elementObjetfinancement == true"> 
          <div class="row">
            <div class="col-lg-4" *ngIf="hideFieldForm==false && typeObjetFinancement !=null">
                <div class="form-group">
                    <div class="custom-label">
                        <label for="input1">Objet financé</label>
                        <input type="text" disabled class="form-control form-control-sm disable-cursor" id="input1" [(ngModel)]="objetFinance">
                    </div>
                </div>
            </div>
            <div class="col-lg-4" *ngIf="typeObjetFinancement==null">
            </div>
            <div class="col-lg-4">
                <div class="form-group" *ngIf="!hideFieldForm">
                    <div class="custom-label">
                        <label for="prixAquisitionBien">Prix du bien <em>(en euro)</em></label>
                        <span class="required"> *</span>
                        <input type="text"
                               [ngModel]="prixAquisitionBien | number:'1.0-2':'fr'"
                               (ngModelChange)="onPriceChange($event)"
                               class="form-control form-control-sm"
                               id="prixAquisitionBien"
                               name="description"
                               [disabled]="isFieldsDisabled" />
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group" *ngIf="hideFieldForm==false">
                    <div class="custom-label">
                        <label for="dateDepot">Date de dépôt de permis de construire <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                        <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot" placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" />
                    </div>
                </div>
            </div>
        </div>
                                
            <div class="row">
              <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">
                <div class="form-group" >
                  <div class="custom-label">
                  <label for="select2" >Eligibilité au DPE </label>                 
                  <select class="form-control form-control-sm"  (mouseenter)="showDescription($event)" id="select2" [(ngModel)]="selectedType">
                    <option *ngFor="let option of options" [value]="option.value" [title]="option.description"> {{ option.label }}</option>
                  </select>
              </div>
              </div>
                <div class="alertArea" *ngIf="showFirstEligiblite==true"> 
                <p style="color: rgb(45, 61, 133); font-size: 14px; font-weight: bold;">Description:</p>  {{messageAlert}}
                </div>
              </div> 
              <div class="col-lg-4">
                <div  class="form-group"  *ngIf="hideFieldForm==false ">
                  <div class="custom-label">
                  <label for="montantFinance" >Montant financé toute banque <em>(en euro)</em></label>
                  <span class="required"> *</span>       
                  <input type="text"
                   [ngModel]="montantLclFinance | number:'1.0-2':'fr'" 
                   (ngModelChange)="onMontantChange($event)"
                    class="form-control form-control-sm" 
                     id=montantLclFinance 
                      name="description" 
                      [disabled]="isFieldsDisabled" />                  
              </div>
              </div> 
              </div> 
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
                  <div class="custom-label">
                <label for="NormeThermique" class="labelFormulaire" >Norme Thermique </label>
                <select class="form-control form-control-sm" id="NormeThermique" required [(ngModel)]="normeThermique"    name="NormeThermique" [disabled]="isFieldsDisabled">
                  <option value='option0' selected> </option>
                  <option value='option1'> RT2012  </option>
                  <option value='option2'> RE2020 </option>
                  <option value='option3' >Autre</option>
                </select>     
              </div>
            </div>
            </div>
            </div>
            <div class="row">
              <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">
                <div class="form-group" *ngIf="hideFieldForm==false">
                  <div class="custom-label">
                  <label for="categorieBatiment" >État du bien</label>&nbsp;<span class="required" >*</span>                
                  <select class="form-control form-control-sm" id="natureBien" name="natureBien" [(ngModel)]="selectedNatBatiment" (change)="onChangeEtatBien()" >              
                    <option value='option0' selected>--Sélectionner une valeur--</option>
                    <option value='option1'> Ancien</option>
                    <option value='option2'>Neuf</option>           
                  </select>
                </div>
              </div>
              </div>
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div  class="form-group">
                  <div class="custom-label">
                  <label for="partLcl"  >Part LCL <em> (en euro)</em></label>
                  <span class="required"> *</span>             
                  <input type="text" [ngModel]="partLcl | number:'1.0-2':'fr'" 
                  (ngModelChange)="onPartChange($event)"
                   class="form-control form-control-sm" 
                    id=partLcl  name="description" 
                    [disabled]="isFieldsDisabled" />    
                </div>
              </div> 
            </div>
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
                  <div class="custom-label">
                  <label class="labelFormulaire" for="dpe">Siren du diagnostiqueur</label>     
                  <span class="required" *ngIf="selectedNatBatiment=='option1' || numeroDpeAdeme!=null" > *</span>                    
                  <input type="text" class="form-control form-control-sm" placeholder="Ex: 123456789"  id ="SirenDPE" [(ngModel)]="SirenDPE"   [disabled]="isFieldsDisabled" /> 
              </div>
            </div>
              <div class="erreurDpe" *ngIf="hideFieldForm==false"   fxLayoutAlign="left center"  style="margin-top: -2px;">
               {{messageSiren}}
              </div>
              <div *ngIf="isValid !== null">
                <p class="erreurDpe" *ngIf="!isValid && hideFieldForm==false">Le numéro SIREN {{ siren }} est invalide.</p>
              </div>      
          </div>

            </div >
            <div class="row">
              <div class="col-lg-4" *ngIf=" presenceadresse &&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">                  
                      <label for="addressBien"  ></label>
                      <input type="text" class="form-control form-control-sm" (ngModelChange)="onFieldChange()" placeholder="Adresse du bien" id="addressBien" [(ngModel)]="addresseBien" name="description" [disabled]="isFieldsDisabled" />
                      <div class="form-group">
                        <div  class="listeAdress">
                          <ul>
                            <li *ngFor="let result of addressResult">
                              <button (click)="selectAddres(result)">
                                {{ result.properties.label }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>                     
              </div>
              <div class="col-lg-2"   *ngIf="presenceadresse&& hideFieldForm==false"   [ngClass]="{ 'disabled': isFieldsDisabled }">              
                  <label for="addressBien" ></label> <span class="required">*</span>
                  <input type="text" id="codePostal"  class="form-control form-control-sm"   [(ngModel)]="addresseBienCodePostal" (ngModelChange)="onFieldChange()" placeholder="Code postal"  name="codePostal"   [ngClass]="{ 'disabled': isFieldsDisabled }">                             
              </div>
              <div class="col-lg-2"  *ngIf="presenceadresse&&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">               
                  <label for="addressBien" ></label> <span class="required">*</span>
                  <input   type="text" id="ville"  class="form-control form-control-sm"   [(ngModel)]="addresseBienVille" (ngModelChange)="onFieldChange()" placeholder="Ville"   name="Ville"  [ngClass]="{ 'disabled': isFieldsDisabled }">                                
              </div>             
       </div> 
       <div class="row">
        <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">   
          <div class="form-group " *ngIf="hideFieldForm==false">
            <div class="custom-label">
            <label for="categorieBatiment" > Nature du bien</label>&nbsp;<span class="required">*</span>
            <select class="form-control form-control-sm"  [(ngModel)]="codeBatimentSelected" id="categorieBatiment" >
              <option value='option0' selected >--Sélectionner une valeur--</option>
              <option value='option1' > Résidentiel</option>
              <option value='option2'  >Bureaux</option>
              <option value='option3'>Bureaux IGH (hauteur >28 m)</option>
              <option value='option4'>Hôtels</option>
              <option value='option5'>Santé (centres hospitaliers, EHPAD, Etabl. Médicaux sociaux…)</option> 
              <option value='option6'>Centres commerciaux</option>
              <option value='option7'>Autre</option>
            </select>
          </div>
        </div> 
      </div>      
      <div class="col-lg-4"   > </div>

      <div class="col-lg-2"  *ngIf="hideFieldForm==false " >
        <div [ngClass]="{ 'disabled': isFieldsDisabled }">
          <div class="custom-label">
          <label class="labelDPE" for="dpe" >N° du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label>
          <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme" placeholder="Ex: 2100E0981916Z" [(ngModel)]="numeroDpeAdeme"   [disabled]="isFieldsDisabled" />
          <div class="erreurDpe"  fxLayoutAlign="left center" >
            {{message}}
          </div>
          </div></div>
             
        
      </div>
      <div class="col-lg-2" *ngIf="hideFieldForm==false ">    
     <br><br>
        <img   src="../../../assets/images/search.png"  (click)="showAdemeResult(numeroDpeAdeme)" style=" width:20px; height: 20px;">  
      
      </div>

     </div>
    
        </div>
      </div>
    </div>
  </div>
</div>
</div> 
</div>
<div  class="container-fluid">
  <div class="row">
    <div class="col-lg-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize bg-light-gray">
            <div [class.DpeAdem]="elemenDPE == false">
              <div [hidden]="!depExist" *ngIf="hideFieldForm==false">
                <div class="DPE-Bloc" >
                  <span class="float-right">
                    <img *ngIf="hiddenDPE==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataDPE()" />
                    <img *ngIf="hiddenDPE==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataDPE()" />
                  </span> 
                  <h3 class="d-inline-block font-weight-bold">Données du DPE</h3>
                </div>
                <div  *ngIf="elemenDPE == true">
                  <form class="DpeFormulaire" [formGroup]="formGroup">
                    <div class="row">
                      <div class="col-lg-3 col-md-6" style="margin-bottom: 0px;">
                        <label for="numeroNomRue " class="d-block dpeLabel">Adresse du bien <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span></label>
                        <input type="text" id="numeroNomRue"  formControlName="numeroNomRue" name="numeroNomRue" class="form-control">
                        <div class="listeAdress" *ngIf="showAdressResults==true">
                          <ul>
                            <li *ngFor="let result of addressResults">
                              <button (click)="selectAddress(result)">
                                {{ result.properties.label }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6" >
                        <label for="codePostal" class="d-block dpeLabel">Code postal <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span></label>
                        <input type="text" id="codePostal"  formControlName="codePostal" name="codePostal" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <label for="ville" class="d-block dpeLabel">Ville <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span> </label>
                        <input type="text" id="ville"  formControlName="ville" name="ville" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true ">
                        <label for="dateDiangnostique" class="d-block dpeLabel">Date du diagnostic</label>
                        <input type="text" id="dateDiangnostique"  formControlName="dateDiangnostique" name="dateDiangnostique" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <label for="anneeConstruction" class="d-block dpeLabel">Année de construction  <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label>
                       
                        <input type="text" id="anneeConstruction"  formControlName="anneeConstruction" name="anneeConstruction" class="form-control">
                      </div>

                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true "  >
                        <label for="typeBatiment" class="d-block dpeLabel">Type de bien</label>
                        <input type="text" id="typeBatiment"  formControlName="typeBatiment" id="typeBatiment" name="typeBatiment" class="form-control">
                      </div>

                      <div class="col-lg-3 col-md-6" style="margin-top: 0px;">
                        <label for="surfaceBien"  class="champs dpeLabel" >Surface du bien <em>(Surface habitable logement en m²) </em>
                          <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'">*</span></label><br>
                        <input type="text"  formControlName="surfaceBien" name="surfaceBien" id="SurfaceDuBien" class="form-control">                
                      </div>

                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true ">
                        <label for="EnergieType"  class="champs dpeLabel">Type d'énergie </label><br>
                        <input type="text" id="EnergieType"  formControlName="energieType" name="EnergieType"  class="form-control">
                        <img  *ngIf="valGesObligatoire==true" src="../../../assets/icons/obligatoire.svg" style="width:15px; height: 15px;" alt="image flèche haut" >
                      </div>
                     
                      <div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==false" [hidden]="hideFieldCEP==false" >
                        <label class="champs dpeLabel" >Lettre CEP
                        <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
                        <select id="LettreCEPlist" name="LettreCEPlist"  formControlName="lettreCEP" class="form-control"  >
                          <option value='option0' > </option>
                          <option value='option1' >A</option>
                          <option value='option2' >B </option>
                          <option value='option3' >C </option>
                          <option value='option4' >D</option>
                          <option value='option5' >E</option>
                          <option value='option6' >F </option>
                          <option value='option7' >G</option> 
                        </select> 
                      </div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==true" [hidden]="hideFieldCEP==true">
<label for="LettreCEP" class="champs dpeLabel">Lettre CEP <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
<input type="text" id="LettreCEP" formControlName="lettreCEP" name="LettreCEP"  class="form-control">             
</div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;">
<label for="ValeurCEP" class="champs dpeLabel">Valeur CEP <em>(en kWhep/m².an)</em>    
   <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label><br>
<input type="text" id="ValeurCEP"   formControlName="valeurCep"  class="form-control">             
</div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==false" [hidden]="hideFieldGES==false">
  <label class="champs dpeLabel" >Lettre GES
  <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
  <select id="lettreGeslist" name="lettreGeslist"  formControlName="lettreGES"  class="form-control" >
      <option value='option0' > </option>
      <option value='option1' >A</option>
      <option value='option2' >B </option>
      <option value='option3' >C </option>
      <option value='option4' >D</option>
      <option value='option5' >E</option>
      <option value='option6' >F </option>
       <option value='option7' >G</option> 
  </select> 
</div>                    
<div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==true" [hidden]="hideFieldGES==true">
  <label for="LettreGES" class="champs dpeLabel">Lettre GES <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
  <input type="text" id="LettreGES" formControlName="lettreGES" name="LettreGES"  class="form-control">          
</div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;">
<label for="valeurGES" class="champs dpeLabel"> Valeur GES <em>(en kWhep/m².an)</em>    
   <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label><br>
<input type="text"  id="ValeurGES" formControlName="valeurGes"  class="form-control">                
</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<!-- bloc justificatif -->
<app-justificatifs
  [hideFieldForm]="hideFieldForm"
  [dateDepot]="dateDepot"
  [numeroDpeAdeme]="numeroDpeAdeme"
  [normeThermique]="normeThermique"
  [isDpeChecked]="isDpeChecked"
  [selectedOptionJustif]="selectedOptionJustif"
 
  [isDateDepotChecked]="isDateDepotChecked"
  [isNormeThermiqueChecked]="isNormeThermiqueChecked"
  (isDateDepotCheckedChange)="isDateDepotChecked = $event"
  (isDpeCheckedChange)="isDpeChecked = $event"
  (isNormeThermiqueCheckedChange)="isNormeThermiqueChecked = $event"
  (selectedOptionJustifChange)="onSelectedOptionJustifChange($event)">  
></app-justificatifs>

<!--bloc Résultats-->
<app-resultats
[selectedType]="selectedType"
[DpeResults]="DpeResults"
[hideFieldForm]="hideFieldForm"
[alignementResultText]="alignementResultText"
[eligibiliteDpeMessage]="eligibiliteDpeMessage"
[champObligatoire]="champObligatoire"
[donneeObligatoire]="donneeObligatoire"
[errorDpeMessage]="errorDpeMessage"
[errorNormeThermiqueMessage]="errorNormeThermiqueMessage"
[errorDateDepotMessage]="errorDateDepotMessage"
>
</app-resultats>
    
<div class="container-fluid" >
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end">
        <button (click)="showAlignement()"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" >Continuer</button>
      </div>
      </div>           
</div>


// j'ai ce omposant existant qui traite un financement ayant seulement un seul objet recuperer je veux creer un autre composant presque similaire permettant de restitué un liste des objets et ajouter un nouveau vierge en cliquat sur le button ajouter je vous envoie mon code html que j'ai fait et vous m'aider petit a petit a construire ce composant
<h2 class ="Titre-01"> Acquisition des données et des justificatifs</h2>

<app-client [codeApplicatifOrigine]="codeApplicatifOrigine" [idRepers]="idRepers"></app-client>

<app-type-objet-financement 
 [typeObjetFinancement]="typeObjetFinancement"
 [hideFieldForm]="hideFieldForm" 
 (selectedFamilleObjet)="onFamilleSelected($event)" 
 (selectedObjetFinancement)="onObjetFinancementSelected($event)" >
</app-type-objet-financement> 
<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav" >
    <ol class="breadcrumb-custom" >
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index" >
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
         <span>Objet de financement</span>  {{ i + 1 }}
        </a>
        <button class="close-btn" *ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)"(click)="removeBreadcrumbItem(i)">x</button>
      </li>
    </ol>
    <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()"  [disabled]="ajoutFinancementDisabled " title="Merci de calculer l'alignement pour chaque objet ajouté à la liste" >Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>


<div class="container-fluid">  
  <div class="row" >
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize">
          <h3 class="d-inline-block font-weight-bold"  style="font-size: 17px;">Objet de financement {{ selectedObjetIndex+1 }}</h3>
        <span class="float-right" >
            <img *ngIf="hiddenObjetfinancement==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
            <img *ngIf="hiddenObjetfinancement==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
          </span> 
         <div *ngIf="elementObjetfinancement == true"> 
          <div class="row">
            <div class="col-lg-4" *ngIf="hideFieldForm==false && typeObjetFinancement !=null">
                <div class="form-group">
                    <div class="custom-label">
                        <label for="input1">Objet financé</label>
                        <input type="text" disabled class="form-control form-control-sm disable-cursor" id="input1" [(ngModel)]="objetFinance">
                    </div>
                </div>
            </div>
            <div class="col-lg-4" *ngIf="typeObjetFinancement==null">
            </div>
            <div class="col-lg-4">
                <div class="form-group" *ngIf="!hideFieldForm">
                    <div class="custom-label">
                        <label for="prixAquisitionBien">Prix du bien <em>(en euro)</em></label>
                        <span class="required"> *</span>
                        <input type="text"
                               [ngModel]="prixAquisitionBien | number:'1.0-2':'fr'"
                               (ngModelChange)="onPriceChange($event)"
                               class="form-control form-control-sm"
                               id="prixAquisitionBien"
                               name="description"
                               [disabled]="isFieldsDisabled" />
                               <div *ngIf="messageErreurPrix" class="errorprix"> {{messageErreurPrix}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group" *ngIf="hideFieldForm==false">
                    <div class="custom-label">
                        <label for="dateDepot">Date de dépôt de permis de construire <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                        <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot" placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" />
                    </div>
                </div>
            </div>
        </div>
                                
            <div class="row">
              <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">
                <div class="form-group" >
                  <div class="custom-label">
                  <label for="select2" >Eligibilité au DPE </label>                 
                  <select class="form-control form-control-sm"  (mouseenter)="showDescription($event)" id="select2" [(ngModel)]="selectedType">
                    <option *ngFor="let option of options" [value]="option.value" [title]="option.description"> {{ option.label }}</option>
                  </select>
              </div>
              </div>
                <div class="alertArea" *ngIf="showFirstEligiblite==true"> 
                <p style="color: rgb(45, 61, 133); font-size: 14px; font-weight: bold;">Description:</p>  {{messageAlert}}
                </div>
              </div> 
              <div class="col-lg-4">
                <div  class="form-group"  *ngIf="hideFieldForm==false ">
                  <div class="custom-label">
                  <label for="montantFinance" >Montant financé toute banque <em>(en euro)</em></label>
                  <span class="required"> *</span>       
                  <input type="text"
                   [ngModel]="montantLclFinance | number:'1.0-2':'fr'" 
                   (ngModelChange)="onMontantChange($event)"
                    class="form-control form-control-sm" 
                     id=montantLclFinance 
                      name="description" 
                      [disabled]="isFieldsDisabled" />  
                      <div *ngIf="messageErreurMontant" class="errormontant"> 
                        {{messageErreurMontant}}
                      </div>
                
              </div>
              </div> 
              </div> 
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
                  <div class="custom-label">
                <label for="NormeThermique" class="labelFormulaire" >Norme Thermique </label>
                <select class="form-control form-control-sm" id="NormeThermique" required [(ngModel)]="normeThermique"    name="NormeThermique" [disabled]="isFieldsDisabled">
                  <option value='option0' selected> </option>
                  <option value='option1'> RT2012  </option>
                  <option value='option2'> RE2020 </option>
                  <option value='option3' >Autre</option>
                </select>     
              </div>
            </div>
            </div>
            </div>
            <div class="row">
              <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">
                <div class="form-group" *ngIf="hideFieldForm==false">
                  <div class="custom-label">
                  <label for="categorieBatiment" >État du bien</label>&nbsp;<span class="required" >*</span>                
                  <select class="form-control form-control-sm" id="natureBien" name="natureBien" [(ngModel)]="selectedNatBatiment" (change)="onChangeEtatBien()" >              
                    <option value='option0' selected>--Sélectionner une valeur--</option>
                    <option value='option1'> Ancien</option>
                    <option value='option2'>Neuf</option>           
                  </select>
                </div>
              </div>
              </div>
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div  class="form-group">
                  <div class="custom-label">
                  <label for="partLcl"  >Part LCL <em> (en euro)</em></label>
                  <span class="required"> *</span>             
                  <input type="text" [ngModel]="partLcl | number:'1.0-2':'fr'" 
                  (ngModelChange)="onPartChange($event)"
                   class="form-control form-control-sm" 
                    id=partLcl  name="description" 
                    [disabled]="isFieldsDisabled" />    
                    <div *ngIf="messageErreurPartlcl" class="errorpart"> 
                      {{messageErreurPartlcl}}
                    </div> 

                </div>
              </div> 
            </div>
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
                  <div class="custom-label">
                  <label class="labelFormulaire" for="dpe">Siren du diagnostiqueur</label>     
                  <span class="required" *ngIf="selectedNatBatiment=='option1' || numeroDpeAdeme!=null" > *</span>                    
                  <input type="text" class="form-control form-control-sm" placeholder="Ex: 123456789"  id ="SirenDPE" [(ngModel)]="SirenDPE"   [disabled]="isFieldsDisabled" /> 
              </div>
            </div>
              <div class="erreurDpe" *ngIf="hideFieldForm==false"   fxLayoutAlign="left center"  style="margin-top: -2px;">
               {{messageSiren}}
              </div>
              <div *ngIf="isValid !== null">
                <p class="erreurDpe" *ngIf="!isValid && hideFieldForm==false">Le numéro SIREN {{ siren }} est invalide.</p>
              </div>      
          </div>

            </div >
            <div class="row">
              <div class="col-lg-4" *ngIf=" presenceadresse &&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">                  
                      <label for="addressBien"  ></label>
                      <input type="text" class="form-control form-control-sm" (ngModelChange)="onFieldChange()" placeholder="Adresse du bien" id="addressBien" [(ngModel)]="addresseBien" name="description" [disabled]="isFieldsDisabled" />
                      <div class="form-group">
                        <div  class="listeAdress">
                          <ul>
                            <li *ngFor="let result of addressResult">
                              <button (click)="selectAddres(result)">
                                {{ result.properties.label }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>                     
              </div>
              <div class="col-lg-2"   *ngIf="presenceadresse&& hideFieldForm==false"   [ngClass]="{ 'disabled': isFieldsDisabled }">              
                  <label for="addressBien" ></label> <span class="required">*</span>
                  <input type="text" id="codePostal"  class="form-control form-control-sm"   [(ngModel)]="addresseBienCodePostal" (ngModelChange)="onFieldChange()" placeholder="Code postal"  name="codePostal"   [ngClass]="{ 'disabled': isFieldsDisabled }">                             
              </div>
              <div class="col-lg-2"  *ngIf="presenceadresse&&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">               
                  <label for="addressBien" ></label> <span class="required">*</span>
                  <input   type="text" id="ville"  class="form-control form-control-sm"   [(ngModel)]="addresseBienVille" (ngModelChange)="onFieldChange()" placeholder="Ville"   name="Ville"  [ngClass]="{ 'disabled': isFieldsDisabled }">                                
              </div>             
       </div> 
       <div class="row">
        <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">   
          <div class="form-group " *ngIf="hideFieldForm==false">
            <div class="custom-label">
            <label for="categorieBatiment" > Nature du bien</label>&nbsp;<span class="required">*</span>
            <select class="form-control form-control-sm"  [(ngModel)]="codeBatimentSelected" id="categorieBatiment" >
              <option value='option0' selected >--Sélectionner une valeur--</option>
              <option value='option1' > Résidentiel</option>
              <option value='option2'  >Bureaux</option>
              <option value='option3'>Bureaux IGH (hauteur >28 m)</option>
              <option value='option4'>Hôtels</option>
              <option value='option5'>Santé (centres hospitaliers, EHPAD, Etabl. Médicaux sociaux…)</option> 
              <option value='option6'>Centres commerciaux</option>
              <option value='option7'>Autre</option>
            </select>
          </div>
        </div> 
      </div>      
      <div class="col-lg-4"   > </div>

      <div class="col-lg-2"  *ngIf="hideFieldForm==false " >
        <div [ngClass]="{ 'disabled': isFieldsDisabled }">
          <div class="custom-label">
          <label class="labelDPE" for="dpe" >N° du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label>
          <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme" placeholder="Ex: 2100E0981916Z" [(ngModel)]="numeroDpeAdeme"   [disabled]="isFieldsDisabled" />
          <div class="erreurDpe"  fxLayoutAlign="left center" >
            {{message}}
          </div>
          </div></div>
             
        
      </div>
      <div class="col-lg-2" *ngIf="hideFieldForm==false ">    
     <br><br>
        <img   src="../../../assets/images/search.png"  (click)="showAdemeResult(numeroDpeAdeme)" style=" width:20px; height: 20px;">  
      
      </div>

     </div>
    
        </div>
      </div>
    </div>
  </div>
</div>
</div> 
</div>
<div  class="container-fluid">
  <div class="row">
    <div class="col-lg-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize bg-light-gray">
            <div [class.DpeAdem]="elemenDPE == false">
              <div [hidden]="!depExist" *ngIf="hideFieldForm==false">
                <div class="DPE-Bloc" >
                  <span class="float-right">
                    <img *ngIf="hiddenDPE==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataDPE()" />
                    <img *ngIf="hiddenDPE==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataDPE()" />
                  </span> 
                  <h3 class="d-inline-block font-weight-bold">Données du DPE</h3>
                </div>
                <div  *ngIf="elemenDPE == true">
                  <form class="DpeFormulaire" [formGroup]="formGroup">
                    <div class="row">
                      <div class="col-lg-3 col-md-6" style="margin-bottom: 0px;">
                        <label for="numeroNomRue " class="d-block dpeLabel">Adresse du bien <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span></label>
                        <input type="text" id="numeroNomRue"  formControlName="numeroNomRue" name="numeroNomRue" class="form-control">
                        <div class="listeAdress" *ngIf="showAdressResults==true">
                          <ul>
                            <li *ngFor="let result of addressResults">
                              <button (click)="selectAddress(result)">
                                {{ result.properties.label }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6" >
                        <label for="codePostal" class="d-block dpeLabel">Code postal <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span></label>
                        <input type="text" id="codePostal"  formControlName="codePostal" name="codePostal" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <label for="ville" class="d-block dpeLabel">Ville <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span> </label>
                        <input type="text" id="ville"  formControlName="ville" name="ville" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true ">
                        <label for="dateDiangnostique" class="d-block dpeLabel">Date du diagnostic</label>
                        <input type="text" id="dateDiangnostique"  formControlName="dateDiangnostique" name="dateDiangnostique" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <label for="anneeConstruction" class="d-block dpeLabel">Année de construction  <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label>
                       
                        <input type="text" id="anneeConstruction"  formControlName="anneeConstruction" name="anneeConstruction" class="form-control"  (input)="checkAnneeConstruction">
                        <div class="erreurAc" *ngIf="showAlertAc"> 
                          {{messageAlertAc}}
                         </div>

                      </div>

                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true "  >
                        <label for="typeBatiment" class="d-block dpeLabel">Type de bien</label>
                        <input type="text" id="typeBatiment"  formControlName="typeBatiment" id="typeBatiment" name="typeBatiment" class="form-control">
                      </div>

                      <div class="col-lg-3 col-md-6" style="margin-top: 0px;">
                        <label for="surfaceBien"  class="champs dpeLabel" >Surface du bien <em>(Surface habitable logement en m²) </em>
                          <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'">*</span></label><br>
                        <input type="text"  formControlName="surfaceBien" name="surfaceBien" id="SurfaceDuBien" class="form-control">                
                      </div>

                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true ">
                        <label for="EnergieType"  class="champs dpeLabel">Type d'énergie </label><br>
                        <input type="text" id="EnergieType"  formControlName="energieType" name="EnergieType"  class="form-control">
                        <img  *ngIf="valGesObligatoire==true" src="../../../assets/icons/obligatoire.svg" style="width:15px; height: 15px;" alt="image flèche haut" >
                      </div>
                     
                      <div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==false" [hidden]="hideFieldCEP==false" >
                        <label class="champs dpeLabel" >Lettre CEP
                        <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
                        <select id="LettreCEPlist" name="LettreCEPlist"  formControlName="lettreCEP" class="form-control"  >
                          <option value='option0' > </option>
                          <option value='option1' >A</option>
                          <option value='option2' >B </option>
                          <option value='option3' >C </option>
                          <option value='option4' >D</option>
                          <option value='option5' >E</option>
                          <option value='option6' >F </option>
                          <option value='option7' >G</option> 
                        </select> 
                      </div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==true" [hidden]="hideFieldCEP==true">
<label for="LettreCEP" class="champs dpeLabel">Lettre CEP <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
<input type="text" id="LettreCEP" formControlName="lettreCEP" name="LettreCEP"  class="form-control">             
</div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;">
<label for="ValeurCEP" class="champs dpeLabel">Valeur CEP <em>(en kWhep/m².an)</em>    
   <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label><br>
<input type="text" id="ValeurCEP"   formControlName="valeurCep"  class="form-control">             
</div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==false" [hidden]="hideFieldGES==false">
  <label class="champs dpeLabel" >Lettre GES
  <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
  <select id="lettreGeslist" name="lettreGeslist"  formControlName="lettreGES"  class="form-control" >
      <option value='option0' > </option>
      <option value='option1' >A</option>
      <option value='option2' >B </option>
      <option value='option3' >C </option>
      <option value='option4' >D</option>
      <option value='option5' >E</option>
      <option value='option6' >F </option>
       <option value='option7' >G</option> 
  </select> 
</div>                    
<div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==true" [hidden]="hideFieldGES==true">
  <label for="LettreGES" class="champs dpeLabel">Lettre GES <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
  <input type="text" id="LettreGES" formControlName="lettreGES" name="LettreGES"  class="form-control">          
</div>

<div class="col-lg-3 col-md-6"  style="margin-top: 10px;">
<label for="valeurGES" class="champs dpeLabel"> Valeur GES <em>(en kWhep/m².an)</em>    
   <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label><br>
<input type="text"  id="ValeurGES" formControlName="valeurGes"  class="form-control">                
</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<!-- bloc justificatif -->
<app-justificatifs
  [hideFieldForm]="hideFieldForm"
  [dateDepot]="dateDepot"
  [numeroDpeAdeme]="numeroDpeAdeme"
  [normeThermique]="normeThermique"
  [isDpeChecked]="isDpeChecked"
  [selectedOptionJustif]="selectedOptionJustif"
 
  [isDateDepotChecked]="isDateDepotChecked"
  [isNormeThermiqueChecked]="isNormeThermiqueChecked"
  (isDateDepotCheckedChange)="isDateDepotChecked = $event"
  (isDpeCheckedChange)="isDpeChecked = $event"
  (isNormeThermiqueCheckedChange)="isNormeThermiqueChecked = $event"
  (selectedOptionJustifChange)="onSelectedOptionJustifChange($event)">  
></app-justificatifs>

<!--bloc Résultats-->
<app-resultats
[selectedType]="selectedType"
[DpeResults]="DpeResults"
[hideFieldForm]="hideFieldForm"
[alignementResultText]="alignementResultText"
[eligibiliteDpeMessage]="eligibiliteDpeMessage"
[champObligatoire]="champObligatoire"
[donneeObligatoire]="donneeObligatoire"
[errorDpeMessage]="errorDpeMessage"
[errorNormeThermiqueMessage]="errorNormeThermiqueMessage"
[errorDateDepotMessage]="errorDateDepotMessage"
 [showBlocResult]="showBlocResult"
>
</app-resultats>
    
<div class="container-fluid" >
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end" >
        <button (click)="showAlignement(selectedObjetIndex)"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" >Continuer</button>
      </div>
      </div>           
</div>


<div *ngIf="showConfirmDialog" class="confirm-dialog">
  <div class="confirm-dialog-content">
    <p>Êtes-vous sûr de vouloir supprimer cet objet ?</p>
    <button mat-raised-button color="primary" class="confirm-btn" (click)="confirmDelete(true)">Oui</button>
    <button mat-raised-button color="warn" class="confirm-btn" (click)="confirmDelete(false)">Non</button>
  </div>
</div>

voila le code que j'ai mis pour commencer dans le ng Oni pour recuperer les objets 
    ngOnInit(): void {

    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];
    if (this.Url_Retour_Base64) {
		this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
	}
	else {
		console.warn("Url_Retour_Base64 est falsy. Impossible de le convertir en Utf8.");
	}
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
		this.extractedInitialFinancement = responseFinancement;
		console.log("le financement récupéré de la BDD est le suivant:",responseFinancement )	
        this.setFinancementData(responseFinancement);
        this.setObjetFinancementData(responseFinancement.objetFinancement[0]);
        this.checkRequiredFields(responseFinancement,0);
		this.checkPiecesJustificatives(responseFinancement,0);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
		  
    });

	 // Récupérer la liste des objets de financement
	 this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
		this.objetsFinancements = objets;
		this.showDeleteIcon = false;
  
		// Si plusieurs objets, afficher le fil d'Ariane
		if (this.objetsFinancements.length > 1) {
			this.showFileAriane = true;
		}
  
	});
  
}
 ajouterObjetFinancement() {
    // Réinitialisation des variables et de l'état
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    // Création de l'objet de financement vierge avec toutes les propriétés du bien et du dpe initialisées
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

    // Générer un nouvel ID pour l'objet de financement
    this.idGeneratorService.generateIdObjetFinancement().subscribe(
        idFinancement => {
            nouvelObjet.idObjetFinancement = idFinancement;

            // Générer l'ID pour le bien de l'objet avant de l'ajouter
            this.idGeneratorService.generateIdBien().subscribe(
                idBien => {
                    nouvelObjet.bien.idBien = idBien;  // Assigner l'ID du bien

                    // Ajouter le nouvel objet de financement à la liste
                    this.objetsFinancements.push(nouvelObjet);
                    this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];  // Mise à jour des objets

                    // Marquer l'objet comme ajouté manuellement
                    this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
                    this.newIndex = this.objetsFinancements.length - 1;
                    this.ajoutFinancementDisabled = true;

                    console.log("Nouvel objet ajouté avec ID bien et financement générés", nouvelObjet);
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
je veux quand cliquant sur ajouter j'ajoute un objet vierge a l'ecran directement a coté de l'objet courant (surlequel je me pointe) merci de m'adapter 


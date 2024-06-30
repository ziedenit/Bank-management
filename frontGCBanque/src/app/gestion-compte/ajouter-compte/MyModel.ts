import { Component, OnInit, ɵConsole } from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';
import { ClientParticulierService } from '../../services/client-particulier.service';
import { ClientEntrepriseService } from '../../services/client-entreprise.service';
import {Observable, forkJoin} from 'rxjs';
import {PostFinancement}from '../../services/post-financement.service'
import { FinancementService } from 'src/app/services/financement.service';
import { Bien } from 'src/app/model/bien';
import {  Piece } from 'src/app/model/piece';

import { Context } from 'src/app/model/context';
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
import { IdGeneratorService } from '../../services/id-generator.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { query } from '@angular/animations';
import { data } from 'jquery';
import { RouterModule, Routes } from '@angular/router';

@Component({
	selector: 'app-financement.component',
	templateUrl: './financement.component.html',
	styleUrls: ['./financement.component.scss']
})

export class FinancementComponent implements OnInit  {
	
	  selectedObjetFinancement: any = null;
	hiddenObjetfinancement = false;

	objetsFinancement: any[] = [
		// Vos objets de financement ici
	  ];
	  selectedObjetIndex: number | null = null;
	
	  ajouterObjetFinancement() {
		const nouvelObjet = {
		  selectedFamilleObjet: '',
		  familleObjetText: '',
		  selectedObjetFinancement: '',
		  objetFinance: '',
		  prixAquisitionBien: '',
		  dateDepot: '',
		  selectedType: '',
		  montantLclFinance: '',
		  normeThermique: '',
		  selectedNatBatiment: '',
		  partLcl: '',
		  SirenDPE: '',
		  addresseBien: '',
		  addresseBienCodePostal: '',
		  addresseBienVille: '',
		  codeBatimentSelected: '',
		  numeroDpeAdeme: '',
		  hideFieldForm: false,
		  presenceFamilleObjet: false,
		  presenceObjet: false,
		  hiddenObjetfinancement: false
		};
	
		this.objetsFinancement.push(nouvelObjet);
		this.selectedObjetIndex = this.objetsFinancement.length - 1; // Sélectionner le nouvel objet ajouté
	
	  }
	
	  onBreadcrumbClick(index: number , currentObjet : any) {
		this.selectedObjetIndex = index;
		console.log("l'objet selectionnée est ")
		console.log(this.objetsFinancement[index].hiddenObjetfinancement)
		console.log(this.objetsFinancement);
	


	  }
	  
	  
	INDIVIDUAL_COMPANY:boolean;
	prixNonContext:boolean
	montantContext:boolean;
	partLclContext:boolean;
	typeBienbligatoire:boolean;
	catBatimentObligatoire:boolean;
	natureBienObligatoire:boolean;
	anneeConstObligatoire:boolean;
	lettreCpeObligatoire:boolean;
	lettreGesObligatoire:boolean;
	surfaceObligatoire:boolean;
	valCepObligatoire:boolean;
	valGesObligatoire:boolean;
	champObligatoire:boolean;
	typeDeBienObligatoire:boolean;
	selectedNatBatiment:string;
	DpeSelected:boolean;
	receivedFamille: any;
	receivedObjet: any;
	codeBatimentSelected:string='option1';
    numeropiece: string='';
    idRepers: string[]=[];
	validadresse=false;
	DPE_OK=false;
	hideField=false;
	contextAdress: boolean;
    donneeObligatoire: string;
	selectedValue:any;
	depExist=false;
	dpechecked=false;
	selectedCep:any;
	selectedType:String ='option1';
	isFieldsDisabled:boolean=false;

	numeroDpeAdeme:string=null;
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
		{value: 'option1', label: 'Autre bien immobilier', description: 'Autre bien immobilier' }
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
	valeurCEP: new FormControl(),
	valeurGES: new FormControl(),
	EnergieType: new FormControl(),
});

    dpe: any;
	dateDepotPc: any;
	prixAquisitionBien: number=null;
	montantLclFinance:number=null;
	partLcl:number=null;
	showFirstEligiblite: boolean=false;
	id: any;


constructor (private fb:FormBuilder, private changeDetectorRef: ChangeDetectorRef,private clientService: ClientParticulierService,
private entrepriseService: ClientEntrepriseService,private financementService:FinancementService,
private engineService: EngineService,private postFinancementService:PostFinancement,
private engineServiceXtra: EngineXtraService, private adresseService: AdresseService,private idGeneratorService: IdGeneratorService,
private patchFinancementService: PatchFinancement,private route: ActivatedRoute,private http: HttpClient,private router :Router  )
{
	this.formGroup = this.fb.group({
		numeroNomRue :[''] ,
		codePostal : [''],
        ville : [''],
		dateDiangnostique: [''],
		anneeConstruction: [''],
		typeBatiment: [''],
		lettreCEP: [''],
		lettreGES: [''],
		surfaceBien: [''],
		valeurCEP: [''],
		valeurGES: [''],
		EnergieType:['']
	  });
	}

///////////////////////////////////---show bloc Objet de financement---////////////////////////////////

elementObjetfinancement=true;

hideDataObjetFinancement() {
	this.hiddenObjetfinancement=true;
	return (this.elementObjetfinancement = false);
  }
showDataObjetFinancement() {
	this.hiddenObjetfinancement=false;
	return (this.elementObjetfinancement = true);
}
////////////////////////////§///---show bloc Justificatif--- ///////////////////////////////////////
hiddenJustificatif=false;
elementJustificatif=true;

hideDataJustificatif() {
	this.hiddenJustificatif=true;
	return (this.elementJustificatif = false);
 }
showDataJustificatif() {
	this.hiddenJustificatif=false;
	return (this.elementJustificatif = true);
  }

//////////////////////////////////////show bloc Résultats//////////////////////////////////
hiddenResults=false;
elementResults=true;

hideDataResults() {
	this.hiddenResults=true;
	return (this.elementResults = false);
    }
showDataResults() {
	this.hiddenResults=false;
	return (this.elementResults = true);
  }

//////////////////////////////////////show bloc DPE//////////////////////////////////
hiddenDPE=false;
elemenDPE=true;

hideDataDPE() {
	this.hiddenDPE=true;
	return (this.elemenDPE = false);
  }

showDataDPE() {
	this.hiddenDPE=false;
	return (this.elemenDPE = true);
  }

////////////////////////////////// Show bloc client /////////////////////////////////////
hiddenClient=false;
hiddenBien=false;
elementClient=true;
elementBien=true;

showDataClient() {
	this.hiddenClient=false;
	return (this.elementClient = true);

		  }
hideDataClient() {
	this.hiddenClient=true;
	return (this.elementClient = false);
 }

////////////////////////////////// Show bloc bien /////////////////////////////////////
hideDataBien() {
	this.hiddenBien=true;
	return (this.elementBien = false);
			}
showDataBien() {
	this.hiddenBien=false;
	return (this.elementBien = true);
	 }


////////////////////// //bloc Client  particulier//////////////////////////////////
clientDataList: any[] = [];
errorrs:{idReperErrorP:String, messageErrorP: String}[]=[];

getClientData(idReper: string) {
    this.clientService.getClientData(idReper).subscribe(
        (data) => {
			this.clientDataList.push(data);
			console.log("le client particuliers",this.clientDataList)
        },
        (errorP) => {
            this.errorrs.push({ idReperErrorP: idReper, messageErrorP: 'Client Inconnu du SI LCL' });
        }
    );
}
////////////////////////////////  bloc Client  Entreprise  /////////////////////////
entrepriseData: any[] = [];
errors:{idReperErrorE:String, messageErrorE: String}[]=[];
typePersonn:string
nonraison:boolean;

getEntrepriseData(idReper: string) {

    this.entrepriseService.getEntrepriseData(idReper).subscribe(
      (data) => {
		this.entrepriseData.push(data);
		this.typePersonn =data.typePerson;
		if(this.typePersonn=="INDIVIDUAL_COMPANY"){this.nonraison=true}else{this.nonraison=false}

      },
      (errorE) => {
	this.errors.push({idReperErrorE: idReper, messageErrorE:'Client Inconnu du SI LCL' });
        }

    );
  }
//----------------------------------------------------------------------------------------------------------------//
codeApplicationOrigine :string;
addresseBien:string;
addresseBienCodePostal:string;
addresseBienVille:string;
renovation =false;
referenceGED : string;
typePiece:string;
typeObjetFinancement:string;
clientParticulier=false;
codeApplicatifOrigine : string
idFinancement:any;
presenceadresse:boolean=false;
referenceGEDContext: string;
typePieceContext:string;
bienFinanceLCL:boolean;
familleObjet:string;
presenceFamilleObjet:boolean;

selectedFamilleObjet:string;
presenceObjet:boolean;
typeBatiment:string;
classeCepContext:string=null;
dateDebutConstruction:Date;
surfaceBien:number;
quotePartFinancement:number;
agenceCompte:string=null;
objetFinance:string=null;
familleObjetText:string=null;

Url_Retour_Base64:string="";
Url_Retour_Utf8:string="";
DpeResults:boolean=false;


logCheckboxStates() {
    console.log('Date Depot Checked:', this.isDateDepotChecked);
    console.log('DPE Checked:', this.isDpeChecked,this.selectedOptionJustif );
    console.log('Norme Thermique Checked:', this.isNormeThermiqueChecked);
  }


presenceJustifDPE:boolean = false;
presenceJustifNormeThermique:boolean = false;
presenceJustifDateDepotPC:boolean = false;


//////////////////////////////// "" ngOnInit ""//////////////////////////////////////////
ngOnInit(): void{
	
// Recupération de l'idFinancement envoyé dans l'url lors d'un debranchement CPPE vers OFD
this.id = this.route.snapshot.queryParams["idFinancement"];

this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

console.log("l'idFinancement envoyé en paramètre est: ",this.id)
console.log("l'url_retour en base 64 envoyée en paramètre est: ",this.Url_Retour_Base64)


// Décoder l'URL Base64 en UTF-8
if(this.Url_Retour_Base64!=null){
 this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
  console.log("l'url_retour en UTF-8 envoyée en paramètre est:",this.Url_Retour_Utf8)
}

// Récupération de financement à partir de l'idFinancement
this.financementService.getFinancementbyId(this.id).subscribe(
	(responseFinancement) => {
		console.log("le financement récupéré par l'id de contexte est :", responseFinancement);

		// Récupérer les données de financementContext
		this.idRepers=responseFinancement.intervenant.idReper;
		this.codeApplicatifOrigine=responseFinancement.codeApplicatifOrigine;
		this.familleObjet=responseFinancement.objetFinancement.codeFamilleObjet;
		this.typeObjetFinancement=responseFinancement.objetFinancement.codeObjetFinancement;
		this.agenceCompte=responseFinancement.agenceCompte;

		if(this.familleObjet=="01"){this.familleObjetText="Immobilier"}
		if(this.familleObjet=="05"){this.familleObjetText="Transport"}

		if(this.typeObjetFinancement=="02"){
				this.objetFinance="Acquisition de bâtiment";
			}
		if(this.typeObjetFinancement=="03"){
				this.objetFinance="Rénovation de bâtiment";
				this.renovation=true;
				this.depExist=true;
			}

	



if(responseFinancement.objetFinancement!=null &&responseFinancement.objetFinancement.bien!=null
				&& responseFinancement.objetFinancement.bien.eligibleDpe!=null){

					if(responseFinancement.objetFinancement.bien.eligibleDpe=="99"){
						this.selectedType="option1"
						this.hideFieldForm=false; 
						
					}

					if(responseFinancement.objetFinancement.bien.eligibleDpe=="01"){
						this.selectedType="option2"
						this.hideFieldForm=true; 
						
					}

					if(responseFinancement.objetFinancement.bien.eligibleDpe=="02"){
						this.selectedType="option3"
						this.hideFieldForm=true; 
						
					}
					if(responseFinancement.objetFinancement.bien.eligibleDpe=="03"){
						this.selectedType="option4"
						this.hideFieldForm=true; 
						
					}
					if(responseFinancement.objetFinancement.bien.eligibleDpe=="04"){
						this.selectedType="option5"
						this.hideFieldForm=true; 
						
					}
					if(responseFinancement.objetFinancement.bien.eligibleDpe=="05"){
						this.selectedType="option6"
						this.hideFieldForm=true; 
						
					}
					if(responseFinancement.objetFinancement.bien.eligibleDpe=="06"){
						this.selectedType="option7"
						this.hideFieldForm=true; 
					
					}
					if(responseFinancement.objetFinancement.bien.eligibleDpe=="07"){
						this.selectedType="option8"
						this.hideFieldForm=true; 
						
					}
					if(responseFinancement.objetFinancement.bien.eligibleDpe=="08"){
						this.selectedType="option9"
						this.hideFieldForm=true; 
						
					}
					if(responseFinancement.objetFinancement.bien.eligibleDpe=="09"){
						this.selectedType="option10"
						this.hideFieldForm=true; 
					
					}


				}


		if(responseFinancement.objetFinancement!=null &&responseFinancement.objetFinancement.alignement!=null
				&& responseFinancement.objetFinancement.alignement.topAlignement!=null){
			  this.DpeResults=true;

		    if( responseFinancement.objetFinancement.alignement.topAlignement==="01"){
						this.alignementResultText="Eligible et aligné à la Taxonomie";
						this.alignementResult="01"}

						if( responseFinancement.objetFinancement.alignement.topAlignement==="06"){
						 this.alignementResultText="Eligible et non aligné à la Taxonomie ";
						 }

						if( responseFinancement.objetFinancement.alignement.topAlignement==="07"){
						 this.alignementResultText="Eligible et alignement à la Taxonomie non évalué ";
						 }
			}
				
		if (responseFinancement.objetFinancement != null && responseFinancement.objetFinancement.piecesJustificatives != null) {
			this.presenceJustifDPE = responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'DPE')
			|| responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');

			this.presenceJustifDateDepotPC=responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
			this.presenceJustifNormeThermique=responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
		}

		if(this.presenceJustifDPE && responseFinancement.objetFinancement.bien.dpeActuel!=null){this.isDpeChecked=true}
		
		if(!this.presenceJustifDPE && responseFinancement.objetFinancement.bien.dpeActuel!=null && responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe!=null){this.errorDpeMessage='Justificatif DPE manquant'}
		
		if(this.presenceJustifDateDepotPC)
		{this.isDateDepotChecked=true;  this.isNormeThermiqueChecked=true; }
		
		
		if(!this.presenceJustifDateDepotPC &&responseFinancement.objetFinancement.bien.dateDepotPc!=null)
		{this.errorDateDepotMessage='Justificatif attestant de la date de dépôt du permis de construire manquant';}
		
		if(this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC){this.isNormeThermiqueChecked=true }	
		if(!this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC && !this.errorDateDepotMessage)	{this.errorNormeThermiqueMessage='Justificatif Norme thermique manquant'}


			  if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dateDepotPc!=null){
			  this.dateDepot=formatDate(responseFinancement.objetFinancement.bien['dateDepotPc'],'yyyy-MM-dd',"en-US")}


			  if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dpeActuel!=null&& responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe!=null){
			  this.numeroDpeAdeme=responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe
			  }

			  if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.partLCL!==null ){
				this.partLcl=responseFinancement.objetFinancement.bien.partLCL;
			  }

			  if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.prixBien!==null ){
				this.prixAquisitionBien=responseFinancement.objetFinancement.bien.prixBien;
			  }

			  if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.montantFinanceLCL!==null ){
				this.montantLclFinance=responseFinancement.objetFinancement.bien.montantFinanceLCL;
		}

              if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.etatBien!==null ){
				if(responseFinancement.objetFinancement.bien.etatBien==="Ancien"){this.selectedNatBatiment='option1'

				}

				if(responseFinancement.objetFinancement.bien.etatBien==="Neuf"){this.selectedNatBatiment='option2'

				}
			}
			if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dpeActuel!=null&& responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur!=null){
				this.SirenDPE=responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur;
				}


			if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.codeNormeThermique!==null ){

					if(responseFinancement.objetFinancement.bien.codeNormeThermique==="01"){this.normeThermique='option1'

					}

					if(responseFinancement.objetFinancement.bien.codeNormeThermique==="02"){this.normeThermique='option2'

					}


				}
				if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dpeActuel!=null&& responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur!=null){
					this.SirenDPE=responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur;
					}

	//Si un numéro dpe est existant alors un dpe est enregistré dans la base de données
	if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null &&
				   responseFinancement.objetFinancement.bien.dpeActuel!=null&& responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe!=null){

	this.depExist=true
    this.formGroup = this.fb.group({

	numeroNomRue: responseFinancement.objetFinancement &&
	responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.numeroNomRue? responseFinancement.objetFinancement.bien['numeroNomRue']: null,


    codePostal: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['codePostal'] : null,
    ville: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['nomCommune'] : null,
    dateDiangnostique: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel && responseFinancement.objetFinancement.bien.dpeActuel['dateEtablissementDpe'] ?
                       responseFinancement.objetFinancement.bien.dpeActuel['dateEtablissementDpe'].toString().substring(0, 10) :
                       null,
    anneeConstruction: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['anneeConstruction'] : null,
    typeBatiment: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['typeBatiment'] : null,

    lettreCEP: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['classeCep'] : null,
    lettreGES: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['classeGes'] : null,
    surfaceBien: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['surfaceBien'] : null,

    valeurCEP: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['estimationCep'] : null,
    valeurGES: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['estimationGes'] : null,
    EnergieType: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['typeEnergie'] : null,
});

}

		// récupérer les données clients à partir de son idReper (Particulier|| Entreprise&Pro)
		if(this.codeApplicatifOrigine==='01'||this.codeApplicatifOrigine==='02'||this.codeApplicatifOrigine==='05')
			{
			for (const item of this.idRepers) {
			  this.getClientData(item);
			  this.clientParticulier = true;
			}}
		else{
			if(this.codeApplicatifOrigine==='03'||this.codeApplicatifOrigine==='04'||this.codeApplicatifOrigine==='06' ||this.codeApplicatifOrigine==='07'){

				for (const item of this.idRepers) {
				this.getEntrepriseData(item);
				this.clientParticulier = false;
			}
		 }
		}

		// traiter le cas de la présence ou non de la famille d'objet de financement
		if(this.familleObjet==null || this.familleObjet=="")
		{
         this.presenceFamilleObjet=false;
		}else{
		 this.presenceFamilleObjet=true;
		}

        // traiter le cas de la présence ou non de l'objet de financement
		if(this.typeObjetFinancement==null ||this.typeObjetFinancement=="")
		{
		 this.presenceObjet=false;
		}else{
		 this.presenceObjet=true;
		}

		// traiter le cas de la présence ou non de l'adresse de bien
		if(
		(this.addresseBien==null||this.addresseBien=="" || this.addresseBien== "null null")  &&
		(this.addresseBienCodePostal==null || this.addresseBienCodePostal=="")&&
		(this.addresseBienVille ==null || this.addresseBienVille =="")
		)
		{
		this.presenceadresse=false}  else  {this.presenceadresse=true;}


 });// end service récupération données par id financement

}//end ngOnInit


/////////////////////////////////////// Vérifier les justificatifs //////////////////////////////////////////

errorDpeMessage: string;

checkFileDpeInserted(): string | null {
  if (!this.numeroDpeAdeme) {
		return null;  
	  }
  
  if (!this.isDpeChecked) {
    return 'Justificatif DPE manquant';
  }
  return null;
}



errorNormeThermiqueMessage: string;

checkNormeThermique(): string | null {
	if (!this.normeThermique ) {
		return null; 
	  }

	if(this.dateDepot && this.isDateDepotChecked ){
		return null;
	}

	if(!this.dateDepot && !this.isNormeThermiqueChecked){
		return 'Justificatif Norme thermique manquant';
	}
  return null;
}


errorDateDepotMessage: string;

checkFileDateDepotInserted(): string | null {
	if (!this.dateDepot ) {
		return null;  
	  }
  
  if (!this.isDateDepotChecked) {
    return 'Justificatif attestant de la date de dépôt du permis de construire manquant';
  }
  return null;
}


/////////////////////////////////////////////// calcul de l'alignement et éligibilité ////////////////////////////////////////////////
		ligneContext: LigneContext =
		{
		    typeObjetFinancement: "",
		    dateDepotPc: new Date(''),
		    anneeConstruction: 0 ,
		    etiquetteDpe: '',
		    valeurCep: 0,
		    presenceDpe:true,
		    presenceDateDepotPc: false,
		    presenceAttestation: false,
		    normeThermique: '',
		    presenceDpeAvantTravaux: false,
		    presenceDpeApresTravaux: false,
		    gainCep: 0,
		    codeBatiment:''
	    };

		ligneContextXtra: LigneContextXtra =
		{
			typeObjetFinancement: '',
			codeBatiment: '',
			presenceDateDepotPc: false,
			presenceDateDepotPcJustificatif: false,
			dateDepotPc: new Date(''),
		    presenceDpe: false,
		    presenceDpeJustificatif: false,
			presenceNormeThermique: false,
			normeThermique: '',
			presenceNormeThermiqueJustificatif: false,
			anneeConstruction: 0,
			etiquetteDpe: '',
			valeurCep: 0,
			presenceDpeAvantTravaux: false,
			presenceDpeApresTravaux: false,
		    gainCep : 0,
	    };

		alignementResult: string ;
		alignementXtraResult: string;
		alignementResultText: string ;
		alignementXtraResultText: string ;
	    dateDepot:any;
		normeThermique:string;
		selectedCepList:string
		champSaisi:boolean;


	eligibiliteDpe:string;
	eligibiliteDpeMessage:string;

	  showAlignement(): void {
		    this.DpeResults=true;
			this.elementResults=true;
			

		    const formData = this.formGroup.value;
			this.champObligatoire=false;

       // calcul d'éligibilité DPE
        if(this.selectedType=="option1"){
			  this.eligibiliteDpe="02"
			  this.eligibiliteDpeMessage="Eligible et"

		}else{
			this.eligibiliteDpe="99"
			this.eligibiliteDpeMessage=""
		}


			this.ligneContext.anneeConstruction = formData.anneeConstruction;
			this.ligneContextXtra.anneeConstruction=formData.anneeConstruction;
			if(this.hideField==false){
			this.ligneContext.etiquetteDpe = formData.lettreCEP;
			this.ligneContextXtra.etiquetteDpe=formData.lettreCEP;}

			this.ligneContext.valeurCep = formData.valeurCEP;
			this.ligneContextXtra.valeurCep=formData.valeurCEP;

			if(this.codeBatimentSelected==='option1'){this.ligneContext.codeBatiment='00001'; this.ligneContextXtra.codeBatiment='00001'}
			if(this.codeBatimentSelected==='option2'){this.ligneContext.codeBatiment='00002';this.ligneContextXtra.codeBatiment='00002'}
			if(this.codeBatimentSelected==='option3'){this.ligneContext.codeBatiment='00003';this.ligneContextXtra.codeBatiment='00003'}
			if(this.codeBatimentSelected==='option4'){this.ligneContext.codeBatiment='00004';this.ligneContextXtra.codeBatiment='00004'}
			if(this.codeBatimentSelected==='option5'){this.ligneContext.codeBatiment='00005';this.ligneContextXtra.codeBatiment='00005'}
			if(this.codeBatimentSelected==='option6'){this.ligneContext.codeBatiment='00006';this.ligneContextXtra.codeBatiment='00006'}

			if(this.objetFinance==='Acquisition de bâtiment'|| this.selectedObjetFinancement==='option2' ){
				this.ligneContext.typeObjetFinancement='02';
				this.ligneContextXtra.typeObjetFinancement='02'
		    } else{

		    if(this.objetFinance==='Rénovation de bâtiment' || this.selectedObjetFinancement==='option3' ){
			this.ligneContext.typeObjetFinancement='03';
			this.ligneContextXtra.typeObjetFinancement='03';
			}}

			if(this.hideField==true){
			if(formData.lettreCEP==='option0'){
					this.ligneContext.etiquetteDpe=''
					this.ligneContextXtra.etiquetteDpe='';
				}

              if(formData.lettreCEP==='option1'){
				this.ligneContext.etiquetteDpe='A'
				this.ligneContextXtra.etiquetteDpe='A'
			  }
			  if(formData.lettreCEP==='option2'){
				this.ligneContext.etiquetteDpe='B'
				this.ligneContextXtra.etiquetteDpe='B'
			  }

			  if(formData.lettreCEP==='option3'){
				this.ligneContext.etiquetteDpe='C'
				this.ligneContextXtra.etiquetteDpe='C'
			  }
			  if(formData.lettreCEP==='option4'){
				this.ligneContext.etiquetteDpe='D'
				this.ligneContextXtra.etiquetteDpe='D'
			  }
			  if(formData.lettreCEP==='option5'){
				this.ligneContext.etiquetteDpe='E'
				this.ligneContextXtra.etiquetteDpe='E'
			  }
			  if(formData.lettreCEP==='option6'){
				this.ligneContext.etiquetteDpe='F'
				this.ligneContextXtra.etiquetteDpe='F'
			  }
			  if(formData.lettreCEP==='option7'){
				this.ligneContext.etiquetteDpe='G'
				this.ligneContextXtra.etiquetteDpe='G'
			  }
			}


		   if(this.dateDepot===undefined || this.dateDepot===""|| this.dateDepot===null){
			   this.ligneContext.presenceDateDepotPc=false;
			   this.ligneContext.dateDepotPc=null;

			   this.ligneContextXtra.presenceDateDepotPc=false;
			   this.ligneContextXtra.dateDepotPc=null;
		   }

		    else{
			this.ligneContext.presenceDateDepotPc=true;
			this.ligneContext.dateDepotPc=this.dateDepot;

			this.ligneContextXtra.presenceDateDepotPc=true;
			this.ligneContextXtra.dateDepotPc=this.dateDepot;
		   }

		if(this.normeThermique===undefined || this.normeThermique===null){
			this.ligneContext.presenceAttestation=false;
			this.ligneContext.normeThermique=null;

			this.ligneContextXtra.presenceNormeThermique=false;
			this.ligneContextXtra.normeThermique=null;

		} else{
		   this.ligneContext.presenceAttestation=true;
           this.ligneContextXtra.presenceNormeThermique=true;

		   if(this.normeThermique==='option1'){
			this.ligneContext.normeThermique='2012';
			this.ligneContextXtra.normeThermique='2012'
		   }else{
			if (this.normeThermique==='option2'){
			this.ligneContext.normeThermique='2020';
			this.ligneContextXtra.normeThermique='2020'
		   }
		   else{
			this.ligneContext.normeThermique='';
			this.ligneContextXtra.normeThermique=''
		   }
		}
		  }
		  if(this.numeroDpeAdeme===undefined ||this.numeroDpeAdeme==null ||this.numeroDpeAdeme=="" ){
			this.ligneContext.presenceDpe=false;
			this.ligneContextXtra.presenceDpe=false;

		} else{
		   this.ligneContext.presenceDpe=true;
		   this.ligneContextXtra.presenceDpe=true;
		  }

// Contrôler la présence de justificatif DPE ou compromis de vente si le numéro ADEME est renseigné
this.ligneContextXtra.presenceDpeJustificatif = this.isDpeChecked;

// Contrôler la présence d'un justificatif attestant de la date de dépôt de permis de construire
this.ligneContextXtra.presenceDateDepotPcJustificatif = this.isDateDepotChecked;

// Contrôler la présence de justificatif Norme thermique
this.ligneContextXtra.presenceNormeThermiqueJustificatif = this.isDateDepotChecked || (!this.isDateDepotChecked && this.isNormeThermiqueChecked);


		this.engineService.alignement(this.ligneContext) .subscribe(aligne => {
			if(aligne==="01"){
			this.alignementResultText="aligné à la Taxonomie";
			this.alignementResult="01"}

			if(aligne==="06"){
		     this.alignementResultText="non aligné à la Taxonomie ";
			 this.alignementResult="06"}

			if(aligne==="07"){
			 this.alignementResultText="alignement à la Taxonomie non évalué ";
			 this.alignementResult="07"}

			console.log('LineContext',this.ligneContext )
			console.log('Alignement Simulé', this.alignementResult);
		  });


		this.engineServiceXtra.alignementXtra(this.ligneContextXtra).subscribe(aligneXtra => {
		    if(aligneXtra==="01"){this.alignementXtraResultText="Aligné à la Taxonomie"; this.alignementXtraResult="01"}
			if(aligneXtra==="06"){this.alignementXtraResultText="Non aligné à la Taxonomie " ; this.alignementXtraResult="06"}
			if(aligneXtra==="07"){this.alignementXtraResultText="Alignement à la Taxonomie non évalué " ;this.alignementXtraResult="07"}

			console.log('LineContext XTRA',this.ligneContextXtra )
			console.log('Alignement XTRA', aligneXtra);
		  })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

this.errorDpeMessage = this.checkFileDpeInserted();
this.errorNormeThermiqueMessage=this.checkNormeThermique();
this.errorDateDepotMessage=this.checkFileDateDepotInserted();

// champs prix de bien
if (this.prixAquisitionBien==null || this.prixAquisitionBien==0 ){
	this.champObligatoire=true;
	this.donneeObligatoire='Donnée obligatoire';
	document.getElementById("prixAquisitionBien").style.border = "1px solid red";

}
 else{
	document.getElementById('prixAquisitionBien').style.removeProperty('border');

}

////////////////////////////////////////////////////////////////////////////////////////////////
// champs  Montant financé
if (this.montantLclFinance==null || this.montantLclFinance==0 ){
	this.champObligatoire=true;
	this.donneeObligatoire='Donnée obligatoire';
	document.getElementById("montantLclFinance").style.border = "1px solid red";
}
 else{

	document.getElementById('montantLclFinance').style.removeProperty('border');

}


////////////////////////////////////////////////////////////////////////////////////////////////

// champs Part LCL
if (this.partLcl==null || this.partLcl==0 ){
	this.champObligatoire=true;
	this.donneeObligatoire='Donnée obligatoire';
	document.getElementById("partLcl").style.border = "1px solid red";
}
 else{
	 if(this.partLclContext==true ||this.partLcl!=0 )
 document.getElementById('partLcl').style.removeProperty('border');
}

////////////////////////////////////////////////////////////////////////////////////////////////

if (this.selectedNatBatiment=='option1' && (this.numeroDpeAdeme ==null || this.numeroDpeAdeme ==""|| this.numeroDpeAdeme ==undefined)){
	this.champObligatoire=true;
	this.donneeObligatoire='Donnée obligatoire';
	document.getElementById("numeroDpeAdeme").style.border = "1px solid red";
}
else{
 document.getElementById('numeroDpeAdeme').style.removeProperty('border');
}


////////////////////////////////////////////////////////////////////////////////////////////////
if ((this.selectedNatBatiment=='option1' && (this.SirenDPE ==null ||this.SirenDPE ==undefined || this.SirenDPE ==""))
|| (this.numeroDpeAdeme !=null && (this.SirenDPE ==null || this.SirenDPE ==undefined || this.SirenDPE ==""))
)
{
	console.log("ici siren obligatoire",this.selectedNatBatiment,this.SirenDPE)
	this.champObligatoire=true;
	this.donneeObligatoire='Donnée obligatoire';
	document.getElementById("SirenDPE").style.border = "1px solid red";
}
else{
 document.getElementById('SirenDPE').style.removeProperty('border');
 console.log("ici siren pas obligatoire",this.selectedNatBatiment,this.SirenDPE)
}

//////////////////////////////////////////////////////////////////////////////////////////////////

if(this.objetFinance==''|| this.objetFinance==null){
// champs objet de financement
if (this.selectedObjetFinancement ==''|| this.selectedObjetFinancement == undefined ||this.selectedObjetFinancement =='option0'  ){
	this.champObligatoire=true;
	this.donneeObligatoire='Donnée obligatoire';
	document.getElementById("selectedObjetFinancement").style.border = "1px solid red";
}
else{
 document.getElementById('selectedObjetFinancement').style.removeProperty('border');
}


////////////////////////////////////////////////////////////////////////////////////////////////

// champs famille objet de financement
 if(this.presenceFamilleObjet==false)
{


if ((this.selectedFamilleObjet ==''|| this.selectedFamilleObjet == undefined ||this.selectedFamilleObjet =='option0') ){
	this.champObligatoire=true;
	this.donneeObligatoire='Donnée obligatoire';
	document.getElementById("selectedFamilleObjet").style.border = "1px solid red";
}
else{
 document.getElementById('selectedFamilleObjet').style.removeProperty('border');
}
} 


}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//champs annee de construction
if(formData.anneeConstruction=="" || formData.anneeConstruction==null || formData.anneeConstruction==undefined)
		  {
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("anneeConstruction").style.border = "1px solid red";
		  }
		  else
		  {document.getElementById('anneeConstruction').style.removeProperty('border'); }


//////////////////////////////////////////////////////////////////////////////////////////////
if(formData.codePostal=="" || formData.codePostal==null ||  formData.codePostal==undefined)
		  {
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("codePostal").style.border = "1px solid red";
		  }
		  else
		  {document.getElementById('codePostal').style.removeProperty('border'); }


//////////////////////////////////////////////////////////////////////////////////////////////
if(formData.ville=="" || formData.ville==null || formData.ville==undefined )
		  {
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("ville").style.border = "1px solid red";
		  }
		  else
		  {document.getElementById('ville').style.removeProperty('border'); }


/////////////////////////////////////////////////////////////////////////////////////////////////////
//champs lettre cep
		if(formData.lettreCEP=="" || formData.lettreCEP==undefined|| formData.lettreCEP==null )
		  {
			this.champObligatoire=true;
		 	this.donneeObligatoire='Donnée obligatoire';
		 	document.getElementById("LettreCEP").style.border = "1px solid red"
		  }
		  else
		  {
		 	document.getElementById('LettreCEP').style.removeProperty('border');
		  }

//champs lettre cep en liste
		  if(this.hideField==true){
			if(formData.lettreCEP=="" || formData.lettreCEP==undefined || formData.lettreCEP==null || formData.lettreCEP=='option0' )
			{
			  this.champObligatoire=true;
			  this.donneeObligatoire='Donnée obligatoire';
			  document.getElementById("LettreCEPlist").style.border= "1px solid red";
			}
			else
			{
			  document.getElementById('LettreCEPlist').style.removeProperty('border');
			}
		 }
/////////////////////////////////////////////////////////////////////////////////////////////////////

		  if(formData.lettreGES=="" || formData.lettreGES==undefined || formData.lettreGES==null )
		  {
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("LettreGES").style.border= "1px solid red";
		  }
		  else
		  {
			document.getElementById('LettreGES').style.removeProperty('border');
		  }
		  //////////////////////////////////////////
		  
		  if(formData.EnergieType=="" || formData.EnergieType==undefined || formData.EnergieType==null )
		  {
			  console.log("energyyyyyyyy",formData.EnergieType)
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("EnergieType").style.border= "1px solid red";
		  }
		  else
		  {
			document.getElementById('EnergieType').style.removeProperty('border');
			console.log("no energyyyyyyyy",formData.EnergieType)
		  }
/////////////////////////////////////////////////////////////////////////////////////////////////////

		  if(this.hideField==true){
			if(formData.lettreGES=="" || formData.lettreGES==undefined || formData.lettreGES==null || formData.lettreGES=='option0'  )
			{
			  this.champObligatoire=true;
			  this.donneeObligatoire='Donnée obligatoire';
			  document.getElementById("lettreGeslist").style.border= "1px solid red";
			}
			else
			{
			  document.getElementById('lettreGeslist').style.removeProperty('border');
			} }
///////////////////////////////////////////////////////////////////////////////////////////////////////
		if(formData.valeurGES=="" || formData.valeurGES==null || formData.valeurGES==undefined)
		  {
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("ValeurGES").style.border = "1px solid red";
		  }
		  else
		  {
			console.log(formData.valeurGES)
			document.getElementById('ValeurGES').style.removeProperty('border');
		  }

/////////////////////////////////////////////////////////////////////////////////////////////////////
		  if(formData.valeurCEP=="" || formData.valeurCEP==null ||formData.valeurCEP==undefined )
		  {
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("ValeurCEP").style.border = "1px solid red";
		  }
		  else
		  {
			document.getElementById('ValeurCEP').style.removeProperty('border');
		  }

/////////////////////////////////////////////////////////////////////////////////////////////////////

		  if(formData.surfaceBien=="" || formData.surfaceBien==null || formData.surfaceBien==undefined )
		  {
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("SurfaceDuBien").style.border = "1px solid red";
		  }
		  else
		  {
			document.getElementById('SurfaceDuBien').style.removeProperty('border');

		  }

/////////////////////////////////////////////////////////////////////////////////////////////////////

		if (this.codeBatimentSelected==null ||this.codeBatimentSelected==undefined||this.codeBatimentSelected=="option0")
		{

			console.log("coucou")
			console.log(this.codeBatimentSelected)
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("categorieBatiment").style.border = "1px solid red";
		}
		else
		{
		  document.getElementById('categorieBatiment').style.removeProperty('border');

		}
/////////////////////////////////////////////////////////////////////////////////////////////////////

		 if (this.selectedNatBatiment == null ||this.selectedNatBatiment == undefined||this.selectedNatBatiment=="option0")
		{

			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("natureBien").style.border = "1px solid red";
		}
		else
		{
		  document.getElementById('natureBien').style.removeProperty('border');
		}

/////////////////////////////////////////////////////////////////////////////////////////////////////

		if (this.selectedNatBatiment=='option2' && (this.dateDepot===undefined||this.dateDepot==""))
		{
			this.champObligatoire=true;
			this.donneeObligatoire='Donnée obligatoire';
			document.getElementById("dateDepot").style.border = "1px solid red";
		}
		else
		{
		  document.getElementById('dateDepot').style.removeProperty('border');
		}

}

/////////////////////////////////Restitution des données de l'ADEME////////////////////////////////////////////////////

dpeAdeme :any;
message: string;
dateReceptionDpe  : Date ;
dateFinValiditeDpe: Date;
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

showAdemeResult(numeroDpeAdeme:string)
{

if(this.SirenDPE.length>9|| this.SirenDPE.length<9){
	console.log("la valeur de SIREN", this.SirenDPE.length)
	this.messageSiren="Numéro Siren du diagnostiqueur doit être valide"
	console.log("ici erreur dans le siren de diag")
}
else{
	this.messageSiren="";
}

    this.elementJustificatif =true
    this.depExist=true;
    this.DpeSelected=true;
      console.log("interoge ademe api with numéro ADEME: ", numeroDpeAdeme)
      this.anneeConstObligatoire=false;
      if(String(numeroDpeAdeme).length>13||String(numeroDpeAdeme).length<13)
        {
          this.message='Le champs N° du DPE doit être valide';
          this.hideField=true;
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
			  EnergieType:[''],
          });
        }
     else
    {
        this.financementService.getDpeAdeme(this.numeroDpeAdeme).subscribe(
            (data) => {
                this.message='';
				this.dpeAdeme=data;

	 this.dpeExisteAdeme=true;
	 //Données DPE
	 this. dateReceptionDpe =this.dpeAdeme['Date_réception_DPE'] ? this.dpeAdeme['Date_réception_DPE'] : '';
	 this.dateFinValiditeDpe=this.dpeAdeme['Date_fin_validité_DPE'] ? this.dpeAdeme['Date_fin_validité_DPE'] : '';
	 this.modelDpe=this.dpeAdeme['Modèle_DPE'] ? this.dpeAdeme['Modèle_DPE'] : '';
	 this.numeroDpeRemplace=this.dpeAdeme['N°_DPE_remplacé'];
	 this.versionDpe=this.dpeAdeme['N°_DPE_remplacé'] ? this.dpeAdeme['N°_DPE_remplacé'] : '';
	 this.methodeDpeApplique=this.dpeAdeme['Méthode_application_DPE'] ? this.dpeAdeme['Méthode_application_DPE'] : '';

   //Donnés bien
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
					valeurCEP: this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] ? this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] : '',
					valeurGES: this.dpeAdeme['Emission_GES_5_usages_par_m²'] ? this.dpeAdeme['Emission_GES_5_usages_par_m²'] : '',
					EnergieType: this.dpeAdeme['Type_énergie_n°1'] ? this.dpeAdeme['Type_énergie_n°1'] : ''
				});
				 
  // complétude adresse retournée par l'ademe si changement par le cons
  this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
	{
	   this.searchAddress();
	 });

	 this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
		{
		   this.searchAddress();
		 });
	 this.formGroup.get('ville').valueChanges.subscribe(ville=>
			{
			   this.searchAddress();
			 });
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
						{
						this.searchAddress();

						});

				  this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
						{
						this.searchAddress();
						});
				 this.formGroup.get('ville').valueChanges.subscribe(ville=>
						{
						this.searchAddress();
						});
            }
        );

    }

	this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
		{
		   this.searchAddress();
		 });

		 this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
			{
			   this.searchAddress();
			 });
		 this.formGroup.get('ville').valueChanges.subscribe(ville=>
				{
				   this.searchAddress();
				 });
}// end ADEME

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
onFieldChange():void{
	this.searchAddres();
}

selectedNatBatimentGestion:any;
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -------------------------------------------------------alerte message eligibilité du bien------------------------------------------------------------
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
	else
	{
		this.showFirstEligiblite=false;
		this.hideFieldForm=false; 
	}
}

///////////////////////////////////Post Financement/Patch Financement  ////////////////////////////////////////////
// variables Post financement
SirenDPE:string="";
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

//-----------------------------------Patch Financement-------------------------------------------//
callPatchFinancement(idFinancement:string, financementAUpdate:Financement ){
this.patchFinancementService.patchFinancement(idFinancement, financementAUpdate).subscribe(
	response => {
	  console.log('Financement mis à jour avec succès:', response);
	},
	error => {
	  console.error('Erreur lors de la mise à jour du financement:', error);
	}
  );
}

selectedOptionJustif:string='DPE';
alignementXtraResultC:string;
alignementResultC:string;
piecesJustificatives : Piece [] ;

//-----------------------Action button continuer--------------------------------------//
postContinuer(): void {
	this. piecesJustificatives=[];	

if(this.selectedType =='option1'){this.bienToPatch.eligibleDpe="99"}
if(this.selectedType =='option2'){this.bienToPatch.eligibleDpe="01"}
if(this.selectedType =='option3'){this.bienToPatch.eligibleDpe="02"}
if(this.selectedType =='option4'){this.bienToPatch.eligibleDpe="03"}
if(this.selectedType =='option5'){this.bienToPatch.eligibleDpe="04"}
if(this.selectedType =='option6'){this.bienToPatch.eligibleDpe="05"}
if(this.selectedType =='option7'){this.bienToPatch.eligibleDpe="06"}
if(this.selectedType =='option8'){this.bienToPatch.eligibleDpe="07"}
if(this.selectedType =='option9'){this.bienToPatch.eligibleDpe="08"}
if(this.selectedType =='option10'){this.bienToPatch.eligibleDpe="09"}

 if( this.presenceObjet==false && this.selectedObjetFinancement==='option2'){
	 this.objetFinancementContext.codeObjetFinancement="02"
 }
	
	if(this.selectedNatBatiment=='option1'){this.bienToPatch.etatBien="Ancien"}
	if(this.selectedNatBatiment=='option2'){this.bienToPatch.etatBien="Neuf"}

	this.bienToPatch.dateDepotPc=this.dateDepot;
	this.bienToPatch.prixBien=this.prixAquisitionBien;
	this.bienToPatch.montantFinanceLCL=this.montantLclFinance;
	this.bienToPatch.partLCL=this.partLcl;

	if(this.normeThermique==='option0'){
		this.bienToPatch.codeNormeThermique=null;}
	
	if(this.normeThermique==='option1'){
	this.bienToPatch.codeNormeThermique='01';}
	
	if(this.normeThermique==='option2'){
		this.bienToPatch.codeNormeThermique='02';}
	
	if(this.normeThermique==='option3'){
			this.bienToPatch.codeNormeThermique='99';}

// Calcul d'éligibilité DPE
this.eligibiliteDpe = this.selectedType == "option1" ? "02" : "99";
this.elegibiliteContext.topEligibilite = this.eligibiliteDpe;

//patch champs 	
	if(this.codeBatimentSelected==='option1' && this.selectedType =='option1'){this.bienToPatch.codeBatiment='00001';}
	if(this.codeBatimentSelected==='option2' && this.selectedType =='option1'){this.bienToPatch.codeBatiment='00002';}
	if(this.codeBatimentSelected==='option3' && this.selectedType =='option1'){this.bienToPatch.codeBatiment='00003';}
	if(this.codeBatimentSelected==='option4' && this.selectedType =='option1'){this.bienToPatch.codeBatiment='00004';}
	if(this.codeBatimentSelected==='option5' && this.selectedType =='option1'){this.bienToPatch.codeBatiment='00005';}
	if(this.codeBatimentSelected==='option6' && this.selectedType =='option1'){this.bienToPatch.codeBatiment='00006';}
 
  this.dpeToPatch.numeroDpe=this.numeroDpeAdeme;
  this.dpeToPatch.sirenDiagnostiqueur=this.SirenDPE;

  this.bienToPatch.numeroNomRue=this.formGroup.value.numeroNomRue;
  this.bienToPatch.codePostal=this.formGroup.value.codePostal;
  this.bienToPatch.nomCommune=this.formGroup.value.ville;
  this.bienToPatch.adresseComplete=this.formGroup.value.numeroNomRue+ this.formGroup.value.codePostal+ this.formGroup.value.ville;

  const regex = /^(\d+)\s+(.+)$/;
  const numeroNomRue = this.formGroup.value.numeroNomRue;
  if (numeroNomRue) { 
	
	const result = numeroNomRue.match(regex);
	if (result) {
		this.bienToPatch.numeroVoie = result[1];
		this.bienToPatch.typeVoie=result[2];
		this.bienToPatch.nomRue= result[3];
	}}

  this.bienToPatch.anneeConstruction=this.formGroup.value.anneeConstruction;
  this.bienToPatch.surfaceBien=this.formGroup.value.surfaceBien;
  this.bienToPatch.typeEnergie=this.formGroup.value.EnergieType;

  this.dpeToPatch.estimationCep=this.formGroup.value.valeurCEP;
  this.dpeToPatch.estimationGes=this.formGroup.value.valeurGES;

  if(this.hideField==false){
	  this.dpeToPatch.classeCep=this.formGroup.value.lettreCEP;}
	  
	  if(this.hideField==true){
		  if(this.formGroup.value.lettreCEP==='option0'){
			  this.dpeToPatch.classeCep=''
			}
		if(this.formGroup.value.lettreCEP==='option1'){
		  this.dpeToPatch.classeCep='A'
		}
		if(this.formGroup.value.lettreCEP==='option2'){
		  this.dpeToPatch.classeCep='B'
		}
		if(this.formGroup.value.lettreCEP==='option3'){
		  this.dpeToPatch.classeCep='C'
		}
		if(this.formGroup.value.lettreCEP==='option4'){
		  this.dpeToPatch.classeCep='D'
		}
		if(this.formGroup.value.lettreCEP==='option5'){
		  this.dpeToPatch.classeCep='E'
		}
		if(this.formGroup.value.lettreCEP==='option6'){
		  this.dpeToPatch.classeCep='F'
		}
		if(this.formGroup.value.lettreCEP==='option7'){
		  this.dpeToPatch.classeCep='G'
		}
	  }
	  

	  if(this.hideField==false){
	  this.dpeToPatch.classeGes=this.formGroup.value.lettreGES;}
	  
	  if(this.hideField==true){
	  if(this.formGroup.value.lettreGES==='option0'){
			  this.dpeToPatch.classeCep=''
			}
		if(this.formGroup.value.lettreGES==='option1'){
		  this.dpeToPatch.classeGes='A'
		}
		if(this.formGroup.value.lettreGES==='option2'){
		  this.dpeToPatch.classeGes='B'
		}
		if(this.formGroup.value.lettreGES==='option3'){
		  this.dpeToPatch.classeGes='C'
		}
		if(this.formGroup.value.lettreGES==='option4'){
		  this.dpeToPatch.classeGes='D'
		}
		if(this.formGroup.value.lettreGES==='option5'){
		  this.dpeToPatch.classeGes='E'
		}
		if(this.formGroup.value.lettreGES==='option6'){
		  this.dpeToPatch.classeGes='F'
		}
		if(this.formGroup.value.lettreGES==='option7'){
		  this.dpeToPatch.classeGes='G'
		}
	  }
	  

	  // si le retour de l'ademe est OK stocker ces données dans la base de données OFD
	  if (this.dpeExisteAdeme) {
		  this.dpeToPatch.dateEtablissementDpe=this.formGroup.value.dateDiangnostique;
		  this.bienToPatch.typeBatiment=this.formGroup.value.typeBatiment;
		  this.dpeToPatch.dateReceptionDpe=this.dateReceptionDpe;
		  this.dpeToPatch.dateFinValiditeDpe=this.dateFinValiditeDpe;
		  this.bienToPatch.codeDepartement=this.codeDepartement;
		  this.bienToPatch.codeInseeCommune=this.codeInseeCommune;
		  this.bienToPatch.periodeConstruction=this.periodeConstruction;
		  this.bienToPatch.coordonneeCartographiqueX=this.coordonneeCartographiqueX;
		  this.bienToPatch.coordonneeCartographiqueY=this.coordonneeCartographiqueY;
	  }
	 
            const formData = this.formGroup.value;
            this.ligneContext.anneeConstruction = formData.anneeConstruction;
			this.ligneContextXtra.anneeConstruction=formData.anneeConstruction;
			
			if (!this.hideField) {
            this.ligneContext.etiquetteDpe = formData.lettreCEP;
            this.ligneContextXtra.etiquetteDpe=formData.lettreCEP;}
            this.ligneContext.valeurCep = formData.valeurCEP;
            this.ligneContextXtra.valeurCep=formData.valeurCEP;
            if(this.codeBatimentSelected==='option1'){this.ligneContext.codeBatiment='00001'; this.ligneContextXtra.codeBatiment='00001'}
            if(this.codeBatimentSelected==='option2'){this.ligneContext.codeBatiment='00002';this.ligneContextXtra.codeBatiment='00002'}
            if(this.codeBatimentSelected==='option3'){this.ligneContext.codeBatiment='00003';this.ligneContextXtra.codeBatiment='00003'}
            if(this.codeBatimentSelected==='option4'){this.ligneContext.codeBatiment='00004';this.ligneContextXtra.codeBatiment='00004'}
            if(this.codeBatimentSelected==='option5'){this.ligneContext.codeBatiment='00005';this.ligneContextXtra.codeBatiment='00005'}
			if(this.codeBatimentSelected==='option6'){this.ligneContext.codeBatiment='00006';this.ligneContextXtra.codeBatiment='00006'}
			
            if(this.objetFinance==='Acquisition de bâtiment'|| this.selectedObjetFinancement==='option2' ){
                this.ligneContext.typeObjetFinancement='02';
                this.ligneContextXtra.typeObjetFinancement='02'
		   
			} else{
            if(this.objetFinance==='Rénovation de bâtiment' || this.selectedObjetFinancement==='option3' ){
            this.ligneContext.typeObjetFinancement='03';
            this.ligneContextXtra.typeObjetFinancement='03';
            }}
            if(this.hideField==true){
            if(formData.lettreCEP==='option0'){
                    this.ligneContext.etiquetteDpe=''
                    this.ligneContextXtra.etiquetteDpe='';
                }
              if(formData.lettreCEP==='option1'){
                this.ligneContext.etiquetteDpe='A'
                this.ligneContextXtra.etiquetteDpe='A'
              }
              if(formData.lettreCEP==='option2'){
                this.ligneContext.etiquetteDpe='B'
                this.ligneContextXtra.etiquetteDpe='B'
              }
              if(formData.lettreCEP==='option3'){
                this.ligneContext.etiquetteDpe='C'
                this.ligneContextXtra.etiquetteDpe='C'
              }
              if(formData.lettreCEP==='option4'){
                this.ligneContext.etiquetteDpe='D'
                this.ligneContextXtra.etiquetteDpe='D'
              }
              if(formData.lettreCEP==='option5'){
                this.ligneContext.etiquetteDpe='E'
                this.ligneContextXtra.etiquetteDpe='E'
              }
              if(formData.lettreCEP==='option6'){
                this.ligneContext.etiquetteDpe='F'
                this.ligneContextXtra.etiquetteDpe='F'
              }
              if(formData.lettreCEP==='option7'){
                this.ligneContext.etiquetteDpe='G'
                this.ligneContextXtra.etiquetteDpe='G'
              }
            }

           if(this.dateDepot===undefined || this.dateDepot===""|| this.dateDepot===null){
               this.ligneContext.presenceDateDepotPc=false;
               this.ligneContext.dateDepotPc=null;
               this.ligneContextXtra.presenceDateDepotPc=false;
               this.ligneContextXtra.dateDepotPc=null;
           }
            else{
            this.ligneContext.presenceDateDepotPc=true;
            this.ligneContext.dateDepotPc=this.dateDepot;
            this.ligneContextXtra.presenceDateDepotPc=true;
            this.ligneContextXtra.dateDepotPc=this.dateDepot;
           }
        if(this.normeThermique===undefined || this.normeThermique===null){
            this.ligneContext.presenceAttestation=false;
            this.ligneContext.normeThermique=null;
            this.ligneContextXtra.presenceNormeThermique=false;
            this.ligneContextXtra.normeThermique=null;
        } else{
           this.ligneContext.presenceAttestation=true;
           this.ligneContextXtra.presenceNormeThermique=true;
           if(this.normeThermique==='option1'){
            this.ligneContext.normeThermique='2012';
            this.ligneContextXtra.normeThermique='2012'
           }else{
            if (this.normeThermique==='option2'){
            this.ligneContext.normeThermique='2020';
            this.ligneContextXtra.normeThermique='2020'
           }
           else{
            this.ligneContext.normeThermique='';
            this.ligneContextXtra.normeThermique=''
           }
        }
          }
          if(this.numeroDpeAdeme===undefined ||this.numeroDpeAdeme==null ||this.numeroDpeAdeme=="" ){
            this.ligneContext.presenceDpe=false;
            this.ligneContextXtra.presenceDpe=false;
        } else{
           this.ligneContext.presenceDpe=true;
           this.ligneContextXtra.presenceDpe=true;
		  }
		  

    // Contrôler la présence de justificatif DPE ou compromis de vente si le numéro ADEME est renseigné
       this.ligneContextXtra.presenceDpeJustificatif = this.isDpeChecked;

    // Contrôler la présence d'un justificatif attestant de la date de dépôt de permis de construire 
       this.ligneContextXtra.presenceDateDepotPcJustificatif = this.isDateDepotChecked;

    // Contrôler la présence de justificatif Norme thermique
       this.ligneContextXtra.presenceNormeThermiqueJustificatif = this.isDateDepotChecked || (!this.isDateDepotChecked && this.isNormeThermiqueChecked);


// Wait for both alignment services to complete
  forkJoin([
    this.engineService.alignement(this.ligneContext),
    this.engineServiceXtra.alignementXtra(this.ligneContextXtra)
  ]).subscribe(([aligne, aligneXtra]) => {
    if (aligne === "01") {
      this.alignementResultText = "aligné à la Taxonomie";
      this.alignementResult = "01";
    } else if (aligne === "06") {
      this.alignementResultText = "non aligné à la Taxonomie";
      this.alignementResult = "06";
    } else if (aligne === "07") {
      this.alignementResultText = "alignement à la Taxonomie non évalué";
      this.alignementResult = "07";
    }

    if (aligneXtra === "01") {
      this.alignementXtraResult = "01";
    } else if (aligneXtra === "06") {
      this.alignementXtraResult = "06";
    } else if (aligneXtra === "07") {
      this.alignementXtraResult = "07";
    }

// enregister les justificatif dans la base de données 

if (this.isDpeChecked) {

if(this.selectedOptionJustif=="DPE"){
this.pieceJustificativeContextDpe.typePiece="DPE"
this.pieceJustificativeContextDpe.dpeActuel=true;
this.pieceJustificativeContextDpe.numeroDpe=this.numeroDpeAdeme;
}


if(this.selectedOptionJustif=="Compromis de vente"){
	this.pieceJustificativeContextDpe.typePiece="Compromis de vente"
	}	
this. piecesJustificatives.push(this.pieceJustificativeContextDpe)	
	
}


if(this.isNormeThermiqueChecked){
this.pieceJustificativeContextNth.typePiece="Norme thermique"
this. piecesJustificatives.push(this.pieceJustificativeContextNth)
}



if (this.isDateDepotChecked) {
	this.pieceJustificativeContextPC.typePiece="Permis de construire"
	this. piecesJustificatives.push(this.pieceJustificativeContextPC)
}



console.log("la piece justificative est la suivante:",  this. piecesJustificatives)


  this.bienToPatch.bienFinanceLCL=true;
  
  this.objetFinancementContext.piecesJustificatives=this. piecesJustificatives;
  // champs alignement
  this.alignementContext.topAlignement=this.alignementResult;
  this.alignementContext.topAlignementXtra=this.alignementXtraResult;
  
  this.bienToPatch.dpeActuel=this.dpeToPatch;
  this.financementContext.indicateurFinancementDedie=this.financementDedie;
  this.objetFinancementContext.alignement=this.alignementContext;
  this.objetFinancementContext.eligibilite=this.elegibiliteContext;
  this.objetFinancementContext.bien=this.bienToPatch;

  this.financementContext.objetFinancement=this.objetFinancementContext;
  this.financementContext.alignement=this.alignementContext;
  this.financementContext.eligibilite=this.elegibiliteContext;
  
  
  this.callPatchFinancement(this.id,this.financementContext);
  console.log("le financement a patcher est le suivant : ",this.financementContext)


  
//Redirection vers l'application d'octroi
window.location.href=this.Url_Retour_Utf8
});

}

isDateDepotChecked: boolean = false;
isDpeChecked: boolean = false;
isNormeThermiqueChecked: boolean = false;

///////////////////////////////////////Auto Complétude Adresse/////////////////////////////////
address: string = '';
postalCode: string = '';
city: string = '';
addressResults: any[] = [];
addressResult: any[] = [];
selectedAddress: any;
showAdressResults:boolean=true;
showAdressResult:boolean=true;

//--------------------------auto complétude adresse envoyée dans le contexte----------------------------
searchAddres(): void {
const query = `${this.addresseBien} ${this.addresseBienCodePostal} ${this.addresseBienVille}`;
console.log("ici quesry1", query)
this.adresseService.autoCompleteAddress(query).subscribe((data) => {
this.addressResult = data.features;
});
if (this.addresseBien ||this.addresseBienCodePostal||this.addresseBienVille)
{this.showAdressResult=true;}
}

//--------------------------auto complétude adresse renvoyée par l'ademe ou saisie par le cons LCL----------------------------
searchAddress(): void {
	const query = `${this.formGroup.get('numeroNomRue').value} ${this.formGroup.get('codePostal').value} ${this.formGroup.get('ville').value}`;
	console.log("ici quesry2", query)
    this.adresseService.autoCompleteAddress(query).subscribe((data) => {
	  this.addressResults = data.features;
	});

	if (this.formGroup.get('numeroNomRue')||this.formGroup.get('codePostal')||this.formGroup.get('ville'))
	{this.showAdressResults=true;}
  }

  selectAddress(address: any): void {
	this.selectedAddress = address;
	// Mettre à jour les valeurs dans le formulaire avec les données sélectionnées
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
	// Mettre à jour les valeurs dans le formulaire avec les données sélectionnées
	this.addresseBien= address.properties.name,
	this.addresseBienCodePostal= address.properties.postcode,
	this.addresseBienVille= address.properties.city

	this.showAdressResult=false;
	this.addressResult=[];
  }

}



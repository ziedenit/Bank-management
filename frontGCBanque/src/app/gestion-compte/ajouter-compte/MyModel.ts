import { Alignement } from './alignement';
import { Bien } from './bien';
import { Dpe } from './dpe';
import { Eligibilite } from './eligibilite';
import {  Piece } from './piece';
import {  Garantie } from './garantie';

export class ObjetFinancement {
	[x: string]: any;

    idObjetFinancement:string;
	codeObjetFinancement:string;// 02=Acquisition  03=Travaux
	quotePartObjet:number;
	gainCEP:number;
	dateFinTravaux: Date;
	bien:Bien;
	dpeAvantTravaux: Dpe;
	dpeApresTravaux: Dpe;
	alignement: Alignement;
    eligibilite: Eligibilite;
	piecesJustificatives : Piece [] ;
	codeFamilleObjet: string;	
	garantie: Garantie[]; 
	firstDisconnectionOfd:boolean;

}
import { IdGeneratorService } from '../services/id-generator.service';
import { Dpe } from './dpe';
export class Bien {
    idBien:string;
    codeBatiment:string;
    codeNormeThermique:string;
    typeBatiment:string;
    codePostal:string;
    nomCommune:string;
    adresseComplete:string;
    anneeConstruction:string;
    dateDepotPc:string;
    surfaceBien:number;
    bienFinanceLCL:boolean;
    dpeActuel:Dpe;
    etatBien:string;
    numeroVoie:string;
    nomRue:string;
    prixBien: number;
    montantFinanceLCL:number;
    partLCL:number;
    typeUsage:string;
    numeroNomRue:string;

    typeEnergie:string;
    batiment:string;
    escalier:string;
    etage: string;
    porte:string;

    typeVoie:string;
    codeDepartement:string;
    codeInseeCommune:string;
    numeroLot:string;
    periodeConstruction:string;
    coordonneeCartographiqueX:number;
    coordonneeCartographiqueY:number;
    dateDebutConstruction:Date;

    eligibleDpe:string;




}


export class Dpe {
          id  :  number ;
          origineCreation  : string;
          dateCreation  : Date  ;
          origineModification  : string  ;
          dateModification: Date  ;
          idDpe  : string  ;
          numeroDpe  :   string  ;
          estimationCep  : number ;
          classeCep  :  string    ;
          estimationGes  : number ;
          classeGes  :  string ;
          dateEtablissementDpe  : Date  ;
          dateReceptionDpe  : Date ;
          dateFinValiditeDpe  : Date;
          sirenDiagnostiqueur : string;
          etatBien:string;
          modelDpe:string;
          numeroDpeRemplace:string;
          versionDpe: string;
          methodeDpeApplique:string;



}
ajouterObjetFinancement() {
	this.isDateDepotChecked=false;
	   this.isNormeThermiqueChecked=false;
	   this.isDpeChecked=false;
	this.showBlocResult=false;
    this.showDeleteIcon =true;
    this.showFileAriane = true;
    const nouvelObjet: ObjetFinancement = {
		idObjetFinancement: null,
		codeObjetFinancement: "02",
		quotePartObjet: null,
		gainCEP: null,
		dateFinTravaux: null,
		bien: new Bien(),
		dpeAvantTravaux: new Dpe(),
		dpeApresTravaux: new Dpe(),
		alignement: Alignement.createDefault(),
		eligibilite: new Eligibilite(),
		codeFamilleObjet: "01",
		garantie: [],
		firstDisconnectionOfd: true,
		piecesJustificatives:[],
	};

    this.idGeneratorService.generateIdObjetFinancement().subscribe(
      id => {
      nouvelObjet.idObjetFinancement = id;
      this.objetsFinancements.push(nouvelObjet);
	  console.log("nouveau objet initilisé et cree lors de click sur le button")
	  console.log(nouvelObjet)
	 this.ajoutFinancementDisabled=true;
      this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
      this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
	  this.newIndex=this.objetsFinancements.length - 1;
      console.log("le financement apres recupération et ajout des objets")
      console.log(this.extractedInitialFinancement)
	
      },
      error => {
      console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
	  this.ajoutFinancementDisabled=false;
      }
	  
    );
	
    }
 generateIdBien(): Observable<string> {
    
    return this.http.get(`${this.baseUrl}/generate_idBien`, {
      headers: this.getHeaders(),
      responseType: 'text' 
    })
    .pipe(
      tap(data => console.log('ID Bien généré :', data)),
      catchError(error => {
        console.error('Erreur lors de la génération d\'ID Bien :', error);
        return this.handleError(error);
      })
    );
  }
j'ai ce code et a travers la fonction ajouterObjetFinancement je veux creer initialisé un objet financement vide a chaque appel de la fonction ajouterObjetFinancement 
    objet financement c'est objet imbriqué je veux que tous les objet dedans soit renitalisé et au meme temps je veux a chaque initialisation de bien creer son id ( avec la fonction generate id bien ) merci de m'adap

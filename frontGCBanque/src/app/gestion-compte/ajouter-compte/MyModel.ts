
export class Financement {

idFinancement: string;
objetFinancement: ObjetFinancement[] ;
alignement: Alignement;
eligibilite: Eligibilite;

intervenant: Intervenant;
indicateurFinancementDedie:string;
indicateurNatureDurable:string;
typeRisqueClimatiqueAttenue:string;

codeApplicatifOrigine: string;
indicateurReprise: boolean;
statut: number ;
agenceCompte:string;


}
import { Alignement } from './alignement';
import { Bien } from './bien';
import { Dpe } from './dpe';
import { Eligibilite } from './eligibilite';
import {  Piece } from './piece';
import {  Garantie } from './garantie';

export class ObjetFinancement {
	
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

export class Alignement {
   topAlignement :string;
   topAlignementXtra:string; 
}



export class Eligibilite {
    topEligibilite :string;
   
 }
 export class Intervenant {

   idIntervenant: string;
   idReper: string [];	
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
export class Piece {

    id: any;
    origineCreation: string;
    dateCreation: Date;
    origineModification: string;
    dateModification: Date;
    idPiece: string;
    referenceGed: string;
    typePiece: string;
    sousTypePiece: string;
    numeroDpe: string;
    dpeActuel: boolean;
}
import { Alignement } from './alignement';
import { Bien } from './bien';
import { Eligibilite } from './eligibilite';
import {  Piece } from './piece';
export class Garantie {

 idGarantie:string;
 typeObjetGarantie:string;
 bien:Bien;
 topAlignement: Alignement;
 topEligibilite: Eligibilite;
 piecesJustificatives : Piece [] ;
 
}	

 ajouterObjetFinancement() {
    this.showDeleteIcon =true;
    this.showFileAriane = true;
    const nouvelObjet: ObjetFinancement = {
      idObjetFinancement: null,
      codeObjetFinancement: null,
      quotePartObjet: null,
      gainCEP: null,
      dateFinTravaux: null,
      bien: Bien.createDefault(),
      dpeAvantTravaux: new Dpe(),
      dpeApresTravaux: new Dpe(),
      alignement: new Alignement(),
      eligibilite: new Eligibilite(),
      piecesJustificatives: [],
      codeFamilleObjet: "",
      garantie: [],
     firstDisconnectionOfd: true,
     
    };
     
    this.idGeneratorService.generateIdObjetFinancement().subscribe(
      id => {
      nouvelObjet.idObjetFinancement = id;
      this.objetsFinancements.push(nouvelObjet);
      this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
      this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
      console.log("this.extractedInitialFinancement")
      console.log(this.extractedInitialFinancement)
      },
      error => {
      console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
      }
    );
    
    }
bonjour j'ai ce code ci dessous de la fonction ajouterObjetFinancement la ou a chaque appel a cette fonction je dois initiliser a vide l'objet
ObjetFinancement je dois garantir que les champs et les objest imbriqué dans ObjetFinancement doivent etre intialisé convenablement merci de m'aider a modifier l'initialisation 
 const nouvelObjet: ObjetFinancement = {


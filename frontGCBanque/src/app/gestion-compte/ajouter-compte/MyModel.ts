import { Alignement } from './alignement';
import { Eligibilite } from './eligibilite';
import { Intervenant } from './intervenant';
import { ObjetFinancement } from './objetFinancement';


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
firstDisconnectionOfd:boolean;

}
xport class ObjetFinancement {
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

    constructor() {
        this.id = 0;
        this.origineCreation = '';
        this.dateCreation = new Date(); // Initialise avec la date actuelle
        this.origineModification = '';
        this.dateModification = new Date(); // Initialise avec la date actuelle
        this.id= 0;
        this.origineCreation= ' ';
        this.dateCreation=  new Date();
        this.origineModification=' ';
        this.dateModification= new Date();
        this.idPiece= ' ';
        this.referenceGed= ' ';
        this.typePiece= ' ';
        this.sousTypePiece= ' ';
        this.numeroDpe= ' ';
        this.dpeActuel= false;   
    }


}
export class Justificatif {
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

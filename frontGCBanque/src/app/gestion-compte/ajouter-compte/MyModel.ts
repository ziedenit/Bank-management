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
        this.idPiece = '';
        this.referenceGed = '';
        this.typePiece= '';
        this.sousTypePiece= '';
        this.numeroDpe='';
        this.dpeActuel= null;
        
    }
    
}
 ajouterObjetFinancement() {
	  
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
      piecesJustificatives: new Piece(), (instantation a corriger )
      codeFamilleObjet: "01",
      garantie: [],
     firstDisconnectionOfd: true,
	 
     
    };
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

} comment je corrige piecesJustificatives: new Piece()

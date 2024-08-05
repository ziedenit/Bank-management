  extractedInitialFinancement: Financement;
 objetsFinancements: ObjetFinancement[] = [];
removeBreadcrumbItem(index: number) {
			this.objetsFinancements.splice(index, 1);
			console.log("apres suppression contenue du tablau");
			console.log(this.objetsFinancements);
			console.log("le financement au complet avec les objets ajoutés preparation post patch");
			console.log(this.extractedInitialFinancement);
		  }
/////////////////////////
je veux mettre ajour extractedInitialFinancement avec la nouveau table this.objetsFinancements comment faire quel instruction sachant que le model et le suivant 
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

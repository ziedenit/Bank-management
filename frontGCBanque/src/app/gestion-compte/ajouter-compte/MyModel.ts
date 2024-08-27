private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
		console.log("bien.dpeactuel.avant")
		console.log(currentObject.bien.dpeActuel)
        if (!currentObject || !currentObject.bien) return;
		
        const bien = currentObject.bien;
		const dpeActuel =currentObject.bien.dpeActuel;
        bien.partLCL = this.partLcl;
        bien.montantFinanceLCL = this.montantLclFinance;
        bien.prixBien = this.prixAquisitionBien;
        bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
        bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique); 
        bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
        bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
	
      }

j'ai cette fonction que j'appel on clickant sur un objet 
onBreadcrumbClick(index: number ) {
		// sauvgarde des données  propres à un selectionné objet du fil Ariane 
       this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
	   console.log("selectedObjetIndex")
	   console.log(this.selectedObjetIndex)
	   this.selectedObjetIndex=index;
	   // Appliquer les regles metier sur l'element selectionné du fil Ariane a revoir l'adaptation
	   this.mapFinancementDataMultiOfd(this.extractedInitialFinancement,index)
       this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
	   this.traiterPiecesJustificatives(this.extractedInitialFinancement,index);
	   this.setFinancementDataOnScreenMultiOfd(this.extractedInitialFinancement,index)
		this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien,index); 
			this.depExist=true; 
			
		  }
		  removeBreadcrumbItem(index: number) {
			this.objetsFinancements.splice(index, 1);
			this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
		  }
mon probleme est le suivant 
ERROR TypeError: Cannot set properties of null (setting 'sirenDiagnostiqueur')
    at push.0JfT.MultiOfdComponent.saveCurrentObjectValues (main.js:2052:44)
    at push.0JfT.MultiOfdComponent.onBreadcrumbClick (main.js:2026:14)
    at MultiOfdComponent_li_7_Template_a_click_1_listener (main.js:151:346)
    at executeListenerWithErrorHandling (vendor.js:70430:12)
    at wrapListenerIn_markDirtyAndPreventDefault (vendor.js:70477:16)
    at HTMLAnchorElement.<anonymous> (vendor.js:112532:32)
    at ZoneDelegate.invokeTask (polyfills.js:1303:173)
    at Object.onInvokeTask (vendor.js:86706:25)
    at ZoneDelegate.invokeTask (polyfills.js:1303:56)
    at Zone.runTask (polyfills.js:1053:39)
je veux que lorsque    sirenDiagnostiqueur est null lorsque     bien.dpeActuel est null , l'initialiser pour pourvoire affacter bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
    de la meme facon pour      bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
sachant que le model est les suivant 
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

    
    constructor() {
        this.partLCL = null;
        this.montantFinanceLCL = null;
        this.prixBien = null;
        this.dateDepotPc = null;
        this.codeNormeThermique = null;
        this.dpeActuel = new Dpe();
        this.codePostal = null;
        this.numeroNomRue = null;
        this.nomCommune = null;
        this.typeEnergie = null;
        this.surfaceBien = null;
        this.anneeConstruction = null;
        this.typeBatiment = null;
        this.codeDepartement = null;
        this.codeInseeCommune = null;
        this.periodeConstruction = null;
        this.coordonneeCartographiqueX = null;
        this.coordonneeCartographiqueY = null;
        this.etatBien = null;
    }

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

          constructor() {
            this.id = 0;
            this.origineCreation = '';
            this.dateCreation = new Date(); // Initialise avec la date actuelle
            this.origineModification = '';
            this.dateModification = new Date(); // Initialise avec la date actuelle
            this.idDpe = '';
            this.numeroDpe = '';
            this.estimationCep = 0;
            this.classeCep = '';
            this.estimationGes = 0;
            this.classeGes = '';
            this.dateEtablissementDpe = null; 
            this.dateReceptionDpe = null; 
            this.dateFinValiditeDpe = null; 
            this.sirenDiagnostiqueur = '' ;
            this.etatBien = '';
            this.modelDpe = '';
            this.numeroDpeRemplace = '';
            this.versionDpe = '';
            this.methodeDpeApplique = '';
        }
}

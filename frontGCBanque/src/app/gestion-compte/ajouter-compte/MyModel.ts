
	onBreadcrumbClick(index: number ) {
	

		const alignement = this.extractedInitialFinancement.objetFinancement[index].alignement;
		console.log("this.extractedInitialFinancement.objetFinancement[index].alignement.resultAlignText",this.extractedInitialFinancement.objetFinancement[index].alignement.resultAlignText)
  
		if (alignement) {
		  this.alignementResultText = this.extractedInitialFinancement.objetFinancement[index].alignement.resultAlignText;
		} else {
		  this.alignementResultText = 'Aucun alignement disponible';
		}
    //
    showAlignement(index:number): void {
	this.checkFormFieldsFormGroup();
	this.showBlocResult=true;
	this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd=false;
	this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);
	

	
	
	if (this.clickCalulAlignObject.has(index)) {
		const currentCountcalcul = this.clickCalulAlignObject.get(index)??0;
		this.clickCalulAlignObject.set(index, currentCountcalcul + 1);
	} else {
		
		this.clickCalulAlignObject.set(index, 1);
	}


	this.prepareLigneContext();

			
			this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
			this.DpeResults = true;
			this.elementResults = true;		
			
			
			forkJoin([
				this.engineService.alignement(this.ligneContext),
				this.engineService.alignementXtra(this.ligneContextXtra)            
			]).subscribe(([aligne, aligneXtra]) => {    
				this.alignementResultText = this.alignementMapping[aligne];
				console.log("this.alignementResultText",this.alignementResultText)
				this.alignementResult = aligne;
				this.alignementXtraResult = aligneXtra;
				this.alignementContext= this.xtraRepriseService.calculXtra(aligne,aligneXtra);
				this.alignementContext.resultAlignText=this.alignementResultText;
				this.extractedInitialFinancement.objetFinancement[index].alignement=this.alignementContext;
			});

		
			this.errorDpeMessage = this.checkFileDpeInserted();
			this.errorNormeThermiqueMessage = this.checkNormeThermique();
			this.errorDateDepotMessage = this.checkFileDateDepotInserted();
			this.evaluatedIndex.push(index);
			const allManuallyAddedAreEvaluated = this.manuallyAddedIndices.every(manualIndex => this.evaluatedIndex.includes(manualIndex));
			const isManuallyAddedEmpty = this.manuallyAddedIndices.length === 0;
			if ((index == this.newIndex) || (index == 0 && (allManuallyAddedAreEvaluated || isManuallyAddedEmpty))) {
				this.ajoutFinancementDisabled = false;
			}	
			
			console.log("financement a patcher avec resultat alignement: ",this.extractedInitialFinancement);
}
//
export class Alignement {
   public topAlignement: string;
   public xtra275TopAlignement: string;
   public topAlignementXtra: string;
   public xtra275TopAlignementXtra: string;
   public topXtra274: string | null;
   public topXtra276: string | null;
   public resultAlignText : string | null;
  

   static createDefault(): Alignement {
      return new Alignement(null, null, null, null, null, null);
  }
  

   constructor(
       topAlignement: string ,
       xtra275TopAlignement: string ,
       topAlignementXtra: string ,
       xtra275TopAlignementXtra: string ,
       topXtra274: string ,
       topXtra276: string 
   ) 
   
   {
       this.topAlignement = topAlignement;
       this.xtra275TopAlignement = xtra275TopAlignement;
       this.topAlignementXtra = topAlignementXtra;
       this.xtra275TopAlignementXtra = xtra275TopAlignementXtra;
       this.topXtra274 = topXtra274;
       this.topXtra276 = topXtra276;
   }


   
}
		

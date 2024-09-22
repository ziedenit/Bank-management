 console.log("après changement, alignementResultText pour l'objet ", index, this.extractedInitialFinancement.objetFinancement[index].alignementResultText);
//
showAlignement(index: number): void {
    this.checkFormFieldsFormGroup();
    this.showBlocResult = true;
    this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd = false;
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

    // Sauvegarde de l'alignement après le calcul
    forkJoin([
        this.engineService.alignement(this.ligneContext),
        this.engineService.alignementXtra(this.ligneContextXtra)            
    ]).subscribe(([aligne, aligneXtra]) => {    
        this.alignementResultText = this.alignementMapping[aligne];
        console.log("alignementResultText calculé pour l'objet ", index, this.alignementResultText);
        
        // Sauvegarder l'alignementResultText dans l'objet correspondant
        this.extractedInitialFinancement.objetFinancement[index].alignementResultText = this.alignementResultText;
        console.log("alignementResultText sauvegardé pour l'objet ", index, this.extractedInitialFinancement.objetFinancement[index].alignementResultText);
    });
}

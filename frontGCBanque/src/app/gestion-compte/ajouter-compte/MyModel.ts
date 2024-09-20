checkPiecesJustificatives(treatedFinancement:Financement,index:number) {		
		if (treatedFinancement.objetFinancement[index] != null && treatedFinancement.objetFinancement[index].piecesJustificatives != null) {
			this.presenceJustifDPE = treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'DPE')
			|| treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
			this.presenceJustifDateDepotPC=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
			this.presenceJustifNormeThermique=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
		}
		if(this.presenceJustifDPE && treatedFinancement.objetFinancement[index].bien.dpeActuel.numeroDpe!=null && treatedFinancement.objetFinancement[index].bien.dpeActuel.numeroDpe!=""){
		this.isDpe= treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'DPE');
		this.isCompromis=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
		console.log("regles PJ dpe et compromis",this.isDpe,this.isCompromis)
		if(this.isDpe){this.selectedOptionJustif='DPE'}
		if(this.isCompromis){this.selectedOptionJustif='Compromis de vente'}
		this.isDpeChecked=true
		}
		if(!this.presenceJustifDPE && treatedFinancement.objetFinancement[index].bien.dpeActuel!=null  && treatedFinancement.objetFinancement[index].bien.dpeActuel.numeroDpe!=""){this.errorDpeMessage='Justificatif DPE manquant'}	
		if(this.presenceJustifDateDepotPC)
		{this.isDateDepotChecked=true; this.isNormeThermiqueChecked=true 
		}
		if(!this.presenceJustifDateDepotPC &&treatedFinancement.objetFinancement[index].bien.dateDepotPc!=null)
		{this.errorDateDepotMessage='Justificatif attestant de la date de dépôt du permis de construire manquant';}
		if(this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC){this.isNormeThermiqueChecked=true }
		if(!this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC && !this.errorDateDepotMessage 
			&&treatedFinancement.objetFinancement[index].bien.codeNormeThermique!=null){this.errorNormeThermiqueMessage='Justificatif Norme thermique manquant'}
}

 if (this.isDpeChecked) {
			currentObject.piecesJustificatives.push({
				typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
				dpeActuel: this.selectedOptionJustif === "DPE",
				numeroDpe: this.numeroDpeAdeme,
				id: undefined,
				origineCreation: '',
				dateCreation: undefined,
				origineModification: '',
				dateModification: undefined,
				idPiece: '',
				referenceGed: '',
				sousTypePiece: ''
			});
        }    
        if (this.isNormeThermiqueChecked&&currentObject.piecesJustificatives // contient deja une piece de type Norme thermique") {
			currentObject.piecesJustificatives.push({
				typePiece: "Norme thermique",
				id: undefined,
				origineCreation: '',
				dateCreation: undefined,
				origineModification: '',
				dateModification: undefined,
				idPiece: '',
				referenceGed: '',
				sousTypePiece: '',
				numeroDpe: '',
				dpeActuel: false
			});
		  console.log("isNormeThermiqueChecked")
        }
        if (this.isDateDepotChecked // contient deja une piece de type Permis de construire") {
			currentObject.piecesJustificatives.push({
				typePiece: "Permis de construire",
				id: undefined,
				origineCreation: '',
				dateCreation: undefined,
				origineModification: '',
				dateModification: undefined,
				idPiece: '',
				referenceGed: '',
				sousTypePiece: '',
				numeroDpe: '',
				dpeActuel: false
			});
        }

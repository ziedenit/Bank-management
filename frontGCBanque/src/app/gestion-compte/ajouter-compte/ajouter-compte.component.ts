maintenant je veux ajouter ce button dans un bloc au dessus du formulaire et a chaque fois que je click sur ce button ajouter je dois afficher un nouveau composant de la fil ariane vide et stocker les données a chaque changement et balayage entres les composants de la file dans un tableau dynamique qui prends chaque changement d'un champs de la formulaire associé à la file aidez moi a modifier ce code
<div class="col-auto">
          <button class="btn btn-primary btn-sm " (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement  <img src="../../../assets/icons/plus.svg" /></button>

      </div>

objetsFinancements: any[] = [
		// Vos objets de financement ici
	  ];
	 
	
	  ajouterObjetFinancement() {
		const nouvelObjet = {
		  selectedFamilleObjet: '',
		  familleObjetText: '',
		  selectedObjetFinancement: '',
		  objetFinance: '',
		  prixAquisitionBien: '',
		  dateDepot: '',
		  selectedType: '',
		  montantLclFinance: '',
		  normeThermique: '',
		  selectedNatBatiment: '',
		  partLcl: '',
		  SirenDPE: '',
		  addresseBien: '',
		  addresseBienCodePostal: '',
		  addresseBienVille: '',
		  codeBatimentSelected: '',
		  numeroDpeAdeme: '',
		  hideFieldForm: false,
		  presenceFamilleObjet: false,
		  presenceObjet: false,
		  hiddenObjetfinancement: false
		};
		this.objetsFinancement.push(nouvelObjet);
	  }
	

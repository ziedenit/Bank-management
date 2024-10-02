recalculerAlignment() {
			this.postDisabled=true;
			if (!this.alertDisplayed) { 
			  alert("Merci de calculer l'alignement suite à ce changement.");
			  this.alertDisplayed = true; 
			}
		  }

  @Output() postDisabled : boolean;
  @Output() alertDisplayed : boolean; 

  postContinuer(): void {
    // Vérifiez si l'alignement a été recalculé
    if (!this.isAlignmentCalculated) {
      // Affichez le pop-up pour demander à l'utilisateur de recalculer l'alignement
      if (!this.alertDisplayed) {
        alert("Merci de recalculer l'alignement suite à ce changement.");
        this.alertDisplayed = true; // Marquez que l'alerte a été affichée
      }
      return; // Bloquez l'exécution de la méthode
    }
//////
 showAlignement(): void {
    // Logique pour calculer l'alignement ici
    this.isAlignmentCalculated = true; // Indique que l'alignement a été recalculé
    this.alertDisplayed = false; // Réinitialiser le drapeau pour afficher à nouveau l'alerte si nécessaire
    console.log("Alignement recalculé.");
  }
//
recalculerAlignment(): void {
    // Appel de la méthode de recalcul d'alignement
    this.showAlignement(); // Appel de la méthode qui effectue le calcul d'alignement
  }

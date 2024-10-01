handleFieldChange() {
    if (!this.alertDisplayed) {
        alert("Merci de recalculer l'alignement suite à ce changement.");
        this.alertDisplayed = true; // Mettre à jour le drapeau pour éviter les futurs affichages
    }
}
///
resetAlertDisplay() {
    this.alertDisplayed = false;
}

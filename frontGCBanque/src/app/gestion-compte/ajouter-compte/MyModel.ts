export class VotreComponent {
  isPopUpShown: boolean = false; // Indicateur pour savoir si le pop-up a déjà été affiché

  // Autres propriétés ici...

  // Méthode pour afficher le pop-up
  showPopUp() {
    if (!this.isPopUpShown) {
      // Afficher le pop-up ici, par exemple avec un service de modal ou une simple alerte
      alert('Vous avez modifié une valeur.'); // Exemple d'alerte simple

      // Marquer que le pop-up a été affiché
      this.isPopUpShown = true;
    }
  }
}

monitorFieldChange(getFieldValue: () => any) {
  const initialValue = getFieldValue();

  return {
    unsubscribe: () => {}, // Méthode vide si vous n'utilisez pas d'abonnement réel
    // Lorsqu'il y a un changement, on affiche le pop-up une seule fois
    detectChange: () => {
      if (initialValue !== getFieldValue()) {
        // Appeler la méthode pour afficher le pop-up une seule fois
        this.showPopUp();
      }
    }
  };
}


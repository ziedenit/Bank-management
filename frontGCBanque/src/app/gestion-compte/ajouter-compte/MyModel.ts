// Supposons que vous avez une méthode pour obtenir un nouvel objet
getNewObjetFinancement() {
  let nouvelObjet: any = {}; // Remplacez 'any' par le type réel de votre objet

  // Appelez la méthode generateIdObjetFinancement et abonnez-vous pour obtenir l'ID
  this.idGeneratorService.generateIdObjetFinancement().subscribe(
    id => {
      nouvelObjet.idObjetFinancement = id; // Assignez l'ID à la propriété
      console.log('ID Objet Financement généré :', id);
      
      // Maintenant, vous pouvez utiliser `nouvelObjet` avec son `idObjetFinancement` assigné
    },
    error => {
      console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
      // Gérez l'erreur selon vos besoins
    }
  );

  // Si vous avez besoin de retourner `nouvelObjet`, vous devrez attendre l'assignation de l'ID.
  // Une façon de gérer cela pourrait être de retourner un Observable ou de gérer la logique après l'abonnement.
}

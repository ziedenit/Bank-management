/* Conteneur principal pour le démarrage */
.container-starter {
  margin-left: 50px;
  margin-top: 50px;
}

/* Titres h2 et h3 restent inchangés */
h2, h3 {
  text-align: left;
}

/* Titres h1 : modification pour la responsivité */
h1 {
  display: inline-block; /* Conserver inline pour l'effet initial */
  font-size: 2.5rem; /* Taille par défaut */
  white-space: nowrap; /* Empêcher le débordement du texte */
  overflow: hidden; /* Masquer les débordements */
  text-overflow: ellipsis; /* Ajouter des points de suspension si le texte déborde */
  max-width: 100%; /* Limiter la largeur pour éviter le débordement */
  text-align: center; /* Centrer le texte */
  transition: font-size 0.3s ease; /* Douce transition des tailles */
}

@media (max-width: 1200px) {
  h1 {
    font-size: 2rem; /* Diminuer la taille sur grand écran */
  }
}

@media (max-width: 992px) {
  h1 {
    font-size: 1.8rem; /* Taille réduite pour les tablettes */
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem; /* Taille réduite pour les petits écrans */
    white-space: normal; /* Autoriser le texte à passer sur plusieurs lignes */
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 1.2rem; /* Encore plus petit pour les écrans mobiles */
    white-space: normal; /* Texte sur plusieurs lignes si nécessaire */
  }
}

/* Ajustement pour les checkbox */
.check {
  height: 30px;
}
//

.container-starter {
  margin-left: 50px;
  margin-top: 50px;
}

.header {
  display: flex;
  align-items: center; /* Centre le contenu verticalement */
  justify-content: space-between; /* Espace entre le logo et le titre */
  flex-wrap: wrap; /* Permet au titre de passer à la ligne si nécessaire */
}

.header-title h1 {
  font-size: 4vw; /* Ajuste la taille du titre en fonction de l'écran */
  white-space: nowrap; /* Empêche le retour à la ligne */
  overflow: hidden; /* Cache le texte qui dépasse */
  text-overflow: ellipsis; /* Affiche "..." si le texte dépasse */
  max-width: 100%; /* Le titre ne dépassera pas la largeur de son conteneur */
  box-sizing: border-box; /* Inclut le padding et la bordure dans la largeur */
}

.header-logo img {
  max-width: 100%; /* Empêche le logo de déborder */
}

@media (max-width: 768px) {
  .header-title h1 {
    font-size: 6vw; /* Réduit la taille du titre sur les tablettes */
  }
}

@media (max-width: 480px) {
  .header-title h1 {
    font-size: 8vw; /* Encore plus petit pour les smartphones */
  }
}
///
.header-title {
  max-width: 80%; /* Limite l'espace disponible pour le titre */
}

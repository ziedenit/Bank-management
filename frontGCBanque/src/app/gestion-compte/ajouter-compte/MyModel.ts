.container-starter {
  margin-left: 50px;
  margin-top: 50px;
}

h1 {
  display: inline-block;
  font-size: 4vw; /* Taille réactive basée sur la largeur de l'écran */
  white-space: nowrap; /* Empêche le texte de passer à la ligne */
  overflow: hidden; /* Cache le débordement */
  text-overflow: ellipsis; /* Ajoute "..." si le texte est trop long */
}

h2, h3 {
  text-align: left;
}

.check {
  height: 30px;
}

/* Ajustements pour les petits écrans */
@media (max-width: 768px) {
  h1 {
    font-size: 6vw; /* Réduit la taille de la police sur les écrans plus petits */
  }
  
  .container-starter {
    margin-left: 20px; /* Réduit la marge pour de petits écrans */
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 8vw; /* Encore plus petite taille pour smartphones */
  }
}

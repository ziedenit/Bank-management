.container-starter {
  margin-left: 50px;
  margin-top: 50px;
}

h2, h3 {
  text-align: left;
}

h1 {
  display: inline-block;
  font-size: 3rem; /* Taille de base */
  max-width: 100%; /* Évite que le titre dépasse du conteneur */
  word-wrap: break-word; /* Permet le retour à la ligne si nécessaire */
}

.header-title {
  display: flex;
  justify-content: center; /* Centre le titre horizontalement */
  align-items: center; /* Centre le titre verticalement */
  text-align: center;
  margin: 0 auto;
}

.check {
  height: 30px;
}

/* Media queries pour différentes tailles d'écrans */
@media (max-width: 1200px) {
  h1 {
    font-size: 2.5rem; /* Pour les écrans larges */
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem; /* Pour les tablettes */
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem; /* Pour les petits écrans */
  }
}

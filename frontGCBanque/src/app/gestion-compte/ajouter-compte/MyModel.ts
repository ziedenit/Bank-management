
                    // Assigner le sirenDiagnostiqueur si disponible
                    if (sirenDiagnostiqueur) {
                        nouvelObjet.bien.dpeActuel.sirenDiagnostiqueur = sirenDiagnostiqueur;
                    }

                    // Vérifiez si dpeActuel existe dans l'objet existant
                    if (!this.objetsFinancements[0]?.bien?.dpeActuel) {
                        this.objetsFinancements[0].bien.dpeActuel = {}; // Initialiser dpeActuel si null
                    }

                    // Assigner la valeur de sirenDiagnostiqueur
                    this.objetsFinancements[0].bien.dpeActuel.sirenDiagnostiqueur = sirenDiagnostiqueur;

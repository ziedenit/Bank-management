  const currentObjet = this.objetsFinancements[this.selectedObjetIndex];

    if (!currentObjet) {
        console.error("currentObjet est indéfini");
        return;
    }

    if (!currentObjet.bien) {
        currentObjet.bien = {};
    }

    if (!currentObjet.bien.dpeActuel) {
        currentObjet.bien.dpeActuel = {};
    }

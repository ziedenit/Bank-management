const bien = currentObject.bien;

    // Ensure dpeActuel exists, initialize if necessary
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    }

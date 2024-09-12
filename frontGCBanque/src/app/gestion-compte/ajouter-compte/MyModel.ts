// Déclare une map pour stocker les clics par index
const clickCounts: Map<number, number> = new Map();

function onBreadcrumbClick(index: number) {
    // Vérifie si l'index existe déjà dans la map
    if (clickCounts.has(index)) {
        // Si oui, incrémente le nombre de clics pour cet index
        const currentCount = clickCounts.get(index)!; // On sait que la valeur existe, on peut utiliser "!" pour éviter undefined
        clickCounts.set(index, currentCount + 1);
    } else {
        // Si non, initialise le compteur de cet index à 1
        clickCounts.set(index, 1);
    }

    // Affiche le nombre de clics pour l'index actuel (facultatif)
    console.log(`Index ${index} a été cliqué ${clickCounts.get(index)} fois.`);
}

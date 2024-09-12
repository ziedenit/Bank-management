// Déclare une map GLOBALEMENT pour stocker les clics par index
const clickCounts: Map<number, number> = new Map();

function onBreadcrumbClick(index: number) {
    // Vérifie si l'index existe déjà dans la map
    if (clickCounts.has(index)) {
        // Si oui, incrémente le nombre de clics pour cet index
        const currentCount = clickCounts.get(index)!;
        clickCounts.set(index, currentCount + 1);
    } else {
        // Si non, initialise le compteur de cet index à 1
        clickCounts.set(index, 1);
    }

    // Affiche le nombre de clics pour l'index actuel
    console.log(`Index ${index} a été cliqué ${clickCounts.get(index)} fois.`);
}

// Exemple d'appels pour tester
onBreadcrumbClick(1); // Devrait dire "Index 1 a été cliqué 1 fois."
onBreadcrumbClick(1); // Devrait dire "Index 1 a été cliqué 2 fois."
onBreadcrumbClick(2); // Devrait dire "Index 2 a été cliqué 1 fois."
onBreadcrumbClick(1); // Devrait dire "Index 1 a été cliqué 3 fois."

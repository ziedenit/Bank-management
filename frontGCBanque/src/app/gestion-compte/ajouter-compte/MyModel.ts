const allObjects = this.objetsFinancements.length;
const missingIndexes = [];

for (let i = 0; i < allObjects; i++) {
    if (!this.calculedAlignementIndexObjects.includes(i)) {
        missingIndexes.push(i + 1);
    }
}

let message = '';
if (missingIndexes.length > 0) {
    message = `Les indices non inclus dans calculedAlignementIndexObjects sont : `;
    missingIndexes.forEach((index, i) => {
        message += `indice (${index})`;
        if (i < missingIndexes.length - 1) {
            message += ' , '; // Add comma and space for separation
        }
    });
} else {
    message = "Tous les indices sont inclus dans calculedAlignementIndexObjects.";
}

// Now you can bind this `message` variable to your HTML
console.log(message);

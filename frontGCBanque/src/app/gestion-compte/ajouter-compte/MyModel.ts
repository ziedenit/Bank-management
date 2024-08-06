this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
manuallyAddedIndices: number[] = [];  
*ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)" 

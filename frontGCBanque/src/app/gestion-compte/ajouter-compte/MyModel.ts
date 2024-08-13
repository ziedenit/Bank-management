import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {

  selectedType: string;
  hideFieldForm: boolean;
  selectedNatBatiment: string;
  codeBatimentSelected: string;
  partLcl: number;
  montantLclFinance: number;
  prixAquisitionBien: number;
  dateDepot: string;
  normeThermique: string;
  SirenDPE: string;
  numeroDpeAdeme: string;
  DpeResults: boolean;
  alignementResultText: string;

  private eligibleDpeMapping = {}; // Assurez-vous que ces mappings sont bien définis
  private etatBienMapping = {};
  private codeBatimentMapping = {};
  private codeNormeThermiqueMapping = {};
  private alignementMapping = {};

  private setObjetFinancementProperties(objetFinancement: any): void {
    switch (objetFinancement.codeObjetFinancement) {
      case "02":
        this.objetFinance = "Acquisition de bâtiment";
        break;
      case "03":
        this.objetFinance = "Rénovation de bâtiment";
        this.depExist = true;
        break;
      default:
        break;
    }

    if (!objetFinancement || !objetFinancement.bien) return;

    let bien = { ...objetFinancement.bien }; // Cloner l'objet

    if (bien.eligibleDpe) {
      this.selectedType = this.eligibleDpeMapping[bien.eligibleDpe].type;
      this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;
      this.watchPropertyChanges(bien, 'eligibleDpe', (newValue) => {
        this.selectedType = this.eligibleDpeMapping[newValue].type;
        this.hideFieldForm = this.eligibleDpeMapping[newValue].hideFieldForm;
        bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
      });
    }

    if (bien.etatBien) {
      this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
      this.watchPropertyChanges(bien, 'etatBien', (newValue) => {
        this.selectedNatBatiment = this.etatBienMapping[newValue];
        bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
      });
    }

    if (bien.codeBatiment) {
      this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
      this.watchPropertyChanges(bien, 'codeBatiment', (newValue) => {
        this.codeBatimentSelected = this.codeBatimentMapping[newValue];
        bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
      });
    }

    this.partLcl = bien.partLCL;
    this.watchPropertyChanges(bien, 'partLCL', (newValue) => {
      this.partLcl = newValue;
      bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
    });

    this.montantLclFinance = bien.montantFinanceLCL;
    this.watchPropertyChanges(bien, 'montantFinanceLCL', (newValue) => {
      this.montantLclFinance = newValue;
      bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
    });

    this.prixAquisitionBien = bien.prixBien;
    this.watchPropertyChanges(bien, 'prixBien', (newValue) => {
      this.prixAquisitionBien = newValue;
      bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
    });

    this.dateDepot = bien.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
    this.watchPropertyChanges(bien, 'dateDepotPc', (newValue) => {
      this.dateDepot = newValue ? formatDate(newValue, 'yyyy-MM-dd', "en-US") : undefined;
      bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
    });

    if (bien.codeNormeThermique) {
      this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];
      this.watchPropertyChanges(bien, 'codeNormeThermique', (newValue) => {
        this.normeThermique = this.codeNormeThermiqueMapping[newValue];
        bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
      });
    }

    if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) {
      this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
      this.watchPropertyChanges(bien.dpeActuel, 'sirenDiagnostiqueur', (newValue) => {
        this.SirenDPE = newValue;
        bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
      });
    }

    this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
    this.watchPropertyChanges(bien.dpeActuel, 'numeroDpe', (newValue) => {
      this.numeroDpeAdeme = newValue;
      bien = { ...bien }; // Cloner à nouveau pour forcer la détection de changement
    });

    if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
      this.DpeResults = true;
      this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];
      this.watchPropertyChanges(objetFinancement.alignement, 'topAlignement', (newValue) => {
        this.alignementResultText = this.alignementMapping[newValue];
        objetFinancement.alignement = { ...objetFinancement.alignement }; // Cloner pour forcer la détection
      });
    }

    // Réassigner l'objet cloné à l'original
    objetFinancement.bien = bien;
  }

  // Méthode pour surveiller les changements de propriété
  private watchPropertyChanges(obj: any, prop: string, callback: (newValue: any) => void): void {
    let value = obj[prop];
    Object.defineProperty(obj, prop, {
      get: () => value,
      set: (newValue) => {
        if (value !== newValue) {
          value = newValue;
          callback(newValue);
        }
      },
      enumerable: true,
      configurable: true,
    });
  }
}

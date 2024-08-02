private _prixAquisitionBien: number = 0;
  objetsFinancements: { quotePartObjet: number }[] = [{ quotePartObjet: 0 }];
  selectedObjetIndex: number = 0;
  hideFieldForm: boolean = false;
  isFieldsDisabled: boolean = false;

  // Getter pour prixAquisitionBien
  get prixAquisitionBien(): number {
    return this._prixAquisitionBien;
  }

  // Setter pour prixAquisitionBien
  set prixAquisitionBien(value: number) {
    this._prixAquisitionBien = value;
    if (this.objetsFinancements[this.selectedObjetIndex]) {
      this.objetsFinancements[this.selectedObjetIndex].quotePartObjet = value;
    }
  }

  // Getter pour quotePartObjet
  get quotePartObjet(): number {
    return this.objetsFinancements[this.selectedObjetIndex]?.quotePartObjet || 0;
  }

  // Setter pour quotePartObjet
  set quotePartObjet(value: number) {
    if (this.objetsFinancements[this.selectedObjetIndex]) {
      this.objetsFinancements[this.selectedObjetIndex].quotePartObjet = value;
      this._prixAquisitionBien = value;
    }
  }

  // Méthode pour gérer les changements de prix
  onPriceChange(newValue: number): void {
    this.prixAquisitionBien = newValue;
  }

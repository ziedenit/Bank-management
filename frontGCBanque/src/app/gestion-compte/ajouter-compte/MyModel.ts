import { Component, OnInit } from '@angular/core';
import { FinancementService } from './financement.service';
import { ObjetFinancement } from './objet-financement.model';

@Component({
  selector: 'app-financement',
  templateUrl: './financement.component.html',
  styleUrls: ['./financement.component.css']
})
export class FinancementComponent implements OnInit {
  objetsDeFinancement: ObjetFinancement[] = [];
  selectedObjetFinancement: ObjetFinancement | null = null;
  hiddenObjetfinancement = false;

  constructor(private financementService: FinancementService) { }

  ngOnInit(): void {
    this.loadObjetsFinancement('someId'); // Remplacez 'someId' par l'ID réel
  }

  loadObjetsFinancement(id: string) {
    this.financementService.getListObjetFinancementbyId(id).subscribe(
      (data: ObjetFinancement[]) => {
        this.objetsDeFinancement = data;
        if (this.objetsDeFinancement.length > 0) {
          this.selectedObjetFinancement = this.objetsDeFinancement[0];
        }
      },
      (error) => {
        console.error('Error loading objets de financement', error);
      }
    );
  }

  selectObjetFinancement(objet: ObjetFinancement) {
    this.selectedObjetFinancement = objet;
  }

  toggleObjetFinancement() {
    this.hiddenObjetfinancement = !this.hiddenObjetfinancement;
  }

  ajouterObjetFinancement() {
    const newObjet: ObjetFinancement = {
      idObjetFinancement: '',
      codeObjetFinancement: '',
      quotePartObjet: 0,
      gainCEP: 0,
      dateFinTravaux: new Date(),
      bien: new Bien(),
      dpeAvantTravaux: new Dpe(),
      dpeApresTravaux: new Dpe(),
      alignement: new Alignement(),
      eligibilite: new Eligibilite(),
      piecesJustificatives: [],
      codeFamilleObjet: '',
      garantie: []
    };
    this.objetsDeFinancement.push(newObjet);
    this.selectObjetFinancement(newObjet);
  }
}

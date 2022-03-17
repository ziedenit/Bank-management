import { CompteService } from './../../services/compte.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { compte } from 'src/app/models/compte';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-modifier-compte',
  templateUrl: './modifier-compte.component.html',
  styleUrls: ['./modifier-compte.component.css']
})
export class ModifierCompteComponent implements OnInit {
  idcmp: string;



  cptForm = new FormGroup({
  idcompe:new FormControl(),
  type:new FormControl(),
  solde:new FormControl(),
    rib: new FormControl(),
    datecreation: new FormControl(),
    numerocarte: new FormControl(),
    utilisateur:new FormControl(),


  })
  typecompte: { label: string; value: string; }[];
  utilisateurs:any


  constructor(private route: ActivatedRoute, private compteService: CompteService,private Us:UtilisateurService) { }

  ngOnInit() {

    this.typecompte = [

      {label:'Epargne', value:'Epargne'},
      {label:'Courant', value:'Courant'}
    ];

    this.Us.getAllUtilisateur().subscribe(resultat=>{this.utilisateurs=resultat});

    this.idcmp = this.route.snapshot.paramMap.get("id");
    this.compteService.getcomptebyID(this.idcmp).subscribe(resultat => {
      console.log(resultat)
      this.cptForm.setValue(resultat)
    });

  }
  updateCompte() {
      this.compteService.ajoutercompte(this.cptForm.value).subscribe();
      console.log(this.cptForm.value);

  }
}

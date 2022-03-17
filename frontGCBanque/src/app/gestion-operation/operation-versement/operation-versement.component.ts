import { OperationService } from 'src/app/services/operation.service';
import { CompteService } from './../../services/compte.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { compte } from 'src/app/models/compte';

@Component({
  selector: 'app-operation-versement',
  templateUrl: './operation-versement.component.html',
  styleUrls: ['./operation-versement.component.css']
})
export class OperationVersementComponent implements OnInit {
  cptrib: compte;
  idcpt: number;
  operation: any;

  constructor(private Cs:CompteService,private Os:OperationService) { }

  ngOnInit() {
  }

  verser(verForm: NgForm) {
    verForm.value.dateoperation=new Date();
    // ((resultat: Utilisateur[]) => { this.utilisateurs = resultat })
    this.Cs.getComptebyRIB(verForm.value.rib).subscribe((resultat:compte) =>{



      this.cptrib = resultat
     /*  console.log(this.cpt) */
      this.idcpt = this.cptrib.idcompe;
      console.log(this.idcpt);
      this.Os.verser(this.idcpt,verForm.value.montant).subscribe(res=>{this.operation=res})
      // console.log(retForm.value.montant); */
    });


  }



}

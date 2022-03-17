import { NgForm } from '@angular/forms';
import { CompteService } from './../../services/compte.service';
import { Component, OnInit } from '@angular/core';

import { compte } from 'src/app/models/compte';
import { OperationService } from 'src/app/services/operation.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-operation-virement',
  templateUrl: './operation-virement.component.html',
  styleUrls: ['./operation-virement.component.css'],
  providers: [MessageService]
})
export class OperationVirementComponent implements OnInit {
  cptemeteur: any;
  idcptemeteur: any;
  cptrecepteur: any;
  idcptrecepteur: any;

  constructor(private Cs: CompteService,private Os: OperationService,private messageService: MessageService) { }


vir:any;
  ngOnInit() {


  }



  virement(retForm: NgForm) {

    this.Cs.getComptebyRIB(retForm.value.rib1).subscribe((resultat: compte) => {



      this.cptemeteur = resultat;
      /*  console.log(this.cpt) */
      this.idcptemeteur = this.cptemeteur.idcompe;
      this.Cs.getComptebyRIB(retForm.value.rib2).subscribe((resultat: compte) => {



        this.cptrecepteur = resultat
        /*  console.log(this.cpt) */
        this.idcptrecepteur = this.cptrecepteur.idcompe;
        this.Os.virement(this.idcptemeteur,this.idcptrecepteur,retForm.value.montant).subscribe(res=>{this.vir=res});
        this.showSuccess();
      });

    });











    }
    showSuccess() {
      this.messageService.add({severity:'success', summary: '', detail:'virement effectué avec succes'});
  }
}

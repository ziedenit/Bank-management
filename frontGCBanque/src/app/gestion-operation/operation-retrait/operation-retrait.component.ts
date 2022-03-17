
import { Operation } from './../../models/operation';
import { CompteService } from './../../services/compte.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { CssSelector, CompileEntryComponentMetadata } from '@angular/compiler';
import { compte } from 'src/app/models/compte';
import { OperationService } from 'src/app/services/operation.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-operation-retrait',
  templateUrl: './operation-retrait.component.html',
  styleUrls: ['./operation-retrait.component.css'],
  providers: [MessageService]
})

export class OperationRetraitComponent implements OnInit {

 // private notify: AlertComponentComponent;
  typeoperation: any;
  selectedOperation: any;
  cpt: any;
  idcpt: any;
  operation: any;
  cptrib:compte;
  resultat: any;
  res: any;

  constructor(private Cs: CompteService, private So: OperationService, private messageService: MessageService) { }

  ngOnInit() {



    this.typeoperation = [

      { label: 'retrait', value: 'retrait' },
      { label: 'versement', value: 'versement' }
    ];
  }




  retrait(retForm: NgForm) {
    retForm.value.dateoperation=new Date();
    // ((resultat: Utilisateur[]) => { this.utilisateurs = resultat })
    this.Cs.getComptebyRIB(retForm.value.rib).subscribe((resultat:compte) =>{



      this.cptrib = resultat
     /*  console.log(this.cpt) */
      this.idcpt = this.cptrib.idcompe;
     // console.log(this.idcpt);
      this.So.retirer(this.idcpt,retForm.value.montant).subscribe(res=>{this.operation=res})

     /*  if (this.res===null)
      {
       // this.notify.showDialog();
        this.showError();
        //console.log("retrait impossible solde insuffisant");
      } */

        //this.showSuccess();
        //console.log("retrait effectuté avec success");

      // console.log(retForm.value.montant); */
    });
     //this.cpt=this.resultat;
    // console.log(this.idcpt);
      /* if(this.cptrib!=null)
      {
       this.So.retirer(this.idcpt,retForm.value.montant).subscribe(res=>{this.operation=res})
     } */


  }

  showError() {
    this.messageService.add({severity:'error', summary: '', detail:'Solde insuffisant retrait impossible'});
}
showSuccess() {
  this.messageService.add({severity:'success', summary: '', detail:'retrait effectué avec succes'});
}


}

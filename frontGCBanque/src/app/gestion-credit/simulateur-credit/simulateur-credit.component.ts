import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { NgForm, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-simulateur-credit',
  templateUrl: './simulateur-credit.component.html',
  styleUrls: ['./simulateur-credit.component.css']
})
export class SimulateurCreditComponent implements OnInit {



   creditForm = new FormGroup({

    montant: new FormControl(),
    duree: new FormControl(),
    mensualite:new FormControl(),

  })
  constructor(private us: UtilisateurService) { }

  ngOnInit() {


  }
  mensualite(creditForm:FormGroup) {

    this.us.demandecredit(creditForm.value).subscribe(resultat=>{
      this.creditForm.setValue(resultat)});
        console.log(creditForm.value);

  }
  demandecredit(demandeForm:NgForm)
  {


  }

}

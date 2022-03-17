import { HttpClient } from '@angular/common/http';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit {
  typeM:any
  selectedtype:String
  constructor(private us:UtilisateurService) { }

  ngOnInit() {
    this.typeM=[
      { label:'client',value:'Client'},

      {label:'agent',value:'Agent'}
     ];

  }

  onFormSubmit(userForm:NgForm)
  {
    console.log( userForm.value.type);
    userForm.value.type=this.selectedtype;
    console.log(userForm.value)
    this.us.ajouterutlisateur(userForm.value).subscribe(res=>{
      userForm.resetForm();
    });
  }

  resetUserForm(userForm:NgForm)
  {
     userForm.resetForm();
  }



}


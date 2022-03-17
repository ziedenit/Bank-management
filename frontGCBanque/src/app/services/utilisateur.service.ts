import { credit } from './../models/credit';
import { Utilisateur } from './../models/utilisateur';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { compte } from '../models/compte';



@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url='http://localhost:8080/user/';
  url2='http://localhost:8080/Credit/';
  url3='http://localhost:8080/compte/';
  constructor(private http: HttpClient) { }
 /*  getAllUtilisateur(){
    return this.http.get(this.url+"touUtil");
  } */
  getAllUtilisateur() {
    return this.http.get(this.url+"touUtil");
  }


ajouterutlisateur(user:Utilisateur)

{
   return this.http.post(this.url+"ajouMod",user);
}

supprimerutlisateur(idUser)
{
   return this.http.delete(this.url+"suppUser/"+idUser);
}

getbyid(idUser)
{
  return this.http.get(this.url+"recherUser/"+idUser);
}
demandecredit(credit:credit)

{
   return this.http.post(this.url2+"simulateur",credit);
}
geUserByCin(cin)
{
    return this.http.get(this.url+"ParCIN/"+cin);
}


}

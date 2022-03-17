import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compte } from '../models/compte';
@Injectable({
  providedIn: 'root'
})
export class CompteService {
  url3='http://localhost:8080/compte/';




  constructor(private http: HttpClient) { }

  getlistCompte()
  {
     return this.http.get(this.url3+"toutesComptes");
  }
  getComptebyRIB(rib)
  {
    return this.http.get(this.url3+"recherchebyRIB/"+rib);
  }
  ajoutercompte(compte:compte)
  {
      return this.http.post(this.url3+"creerCompte",compte);
  }
  supprimerCompte(idCompte)
  {
     return this.http.delete(this.url3+"suppCompte/"+idCompte);
  }
  getcomptebyID(idcompe)
  {
    return this.http.get(this.url3+"getCompte/"+idcompe);
  }


}

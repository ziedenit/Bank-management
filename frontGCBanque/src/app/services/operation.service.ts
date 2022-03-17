
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  url='http://localhost:8080/operation/';

  constructor(private http: HttpClient) { }


listeOperation()

{

  return this.http.get(this.url+"operations");

}



  retirer(id,montant)
  {
    //retrait?id=34&montant=1000
    return this.http.get(this.url+"retrait?id="+id+"&montant="+montant);
  }
  verser(id,montant)
  {
    return this.http.get(this.url+"versement/"+id+"/"+montant);
  }

   virement(idCompteRetrait,idCompteVersement,montant)

   {

 return this.http.get(this.url+"virement/"+idCompteRetrait+"/"+idCompteVersement+"/"+montant);

   }


}

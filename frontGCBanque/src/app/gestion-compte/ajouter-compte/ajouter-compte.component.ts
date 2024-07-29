import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjetFinancement } from '../model/objetFinancement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiObjetService {
  private financementURL = `http://localhost:8081/api/v1/financement/listObjetFinancement/`;
  idFinancement : string []
    constructor(private http: HttpClient) {}
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('user1:user1Pass')
      })
    };
   
   
    getListeObjetsFinancement(idFinancement: string): Observable<ObjetFinancement[]> {
      return this.http.get<ObjetFinancement[]>(this.financementURL+idFinancement,this.httpOptions);
    }
  }
   


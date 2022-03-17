import { UtilisateurService } from './../../services/utilisateur.service';
import { Utilisateur } from './../../models/utilisateur';
import {SelectItem} from 'primeng/api';

export class MyModel {

    utilisateurs: SelectItem[];

    selectedutlisateur: string;



    constructor(private Us:UtilisateurService) {
         this.Us.getAllUtilisateur().subscribe(resultat=>this.utilisateurs);


    }
}

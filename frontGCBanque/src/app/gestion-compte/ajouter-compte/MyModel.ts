Maintenant j'ai ce service qui permet de recupere la liste des objets financement a afficher et je veux a chaque fois ou je point sur un service j'afficher sur le formulaire
les données du objet financement et les objets imbriqué
getListObjetFinancementbyId(id: string): Observable<Array<ObjetFinancement>> {
    return this.http.get<Array<ObjetFinancement>>(this.financementURL+id,this.httpOptions);
  }
le model est le suivant 

export class ObjetFinancement {

    idObjetFinancement:string;
	codeObjetFinancement:string;// 02=Acquisition  03=Travaux
	quotePartObjet:number;
	gainCEP:number;
	dateFinTravaux: Date;
	bien:Bien;
	dpeAvantTravaux: Dpe;
	dpeApresTravaux: Dpe;
	alignement: Alignement;
    eligibilite: Eligibilite;
	piecesJustificatives : Piece [] ;
	codeFamilleObjet: string;	
	garantie: Garantie[]; 

}
//
import { Dpe } from './dpe';
export class Bien {
    idBien:string;
    codeBatiment:string;
    codeNormeThermique:string;
    typeBatiment:string;
    codePostal:string;
    nomCommune:string;
    adresseComplete:string;
    anneeConstruction:string;
    dateDepotPc:string;
    surfaceBien:number;
    bienFinanceLCL:boolean;
    dpeActuel:Dpe;
    etatBien:string;
    numeroVoie:string;
    nomRue:string;
    prixBien: number;
    montantFinanceLCL:number;
    partLCL:number;
    typeUsage:string;
    numeroNomRue:string;

    typeEnergie:string;
    batiment:string;
    escalier:string;
    etage: string;
    porte:string;

    typeVoie:string;
    codeDepartement:string;
    codeInseeCommune:string;
    numeroLot:string;
    periodeConstruction:string;
    coordonneeCartographiqueX:number;
    coordonneeCartographiqueY:number;
    dateDebutConstruction:Date;

    eligibleDpe:string;









}

// la code actuel traite un seul objet je veux que le modifier pour traiter l'ensemble des objets financement recuperer et chaque selection d'objet de la file 
je sette les valeur en TS et je les affiches sur le formulaire 








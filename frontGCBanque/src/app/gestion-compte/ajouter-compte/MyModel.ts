import { Alignement } from './alignement';
import { Bien } from './bien';
import { Dpe } from './dpe';
import { Eligibilite } from './eligibilite';
import {  Piece } from './piece';
import {  Garantie } from './garantie';

export class ObjetFinancement {
	[x: string]: any;

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
	firstDisconnectionOfd:boolean;

}

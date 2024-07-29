import { Alignement } from './alignement';
import { Eligibilite } from './eligibilite';
import { Intervenant } from './intervenant';
import { ObjetFinancement } from './objetFinancement';


export class Financement {

idFinancement: string;
objetFinancement: ObjetFinancement[] ;
alignement: Alignement;
eligibilite: Eligibilite;

intervenant: Intervenant;
indicateurFinancementDedie:string;
indicateurNatureDurable:string;
typeRisqueClimatiqueAttenue:string;

codeApplicatifOrigine: string;
indicateurReprise: boolean;
statut: number ;
agenceCompte:string;


}
<div class="container-fluid">
    <!-- File d'Ariane pour les objets de financement -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" *ngFor="let objet of objetsFinancements; let i = index">
          <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i,objet)">Objet de financement {{ i + 1 }}</a>
        </li>
      </ol>
    </nav>
</div>
  ²

  ngOnInit(): void {
    this.idFinancement = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];
 
    if (this.Url_Retour_Base64) {this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);}
 
 
    this.multiObjetService.getListeObjetsFinancement(this.idFinancement).subscribe(objets => {
      this.objetsFinancements = objets;
      console.log(objets)
      this.addListOfReceivedObjets(objets
      )
    });
   
  }

 removeBreadcrumbItem(index: number) {
			this.objetsFinancements.splice(index, 1);
			if(this.objetsFinancements.length>=1)
				{
					this.ajoutFinancementDisabled=false;
				}
			this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
		  }

j'ai cette fonction qui s'appplique pour suprimmer un objet de fil ariane 
<nav aria-label="breadcrumb" class="breadcrumb-nav" >
    <ol class="breadcrumb-custom" >
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index" >
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
         <span>Objet de financement</span>  {{ i + 1 }}
        </a>
        <button class="close-btn" *ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)"(click)="removeBreadcrumbItem(i)">x</button>
      </li>
    </ol>
    <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()"  [disabled]="ajoutFinancementDisabled " title="Merci de calculer l'alignement pour chaque objet ajouté à la liste" >Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
    je veux ajouter un pop angular et non pas en JS up en clicant sur ce button pour avertir avec le message etes vous sur de supprimer 

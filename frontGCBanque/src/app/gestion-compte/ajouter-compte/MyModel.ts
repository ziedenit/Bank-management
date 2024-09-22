<div class="container-fluid" >
    <div class="resultats"  >  
      <div  class="blocResults">
        <img *ngIf="hiddenResults==false" src="../../../assets/icons/arrow-up.svg"  (click)="hideDataResults()"  alt="Fleche haut"  /> 
         &nbsp; <img *ngIf="hiddenResults==true" src="../../../assets/icons/arrow-down.svg"  alt="Flèche bas" (click)="showDataResults()"/>  &nbsp;
        <h3 class="d-inline-block font-weight-bold" style="margin-top: 14px;  font-size: 17px; font-weight:bold; "> Résultats</h3>
      </div >
  
      <div *ngIf="elementResults==true" >
       <div *ngIf="selectedType !== 'option1'" class="erreurMessageResultat">
       <p style="font-size: 16px; padding-top: 5px; padding-bottom: 5px; font-weight: 500;">
       <img src="../../../assets/icons/alerte.png" class="imageErreur" style="padding-bottom: 2px;" alt="image flèche haut" >Financement non éligible à la Taxonomie</p>
      </div>
   
    <div *ngIf="DpeResults && hideFieldForm==false && showBlocResult==true" >  
   
      <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: -25px;" >
        <img src="../../../assets/images/help.png"  alt="image help" style="width:20px; height: 25px; margin-left: 25px;"
             matTooltip="Chaque objet de financement est associé à un arbre de décision. Cet arbre de décision permet de déterminer le caractère aligné 
             de l’objet, c’est-à-dire s’il est vert au sens de la réglementation « Taxonomie », en fonction des données qui ont été renseignées pour cet objet.">
      </div>
    
       <div class="ResultatVert" style="font-weight: 500; font-size: 15px;  ">
        <!-- <img src="../../../assets/icons/coche.png" style="width:20px; height: 20px; margin-right: 16px; margin-left: 10px;"> -->
        <span [style.color]="getColorBasedOnMessage(alignementResultText)"  style="margin-left: 10px;">
         {{ alignementResultText }} 
        </span>
      </div>
  
        <div [hidden]="!champObligatoire" style="font-weight: 500;" >
          <div class="Resultatrougee" >
          &nbsp; <img  *ngIf="donneeObligatoire" src="../../../assets/icons/alerte.png" class="imageErreur" alt="image alerte">
          &nbsp;    {{donneeObligatoire}} 
        </div>
         </div>
         
        <div class='textblock' style="font-weight: 500;">
          <div *ngIf="errorDpeMessage" >
            <div class="Resultatrouge">
          &nbsp; <img   src="../../../assets/icons/alerte.png" class="imageErreur" alt="image alerte" >
          &nbsp; {{errorDpeMessage }}</div>
        </div> 
        
        <div *ngIf="errorNormeThermiqueMessage" >
          <div class="Resultatrouge">
          &nbsp; <img src="../../../assets/icons/alerte.png" class="imageErreur" alt="image alerte" >
          &nbsp;   {{errorNormeThermiqueMessage }} </div>
        </div>
    
        <div *ngIf="errorDateDepotMessage" >
        <div class="Resultatrouge">
          &nbsp; <img  src="../../../assets/icons/alerte.png" class="imageErreur"  alt="image alerte" >
          &nbsp;  {{errorDateDepotMessage}}</div>
        </div>
        </div>
        </div>
        </div>  
        </div>
        </div>

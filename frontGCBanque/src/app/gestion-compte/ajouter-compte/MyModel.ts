<div class="container-fluid" >
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end">
        <button (click)="showAlignement()"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" >Continuer</button>
      </div>
      </div>           
</div>

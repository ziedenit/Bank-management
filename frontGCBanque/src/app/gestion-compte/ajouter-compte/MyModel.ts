<div class="container-fluid">
    <div class="footer">
        <div class="ButtonsFooter" style="display: flex; justify-content: space-between; align-items: center;">
            <!-- Ajoutez cet élément pour afficher le message avec les classes conditionnelles -->
            <span 
                *ngIf="message" 
                [ngClass]="{'message-red': message.includes('Les indices non inclus'), 'message-green': !message.includes('Les indices non inclus')}" 
                style="margin-right: auto;">
                {{ message }}
            </span>
            
            <div style="display: flex;">
                <button (click)="showAlignement()" mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
                &nbsp;
                <button mat-raised-button color="primary" (click)="postContinuer()">Continuer</button>
            </div>
        </div>
    </div>           
</div>

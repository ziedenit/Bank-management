<div *ngIf="showConfirmDialog" class="confirm-dialog">
  <div class="confirm-dialog-content">
    <p>Êtes-vous sûr de vouloir supprimer cet objet de financement ?</p>
    <button mat-raised-button color="primary" class="confirm-btn" (click)="confirmDelete(true)">Oui</button>
    <button mat-raised-button color="warn" class="confirm-btn" (click)="confirmDelete(false)">Non</button>
  </div>
</div>
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.confirm-btn {
  margin: 0 10px;
  min-width: 100px; /* Pour que les boutons ne soient pas trop petits */
  font-size: 16px; /* Ajuster la taille du texte */
}

p {
  margin-bottom: 20px; /* Ajouter de l'espace entre le texte et les boutons */
}

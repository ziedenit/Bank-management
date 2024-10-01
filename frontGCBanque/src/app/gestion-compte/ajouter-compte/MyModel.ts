disableContinuerButton()
		{

		}


   <div class="col-lg-4">
              <div class="form-group" *ngIf="hideFieldForm==false">
                  <div class="custom-label">
                      <label for="dateDepot">Date de dépôt de permis de construire <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                      <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot" placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" (change)="checkDate()" (ngModelChange)="disableContinuerButton()" />
                  </div>
              </div>
          </div>

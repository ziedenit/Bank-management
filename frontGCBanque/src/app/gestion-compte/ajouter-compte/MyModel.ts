constructor (private validationService: ValidationService,private idGeneratorService :IdGeneratorService,private multiObjetService: MultiObjetService,private fb:FormBuilder,private financementService:FinancementService,
private engineService: EngineService,private engineServiceXtra: EngineXtraService, private adresseService: AdresseService,
private patchFinancementService: PatchFinancement,private route: ActivatedRoute,private router :Router,private sirenValidator: SirenValidatorService )

 {
	this.formGroup = this.fb.group({
		numeroNomRue :[''] ,
		codePostal : [''],
        ville : [''],
		dateDiangnostique: [null],
		anneeConstruction: ['', [Validators.required, this.validationService.dateInferieureAujourdhuiValidator()]],
		typeBatiment: [null],
		lettreCEP: [null],
		lettreGES: [null],
		surfaceBien: [null],
		valeurCep: [null],
		valeurGes: [null],
		energieType:[null]
	  });
	}

j'ai ce form groupe declaré en constcuteur avec un validateur sur anneConstruction

et j'ai ce champs a valider dans le formulaire une extrait ci bas du service et du formulaire c'est form group 
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  dateInferieureAujourdhuiValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Log the control value for debugging
      console.log('Control value:', value);

      // Ensure the value is a string and trim any whitespace
      if (typeof value !== 'string') {
        return null; // If not a string, skip validation
      }

      const trimmedValue = value.trim();
      const currentYear = new Date().getFullYear();
      const inputYear = parseInt(trimmedValue, 10);

      // Log the parsed value and current year
      console.log('Parsed year:', inputYear);
      console.log('Current year:', currentYear);

      if (isNaN(inputYear) || inputYear > currentYear) {
        // Clear the field if the year is in the future or invalid
        control.setValue('');
        return { invalidDate: true };
      }

      return null;
    };
  }
}
  <div class="col-lg-3 col-md-6" >
                       
                        <label for="anneeConstruction" class="d-block dpeLabel">Année de construction  <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label>
                       
                        <input type="text" id="anneeConstruction"  formControlName="anneeConstruction" name="anneeConstruction" class="form-control">
                        <div *ngIf="formGroup.get('anneeConstruction').hasError('invalidDate')"  class="text-danger">
                          L'année de construction doit être antérieure à la date du jour.
                        </div>
                      </div>
mon probleme est qu'il rentre en boucle infini lors du lancement du composant 
  Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
validation.service.ts:16 Control value: 
validation.service.ts:28 Parsed year: NaN
validation.service.ts:29 Current year: 2024
core.js:5980  ERROR RangeError: Maximum call stack size exceeded
    at required (validators.ts:199:3)
    at validators.ts:513:38
    at Array.map (<anonymous>)
    at executeValidators (validators.ts:513:21)
    at FormControl._composedValidatorFn (validators.ts:457:26)
    at FormControl._runValidator (model.ts:764:34)
    at FormControl.updateValueAndValidity (model.ts:735:65)
    at FormControl.setValue (model.ts:1197:10)
    at validation.service.ts:33:17
    at validators.ts:513:38

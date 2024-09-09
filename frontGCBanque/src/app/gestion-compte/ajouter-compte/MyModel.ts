import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-justificatifs',
  templateUrl: './justificatifs.component.html',
  styleUrls: ['./justificatifs.component.scss']
})
export class JustificatifsComponent {

  @Input() hideFieldForm: boolean;
  @Input() dateDepot: boolean;
  @Input() numeroDpeAdeme: boolean;
  @Input() normeThermique: string;
  @Input() selectedOptionJustif: string;

  @Input() isDpeChecked:boolean
  @Input() isDateDepotChecked: boolean 
  @Input() isNormeThermiqueChecked: boolean

  @Output() isDateDepotCheckedChange = new EventEmitter<boolean>();
  @Output() isDpeCheckedChange = new EventEmitter<boolean>();
  @Output() isNormeThermiqueCheckedChange = new EventEmitter<boolean>();
  @Output() hiddenJustificatifChange = new EventEmitter<boolean>();
  @Output() selectedOptionJustifChange = new EventEmitter<string>(); 

  hiddenJustificatif=false;
  elementJustificatif=true;
  

  onSelectedOptionJustifChange(event: any) 
  {
    console.log("coucouuuu justif",this.selectedOptionJustif)
    this.selectedOptionJustif = event.target.value;
    this.selectedOptionJustifChange.emit(this.selectedOptionJustif); 
    
    }

  onDateDepotCheckedChange(event: any) {
    this.isDateDepotChecked = event.target.checked;
    this.isDateDepotCheckedChange.emit(this.isDateDepotChecked);
   
  }

  onDpeCheckedChange(event: any) {
    this.isDpeChecked = event.target.checked;
    this.isDpeCheckedChange.emit(this.isDpeChecked);
    
  }

  onNormeThermiqueCheckedChange(event: any) {
    this.isNormeThermiqueChecked = event.target.checked;
    this.isNormeThermiqueCheckedChange.emit(this.isNormeThermiqueChecked);
   
  }

  hideDataJustificatif() {
    this.hiddenJustificatif=true;
    return (this.elementJustificatif = false);
   }
  showDataJustificatif() {
    this.hiddenJustificatif=false;
    return (this.elementJustificatif = true);
    }
  

}



import { OperationService } from 'src/app/services/operation.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Operation } from 'src/app/models/operation';
//import * as jsPDF from 'jspdf';
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-list-operation',
  templateUrl: './list-operation.component.html',
  styleUrls: ['./list-operation.component.css']
})
export class ListOperationComponent implements OnInit {

  @ViewChild('content', { static: true }) content: ElementRef;

  public downloadPDF() {
    //var doc = new jsPDF('p','pt','a4');
    let doc = new jsPDF('p','pt');


    let specialElementHandlers = {

      '#editor': function(_element: any, _rendered: any) {
        return true;

      }
    };

    // let pdf = new jsPDF('p', 'mm', 'a4');
    let content = this.content.nativeElement
    doc.fromHTML(content.innerHTML,10,10, {
      'width': 100,

      'elementHandlers': specialElementHandlers


    });
    // doc.autoTable({ html: '#my-table' });
    //doc.addPage(width, height);
    doc.save('Historique.pdf');

  }

  constructor(private operationservice: OperationService) {



  }
  operations: Operation[];

  ngOnInit() {
    this.getlistOperation();

  }


  getlistOperation() {
    this.operationservice.listeOperation().subscribe((resultat: Operation[]) => { this.operations = resultat });
  }









  rechercherOpByDate() {

  }



  
  restorelistOp() {

  }




}

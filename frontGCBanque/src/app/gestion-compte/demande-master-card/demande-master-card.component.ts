import { Component, OnInit } from '@angular/core';
import {GalleriaModule} from 'primeng/galleria';
@Component({
  selector: 'app-demande-master-card',
  templateUrl: './demande-master-card.component.html',
  styleUrls: ['./demande-master-card.component.css']
})
export class DemandeMasterCardComponent implements OnInit {
  images: any[];
  constructor() { }

  ngOnInit() {
    this.images = [];
        // this.images.push({source:'assets/dist/img/master.jpg', alt:'master', title:'your card 1'});
        // this.images.push({source:'assets/dist/img/mstr.jpg', alt:'master', title:'your card 2'});
        // this.images.push({source:'assets/dist/img/mst.jpg', alt:'master', title:'your card 3'});
        this.images.push({source:'assets/dist/img//galleria1.jpg', alt:'Description for Image 1', title:'Title 1'});
         this.images.push({source:'assets/dist/img/galleria2.jpg', alt:'Description for Image 2', title:'Title 2'});
         this.images.push({source:'assets/dist/img/galleria3.jpg', alt:'Description for Image 3', title:'Title 3'});
         this.images.push({source:'assets/dist/img/galleria4.jpg', alt:'Description for Image 4', title:'Title 4'});
         this.images.push({source:'assets/dist/img/galleria5.jpg', alt:'Description for Image 5', title:'Title 5'});
  }






}

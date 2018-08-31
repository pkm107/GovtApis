import { Component, OnInit, DoCheck } from '@angular/core';
import { RailwayService, TrainResponse, Train, TrainStops, GroupResponse } from './railway-service';
import { Title } from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-railway',
  templateUrl: './railway.component.html',
  styleUrls: ['./railway.component.css']
})
export class RailwayComponent implements OnInit,DoCheck {

  train:GroupResponse;
  trains : GroupResponse[] = [];
  srcstn:string = '';
  deststn:string = '';
  recCount : number = 0;
  page:number = 1;
  showStop:string='';
  show:boolean = true;
  closeResult: string;
  searchStr:string = '';
  constructor(private railSvc:RailwayService,private vr:Title,private modalService: NgbModal) { }
  org : string ='';
  ngOnInit() {
    let a = this.railSvc.GetFields();    
    this.org = this.railSvc.GetOrganization();
    this.vr.setTitle(this.org);

    let b = this.railSvc.groupRes
    this.trains = b;        
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  open(content,train:GroupResponse) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.train = train;
  }
  showStops(val:string){
    if(this.show)
    {
      this.showStop = val;
      this.show = !this.show;
    }
    else{
      this.showStop = '';
      this.show = !this.show;
    }
    
  }
  ngDoCheck(){
    this.recCount = this.railSvc.recCount
  }
  swapTrain(){
    let src = this.srcstn;
    let dest = this.deststn;
    this.srcstn = dest;
    this.deststn = src;
  }

}

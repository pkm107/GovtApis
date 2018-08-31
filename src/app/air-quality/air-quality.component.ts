import { Component, OnInit, DoCheck } from '@angular/core';
import { AirQualityService, GrAirResponse, AirRecord } from './air-quality-service';
import { Title } from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AQI } from './aqi';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.css']
})
export class AirQualityComponent implements OnInit,DoCheck {

  constructor(private airSvc:AirQualityService,private pgT:Title,private aq:AQI,private modalService: NgbModal) { }

  Records:GrAirResponse[] = []
  mainRecord : GrAirResponse;
  Cities:any[] = [];
  city:string='';
  recCount : number = 0;
  page:number = 1;
  statusParam : any[] = [];
  closeResult: string;

  ngDoCheck(){
    this.recCount = this.airSvc.pageCount;
  }
  ngOnInit() {
    this.Records = this.airSvc.GetAllRecords();
    this.airSvc.pageCount = this.Records.length;
    this.recCount = this.airSvc.pageCount;
    this.pgT.setTitle(this.airSvc.GetOrganizations()[0]);    
    this.Records.forEach(item=>{
      let a = {city:item.city,station:item.station}
      this.Cities.push(a);            
    });    
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
  open(content,train:GrAirResponse) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.mainRecord = train;
  }
  GetAqiClass(a:AirRecord){
    let param = {[a.pollutant_id.trim()]:a.pollutant_avg}
    let pArray = [];
    pArray.push(param);    
    return this.aq.GetAqiStatus(pArray).trim().replace(' ','_');
  }

  GetAqiAvg(a:GrAirResponse){
    let params:{[key: string]:number}[] = [];
    a.polutants.forEach(pl=>{
      let pr = {[pl.pollutant_id]:pl.pollutant_avg};
      params.push(pr);
    });

    return this.aq.GetAvgAqi(params)
  }

}

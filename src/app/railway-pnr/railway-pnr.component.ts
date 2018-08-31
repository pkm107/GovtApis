import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PnrService,PnrStatus,JorneyDetails} from '../railway/pnr-service';

@Component({
  selector: 'app-railway-pnr',
  templateUrl: './railway-pnr.component.html',
  styleUrls: ['./railway-pnr.component.css']
})
export class RailwayPnrComponent implements OnInit {

  pnrnumber:number;
  pnrStatus:PnrStatus=new PnrStatus();
  isErrror:boolean=false;
  isShowRes:boolean=false;
  constructor(private pnr:PnrService) { }

  ngOnInit() {
    this.pnrStatus.bookingStatus=[];
    this.pnrStatus.journeyDetails=new JorneyDetails()    
  }

  searchPnr(f:NgForm){
    if(f.valid){      
      if(this.pnrnumber !== undefined){
        this.pnr.GetPnrStatus(this.pnrnumber).subscribe(res=>{
          this.pnrStatus = res;          
          if(this.pnrStatus.error !== undefined){
             this.isErrror = true;             
          }
          this.isShowRes = true;
          console.log(this.isErrror)
        },(err)=>{console.log(err);})
      } 
    }       
  }
}

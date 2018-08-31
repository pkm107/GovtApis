import { Component, OnInit, OnDestroy } from '@angular/core';
import { RailwayService } from './railway/railway-service';
import { Subscription } from 'rxjs';
import {from} from 'rxjs'
import {groupBy,mergeMap, toArray} from 'rxjs/operators';
import { isNgTemplate } from '../../node_modules/@angular/compiler';
import { AirQualityService } from './air-quality/air-quality-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {  
  isLoading:boolean = true;
  sub : Subscription;
  constructor(private railSvc:RailwayService,private airSvc:AirQualityService){}
  ngOnInit(){  

    this.GetTrainRecords();

    this.airSvc.GetTotal().subscribe(res=>{
      this.airSvc.total_rec = res;
      this.GetAirQualityRecs();
    })        
   }

   GetTrainRecords(){
    this.sub = this.railSvc.InIt()
    .subscribe(res=>{
      this.isLoading = false;
     let i = 0;
     let ar:any[] = [];
      this.railSvc.resArray = res;      
      from(this.railSvc.resArray.records).pipe(
       groupBy(res=>res.train_no_),
       mergeMap(res => res.pipe(toArray()))
      ).subscribe((items)=>{             
        let a = {
         train_no: items[0].train_no_,
         train_name:items[0].train_name,
         src_code:items[0].source_station_code,
         src_name:items[0].source_station_name,
         dest_code:items[0].destination_station_code,
         dest_name:items[0].destination_station_name,
         stops:items
        }
        ar.push(a);           
      })
      this.railSvc.groupRes = ar;          
    },err=>{console.log(err)}) 
   }

   GetAirQualityRecs(){
     let i : number = 0;
     this.sub = this.airSvc.InIt().subscribe(res=>{
      let ar:any[] = [];
      this.airSvc.Organizations = res.org;
       from(res.records).pipe(
         groupBy(res=>res.station),
         mergeMap(res => res.pipe(toArray()))
       ).subscribe((items) => {
         let a = {
          country : items[0].country,
          state: items[0].state,
          city: items[0].city,
          station:items[i].station,
          polutants : items
         }         
         
         ar.push(a);
       },err=>{console.log(err)})
       this.airSvc.ActualRes = ar;       
     },err=>{console.log(err)})
   }  

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
   
}

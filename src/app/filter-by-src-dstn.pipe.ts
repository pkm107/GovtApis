import { Pipe, PipeTransform } from '@angular/core';
import { GroupResponse, RailwayService } from './railway/railway-service';

@Pipe({
  name: 'filterBySrcDstn'
})
export class FilterBySrcDstnPipe implements PipeTransform {

  constructor(private railSvc:RailwayService){}
  transform(value: GroupResponse[], src:string,dest:string,pagingArgs?:number,searchArgs?:string): GroupResponse[] {
    
    if(src === '' && dest === ''){     
      this.railSvc.recCount = value.length;
      value =  value;
    }
    else if(dest === ''){
      value = value.filter(entry=>{
        return entry.dest_code.toLowerCase() !== src || entry.dest_name.toLowerCase().includes(src) === false;
      })       
      .filter(entry=>{
        return entry.stops.find(item => item.station_code.toLowerCase() === src
      || item.station_name.toLowerCase().includes(src))
      }); 
      this.railSvc.recCount = value.length; 
      //return value;   
    }
    else if(src === ''){
     value = value.filter(entry=>{
        return entry.src_code.toLowerCase() !== dest && entry.src_name.toLowerCase().includes(dest) === false          
      }).filter(entry=>{
        return entry.stops.find(item => item.station_code.toLowerCase() === dest
      || item.station_name.toLowerCase().includes(dest));
      });
      this.railSvc.recCount = value.length;
      //return value;
    }
    else{
     value =  value.filter(entry=>{
        return entry.dest_code.toLowerCase() !== src || entry.dest_name.toLowerCase().includes(src) === false;
      })       
      .filter(entry=>{
        return entry.stops.find(item => item.station_code.toLowerCase() === src
      || item.station_name.toLowerCase().includes(src))
      })
      .filter(entry=>{
        return entry.src_code.toLowerCase() !== dest && entry.src_name.toLowerCase().includes(dest) === false          
      }).filter(entry=>{
        return entry.stops.find(item => item.station_code.toLowerCase() === dest
      || item.station_name.toLowerCase().includes(dest));
      }).filter(entry=>{
        return entry.stops.find(e => parseInt(entry.stops.find(item => item.station_code.toLowerCase() === src
        || item.station_name.toLowerCase().includes(src)).islno.toString()) < 
          parseInt(entry.stops.find(item => item.station_code.toLowerCase() === dest
          || item.station_name.toLowerCase().includes(dest)).islno.toString()))
      });
      this.railSvc.recCount = value.length; 
      //return value;    
    }
    if(!searchArgs){
      value = value;
    }
    else{
      value = value.filter(entry=>{
        return entry.dest_code.toLowerCase().includes(searchArgs.toLowerCase()) ||
        entry.dest_name.toLowerCase().includes(searchArgs.toLowerCase()) ||
        entry.src_code.toLowerCase().includes(searchArgs.toLowerCase()) ||
        entry.src_name.toLowerCase().includes(searchArgs.toLowerCase()) ||
        entry.train_name.toLowerCase().includes(searchArgs.toLowerCase()) ||
        entry.train_no.toLowerCase().includes(searchArgs.toLowerCase())
      })
    }
    if(!pagingArgs){
      return value;
    }
    else{
      let start = pagingArgs-1;
      let end = (start*10)+10;      
      let v = value.slice(start*10,end);      
      return v;
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { PagingService } from './shared-service';
import * as postlook from "india-post-pincode-search";

@Pipe({
  name: 'postalPipe'
})
export class PostalPipePipe implements PipeTransform {
constructor(private pgSvc:PagingService){}
  transform(value: any[], args: string[],searchparam:string,issearch:boolean): any {
    let state = args[0];
    let dist = args[1];
    let taluk = args[2];   
    if(state === '' && dist === '' && taluk === ''){
      value = value;                      
    }
    else if(state !== '' && dist !== '' && taluk === ''){
      value = postlook.lookupby_state_dist_taluk(state,dist);                
    }
    else if(state !== '' && dist !== '' && taluk !== ''){
      value = postlook.lookupby_state_dist_taluk(state,dist,taluk);                  
    }
    else{     
      value = value;
    }

    if(searchparam !== '' && issearch === true){
      value = value.filter(v=>{       
        return v.pincode === searchparam || v.officename.toLowerCase().includes(searchparam.toLowerCase());
      })     
    }
    else if(searchparam !== '' && issearch === false){
      value = postlook.lookup(searchparam);      
    }
    else{
      value = value;
    }
    this.pgSvc.PageCount = value.length;    
    return value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import {PagingService} from './shared-service';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
constructor(private pgSvc:PagingService){}
  transform(value: any[], searchStr:string,args?: any[]): any {
    if(searchStr !== undefined && searchStr !== ''){
      if(args === null || args === undefined){
        value = value.filter(a=>{
          let v : string = a;          
          return v.includes(searchStr)          
        })
        this.pgSvc.PageCount = value.length;
        return value;
      }
      else{
        value = value.filter(v=>{
          let notmatchField = args.find(key => {
            let s:string = v[key];
            return s.toLowerCase().includes(searchStr.toLowerCase())
          })         
         return notmatchField;
        })
        this.pgSvc.PageCount = value.length;
        return value;
      }
    }
    else{
      this.pgSvc.PageCount = value.length;
      return value;
    }    
  }

}

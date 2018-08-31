import { Pipe, PipeTransform } from '@angular/core';
import {PagingService} from './shared-service';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
constructor(private pgSvc:PagingService){}
  transform(value: any[], pagingArgs?: number): any {
    if(!pagingArgs){
      if(value.length > 0){
        this.pgSvc.PageCount = value.length;
      }      
      return value;
    }
    else{
      let start = pagingArgs-1;
      let end = (start*10)+10;      
      let v = value.slice(start*10,end); 
      if(value.length > 0){
        this.pgSvc.PageCount = value.length;
      }      
      return v;
    }
  }

}

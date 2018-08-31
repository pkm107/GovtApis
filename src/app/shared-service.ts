import { Injectable } from "../../node_modules/@angular/core";

@Injectable({providedIn:'root'})
export class PagingService{
   
   private _page : number;
   public get PageNo() : number {
       return this._page;
   }
   public set PageNo(v : number) {
       this._page = v;
   }

   private _pagec : number;
   public get PageCount() : number {
       return this._pagec;
   }
   public set PageCount(v : number) {
       this._pagec = v;
   }
   
}
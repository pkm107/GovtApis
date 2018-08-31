import { Component, OnInit, DoCheck } from '@angular/core';
import { PostRecord } from './postal-service';
import * as postlook from "india-post-pincode-search";
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../state-service';
import { isNumber } from 'util';
import { PagingService } from '../shared-service';

@Component({
  selector: 'app-postal',
  templateUrl: './postal.component.html',
  styleUrls: ['./postal.component.css']
})
export class PostalComponent implements OnInit,DoCheck{

  postRcs:PostRecord[] = [];
  searchParam:string = '';
  searchParam2:string ='';
  page:number = 1;
  isSearch:boolean=false;
  totalPg: number = 0;
  states:string[]=[];
  state:string='';
  districts:string[]=[];
  district:string='';
  taluks:string[] =[];
  taluk:string='';
  constructor(private pgT:Title,private sSvc:StateService,private pgSvc: PagingService) { }

  ngOnInit() {
    this.pgT.setTitle('Indian Post'); 
    this.states = postlook.getstates();            
  } 
ngDoCheck(){
  this.totalPg = this.pgSvc.PageCount;  
}
  onChangeState(){      
    this.districts = postlook.getdistricts(this.state);        
  }
  onChangeDist(){    
    this.taluks = postlook.gettaluks(this.state,this.district);       
    this.isSearch = true;       
  }
  onChangeTaluk(){       
    this.isSearch = true;
  } 
}

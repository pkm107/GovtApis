import { Component, OnInit } from '@angular/core';
import { ComodityService } from './comodity-service';

@Component({
  selector: 'app-comodity-price',
  templateUrl: './comodity-price.component.html',
  styleUrls: ['./comodity-price.component.css']
})
export class ComodityPriceComponent implements OnInit {

  constructor(private cmdSvc: ComodityService) { }
  page: number = 1;
  states: string[] = [];
  state: string = '';
  districts: string[] = [];
  district:string='';
  markets:string[]=[];
  market:string='';
  comodities:string[]=[];
  comodity:string='';
  records:any[]=[];

  ngOnInit() {
    this.cmdSvc.getStates().subscribe(s=>{
      this.states=s;      
    })
    this.cmdSvc.getcomodities('','','').subscribe(c=>{
      this.comodities = c;
    })
  }
  onChangeState(){
    if(this.state !== ''){
      this.cmdSvc.getDistricts(this.state).subscribe(d=>{
        this.districts = d;
      })

      this.cmdSvc.InIt().subscribe(c=>{
        this.records = c.filter(co=>{
          return co.state.toLowerCase().includes(this.state.toLowerCase())
          && co.commodity.toLowerCase().includes(this.comodity.toLowerCase())
        })
      })
    }
    else{
      this.districts=[];
      this.district='';
      this.markets=[];
      this.market='';
      this.comodity='';
      this.cmdSvc.getcomodities('','','').subscribe(c=>{
        this.comodities = c;
      })
    }    
  }
  onChangeDistrict(){
    this.comodity ='';
    if(this.state !== '' && this.district !== ''){
      this.cmdSvc.getMarkets(this.state,this.district).subscribe(m=>{
        this.markets = m;
      })

      this.cmdSvc.InIt().subscribe(c=>{
        this.records = c.filter(co=>{
          return co.state.toLowerCase().includes(this.state.toLowerCase())
          && co.district.toLowerCase().includes(this.district.toLowerCase())
          && co.commodity.toLowerCase().includes(this.comodity.toLowerCase())
        })
      })
    }   
    else{
      this.markets=[]; 
      this.comodity = '';     
    }
    
  }
  onChangeMarket(){
    this.comodity ='';
    if(this.district !== ''){
      this.cmdSvc.getcomodities(this.state,this.district,this.market).subscribe(c=>{
        this.comodities = c;        
      })

      this.cmdSvc.InIt().subscribe(c=>{
        this.records = c.filter(co=>{
          return co.state.toLowerCase().includes(this.state.toLowerCase())
          && co.district.toLowerCase().includes(this.district.toLowerCase())
          && co.market.toLowerCase().includes(this.market.toLowerCase())
          && co.commodity.toLowerCase().includes(this.comodity.toLowerCase())
        })
      })
    }
    else{     
     this.comodity = '';
    }
    
  }
  onChangecomodity(){
    if(this.state !== '' && this.district !== '' && this.market !== ''){
      this.cmdSvc.InIt().subscribe(c=>{
        this.records = c.filter(co=>{
          return co.state.toLowerCase().includes(this.state.toLowerCase())
          && co.district.toLowerCase().includes(this.district.toLowerCase())
          && co.market.toLowerCase().includes(this.market.toLowerCase())
          && co.commodity.toLowerCase().includes(this.comodity.toLowerCase())
        })
      })
    }
    else if(this.state !== '' && this.district === ''){
      this.cmdSvc.InIt().subscribe(c=>{
        this.records = c.filter(co=>{
          return co.state.toLowerCase().includes(this.state.toLowerCase())
          && co.commodity.toLowerCase().includes(this.comodity.toLowerCase())
        })
      })
    }
    else{
      this.cmdSvc.InIt().subscribe(c=>{
        this.records = c.filter(co=>{
          return co.commodity.toLowerCase().includes(this.comodity.toLowerCase())
        })
      })
    }
  }
}

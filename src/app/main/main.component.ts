import { Component, OnInit, DoCheck } from '@angular/core';
import { RailwayService } from '../railway/railway-service';
import { Title } from '../../../node_modules/@angular/platform-browser';
import { Router, RouterEvent } from '@angular/router';
import { AirQualityService } from '../air-quality/air-quality-service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  tittle:string='';
  constructor(private r:RailwayService,private a: AirQualityService,private router:Router) { }

  ngOnInit() {
    this.tittle = this.r.GetOrganization();
    let loc = window.location.href;
    if(loc.includes('air_polution')){
      this.tittle = this.a.GetOrganizations()[0];
    }
    else if(loc.includes('railway')){
      this.tittle = this.r.GetOrganization();
    }
    else if(loc.includes('pin_search')){
      this.tittle = 'India Post'
    }
    else if(loc.includes('comodity_price')){
      this.tittle = 'Indian Agriculture Market'
    }
    else{
      this.tittle = this.r.GetOrganization();
    }
    this.router.events.subscribe((r:RouterEvent)=>{      
         if(r.url !== undefined && r.url.includes('air_polution')){         
           this.tittle = this.a.GetOrganizations()[0];          
         }
         else if(r.url !== undefined && r.url.includes('railway')){          
          this.tittle = this.r.GetOrganization();
         }
         else if(r.url !== undefined && r.url.includes('pin_search')){          
          this.tittle = 'India Post';
         }
         else if(r.url !== undefined && r.url.includes('comodity_price')){          
          this.tittle = 'Indian Agriculture Market';
         }
    })
    
  }


}

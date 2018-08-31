import { NgModule } from "@angular/core";
import {RouterModule,Route, Routes} from "@angular/router";
import { CommonModule } from "@angular/common";
import { RailwayComponent } from "./railway/railway.component";
import { HomeComponent } from "./home/home.component";
import { MainComponent } from "./main/main.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AirQualityComponent } from "./air-quality/air-quality.component";
import { PostalComponent } from "./postal/postal.component";
import { ComodityPriceComponent } from "./comodity-price/comodity-price.component";
import {RailwayPnrComponent} from "./railway-pnr/railway-pnr.component"

const approutes:Routes = [
    {path:'',component:HomeComponent},
    {
        path:'main',
        children:[
            {path:'',redirectTo:'/main/railway',pathMatch:'full'},
            {path:'railway',component:RailwayComponent},
            {path:'air_polution',component:AirQualityComponent},
            {path:'pin_search',component:PostalComponent},
            {path:'comodity_price',component:ComodityPriceComponent},
            {path:'pnr_check',component:RailwayPnrComponent}
        ],
        component:MainComponent
    },
    {path:'404',component:NotFoundComponent},
    {path: '**',redirectTo:'/404'}
]

@NgModule({
imports:[CommonModule, RouterModule.forRoot(approutes)],
exports:[RouterModule]
})
export class AppRouteModule{}
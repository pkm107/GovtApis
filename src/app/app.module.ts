import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { RailwayComponent } from './railway/railway.component';
import { AppRouteModule } from './approutemodule';
import { RailwayService } from './railway/railway-service';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagingService } from './shared-service';
import { ReplacePipe } from './replace.pipe';
import {FormsModule } from '@angular/forms';
import { FilterBySrcDstnPipe } from './filter-by-src-dstn.pipe';
import { PaginationDirective } from './pagination.directive';
import { AirQualityComponent } from './air-quality/air-quality.component';
import { AirQualityService } from './air-quality/air-quality-service';
import { FilterByPipe } from './filter-by.pipe';
import { PaginationPipe } from './pagination.pipe';
import { AQI } from './air-quality/aqi';
import { PostalComponent } from './postal/postal.component';
import { StateService } from './state-service';
import { PostalPipePipe } from './postal-pipe.pipe';
import { ComodityPriceComponent } from './comodity-price/comodity-price.component';
import { ComodityService } from './comodity-price/comodity-service';
import {PnrService} from './railway/pnr-service';
import { RailwayPnrComponent } from './railway-pnr/railway-pnr.component';


@NgModule({
  declarations: [
    AppComponent,
    RailwayComponent,
    HomeComponent,
    MainComponent,
    NotFoundComponent,
    ReplacePipe,
    FilterBySrcDstnPipe,
    PaginationDirective,
    AirQualityComponent,
    FilterByPipe,
    PaginationPipe,
    PostalComponent,
    PostalPipePipe,
    ComodityPriceComponent,
    RailwayPnrComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    NgbModule,
    HttpModule,   
    FormsModule
  ],
  providers: [RailwayService,PagingService,AirQualityService,AQI,StateService,ComodityService,PnrService],
  bootstrap: [AppComponent]
})
export class AppModule { }

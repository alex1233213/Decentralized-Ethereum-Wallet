import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {NbButtonModule, NbIconModule, NbLayoutModule, NbPopoverModule} from "@nebular/theme";


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NbLayoutModule,
    NbButtonModule,
    NbPopoverModule,
    NbIconModule
  ]
})
export class HomePageModule { }

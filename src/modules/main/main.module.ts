import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { AppComponent } from '../../components/app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MainModule { }

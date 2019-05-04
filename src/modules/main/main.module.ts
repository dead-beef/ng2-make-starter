import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ClarityModule } from '@clr/angular';

import { MainRoutingModule } from './main-routing.module';
import { AppComponent } from '../../components/app/app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		ClarityModule,
		NgxsModule.forRoot(),
		MainRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class MainModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { ClarityModule } from '@clr/angular';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from 'src/components/main-layout/main-layout.component';
import { Page1Component } from 'src/components/page1/page1.component';
import { Page2Component } from 'src/components/page2/page2.component';
import { ItemListState } from 'src/states/item-list.state';
import { ColorState } from 'src/states/colors.state';


@NgModule({
	declarations: [
		MainLayoutComponent,
		Page1Component,
		Page2Component
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		ClarityModule,
		MainRoutingModule,
		NgxsModule.forRoot([
			ItemListState,
			ColorState
		]),
	],
	providers: [],
	bootstrap: [MainLayoutComponent]
})
export class MainModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page1Component } from 'src/components/page1/page1.component';
import { Page2Component } from 'src/components/page2/page2.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
	{ path: 'page1', component: Page1Component },
	{ path: 'page2', component: Page2Component }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: environment.useHash})],
	exports: [RouterModule]
})
export class MainRoutingModule {}

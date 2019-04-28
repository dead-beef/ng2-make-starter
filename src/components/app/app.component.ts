import { Component } from '@angular/core';
import { getTemplate } from 'build/templates';

@Component({
	selector: 'app-root',
	template: getTemplate('components/app/app.component.html'),
	//styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ng2-make-starter';
}

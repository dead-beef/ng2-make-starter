import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { getTemplate } from 'build/templates';
import { Colors, ColorState } from 'src/states/colors.state';

@Component({
	selector: 'main-layout',
	template: getTemplate('components/main-layout/main-layout.component.html'),
	//styleUrls: ['./app.component.scss']
})
export class MainLayoutComponent {
	title = 'ng2-make-starter';

	@Select(ColorState.prop('background')) background$: Observable<string>;
}

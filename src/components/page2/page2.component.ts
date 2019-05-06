import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { startWith, filter, take } from 'rxjs/operators';

import { getTemplate } from 'build/templates';
import {
	Colors, ColorState, SetColor
} from 'src/states/colors.state';

@Component({
	template: getTemplate('components/page2/page2.component.html')
})
export class Page2Component {
	@Select(ColorState.prop('background')) background$: Observable<string>;
	bgColor = this.fb.control('', [
		Validators.pattern(/^(#[0-9a-f]{3}([0-9a-f]{3})?)?$/)
	]);

	constructor(private store: Store, private fb: FormBuilder) {}

	ngOnInit() {
		this.background$
			.pipe(take(1))
			.subscribe(value => this.bgColor.setValue(value));
		this.bgColor.valueChanges
			.pipe(
				startWith(this.bgColor.value),
				filter(item => this.bgColor.valid)
			)
			.subscribe(value => {
				this.store.dispatch(new SetColor('background', value));
			});
	}

	resetColors() {
		this.bgColor.setValue('');
	}
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { getTemplate } from 'build/templates';
import {
	ListItem, ItemListState,
    AddItem, RemoveItem
} from 'src/states/item-list.state';

@Component({
	template: getTemplate('components/page1/page1.component.html')
})
export class Page1Component {
	@Select(ItemListState) items$: Observable<ListItem[]>;

	constructor(private store: Store) {}

	addItem(name, value) {
		let item: ListItem = { name, value };
		this.store.dispatch(new AddItem(item));
	}

	removeItem(item) {
		this.store.dispatch(new RemoveItem(item));
	}
}

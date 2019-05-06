import { State, Action, StateContext } from '@ngxs/store';

export interface ListItem {
	name: string,
	value: string
}

export class AddItem {
	static readonly type = '[ItemList] AddItem'
	constructor(public item: ListItem) {}
}

export class RemoveItem {
	static readonly type = '[ItemList] RemoveItem'
	constructor(public item: ListItem) {}
}

@State<ListItem[]>({
	name: 'items',
	defaults: [{name: 'test item name', value: 'test item value'}]
})
export class ItemListState {
	@Action(AddItem)
	addItem(ctx: StateContext<ListItem[]>, action: AddItem) {
		const state = ctx.getState();
		ctx.setState([...state, action.item]);
	}

	@Action(RemoveItem)
	removeItem(ctx: StateContext<ListItem[]>, action: RemoveItem) {
		const state = ctx.getState();
		ctx.setState(state.filter((item) => item !== action.item));
	}
}

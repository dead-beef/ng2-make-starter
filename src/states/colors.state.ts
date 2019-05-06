import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

export interface Colors {
	background: string|null
}

export class SetColor {
	static readonly type = '[Colors] SetColor'
	constructor(public name: string, public value: string) {}
}

@State<Colors>({
	name: 'colors',
	defaults: {
		background: null
	}
})
export class ColorState {
	static prop(name: string, defaultVal?: string) {
		defaultVal = defaultVal || '';
		return createSelector([ColorState], (state: Colors) => {
			let res: string | null = state[name];
			return res == null ? defaultVal : res;
		});
	}

	@Action(SetColor)
	setColor(ctx: StateContext<Colors>, action: SetColor) {
		let data = {};
		data[action.name] = action.value;
		ctx.setState(patch(data));
	}
}

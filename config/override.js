module.exports = {
	'@clr/icons': {
		main: 'clr-icons.min.js'
	},
	'@ngxs/store': {
		main: [
			'bundles/ngxs-store-internals.umd.js',
			'bundles/ngxs-store-operators.umd.js',
			'bundles/ngxs-store.umd.js'
		]
	},
	almond: {
		dependencies: {
			'@webcomponents/custom-elements': true
		}
	},
	'core-js': {
		main: 'client/core.js'
	},
	rxjs: {
		main: 'bundles/rxjs.umd.js'
	},
	tslib: {
		dependencies: {
			almond: true
		}
	},
	'zone.js': {
		main: 'dist/zone.js'
	}
};

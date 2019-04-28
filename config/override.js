module.exports = {
	tslib: {
		dependencies: {
			almond: true
		}
	},
	'core-js': {
		main: 'client/core.js'
	},
	rxjs: {
		main: 'bundles/rxjs.umd.js'
	},
	'zone.js': {
		main: 'dist/zone.js'
	}
};

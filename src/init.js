function createSubmodules(moduleName) {
	var moduleObj = require(moduleName);
	Object.keys(moduleObj).forEach(function createSubmodule(name) {
		if(typeof moduleObj[name] !== 'object') {
			return;
		}
		define(
			moduleName + '/' + name,
			[moduleName],
			function getSubmodule(moduleObj_) { return moduleObj_[name]; }
		);
	});
}

require('zone.js');
createSubmodules('rxjs');

if(typeof jasmine !== 'undefined') {
	require('src/main.spec');
}
else {
	require('src/main');
}

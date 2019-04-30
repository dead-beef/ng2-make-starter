// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
	let testModules = [
		'@angular/core/testing',
		'@angular/compiler/testing',
		'@angular/platform-browser/testing',
		'@angular/platform-browser-dynamic/testing',
		'@angular/router/testing',
		'@angular/common/testing'
	];
	let files = [
		{
			pattern: require.resolve('zone.js/dist/zone-testing-bundle'),
			watched: false,
			served: true
		},
		'./build/js/vendor.js'
	];
	for(let module_ of testModules) {
		files.push({
			pattern: require.resolve(module_),
			watched: false,
			served: true
		});
	}
	files.push(
		'./build/test.js',
		'./src/init.js'
	);

	let browsers = process.env.TEST_BROWSERS;
	if(browsers) {
		browsers = browsers.split(/\s+/);
	}
	if(!(browsers && browsers[0])) {
		browsers = ['Chromium'];
	}

	config.set({
		basePath: '../',
		files: files,
		frameworks: ['jasmine'/*, '@angular-devkit/build-angular'*/],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			//require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, '../coverage/ng2-make-starter'),
			reports: ['html', 'lcovonly', 'text-summary'],
			//fixWebpackSourcePaths: true
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: browsers,
		singleRun: false,
		restartOnFileChange: true
	});
};

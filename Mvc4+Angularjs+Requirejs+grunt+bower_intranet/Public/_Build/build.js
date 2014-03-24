
 
({ 
	appDir: '../js',
	baseUrl: './',
	mainConfigFile: '../js/config.js',
	dir: '../release',
	modules: [
			{
			name: 'views/Home/index'
		},
	 
	],
	onBuildRead: function (moduleName, path, contents) {
        if (moduleName === "config") {
            return contents.replace(/\/public\/js/g,"/public/release")
        }
        return contents;
    },
})





System.config({
    map : {
        app: 'app'
    },
    packages: {
        app: {
            main: './settings-view.js',
            defaultExtension: 'js'
        },
        scripts: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('app/settings-view')
    .then(null, console.error.bind(console));
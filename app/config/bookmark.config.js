System.config({
    map : {
        app: 'app'
    },
    packages: {
        app: {
            main: './bookmark-view.js',
            defaultExtension: 'js'
        },
        scripts: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('app/bookmarks-view')
    .then(null, console.error.bind(console));
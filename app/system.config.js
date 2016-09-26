System.config({
    map : {
        app: 'app'
    },
    packages: {
        app: {
            main: './boot.js',
            defaultExtension: 'js'
        },
        scripts: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('app/boot')
    .then(null, console.error.bind(console));
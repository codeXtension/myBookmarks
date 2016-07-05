System.config({
    packages: {
        scripts: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('../scripts/boot')
    .then(null, console.error.bind(console));
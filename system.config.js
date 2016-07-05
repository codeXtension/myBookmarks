System.config({
    packages: {
        scripts: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('../scripts/boot.js')
    .then(null, console.error.bind(console));
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


var openedWindows = [];
window._open = window.open; // saving original function
window.open = function(url,name,params){
    openedWindows.push(window._open(url,name,params));
}
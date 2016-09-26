/**
 * Created by eelkhour on 26.09.2016.
 */
var openedWindows = [];
window._open = window.open; // saving original function
window.open = function(url,name,params){
    openedWindows.push(window._open(url,name,params));
}
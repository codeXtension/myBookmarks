$(function(){
    System.import('app/bookmark-loader').catch(
        function(err) {
            console.error(err.message);
        });
});

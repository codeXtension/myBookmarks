$(function(){
    System.import('app/background-loader').catch(
        function(err) {
            console.error(err.message);
        });
});

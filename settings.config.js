$(function(){
    System.import('app/settings-loader').catch(
        function(err) {
            console.error(err.message);
        });
});

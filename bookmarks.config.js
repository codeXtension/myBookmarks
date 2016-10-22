$(function(){
    System.import('app/bookmark-loader').catch(
        function(err) {
            console.error(err.message);
        });

    $(window).resize(function(){
        $(".bookmark-scrollable").height(window.innerHeight);
                console.info('setting on resize .bookmark-scrollable to ' + (window.innerHeight));

    });

    window.setTimeout(function() {
        $(".bookmark-scrollable").height(window.innerHeight);
    }, 500);
});

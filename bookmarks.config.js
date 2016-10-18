$(function(){
    System.import('app/bookmark-loader').catch(
        function(err) {
            console.error(err.message);
        });

/*    $(window).resize(function(){
        $(".bookmark-scrollable").height(screen.height-130);
                console.info('setting on resize .bookmark-scrollable to ' + (screen.height-130));

    });*/
});

(function($) {
    // adds the scroll event listener to the window on load
    $(function() {
        $(window).scroll(scroll);
    });
    
    // when the page has scrolled the height of the titleBar, the statusBar will
    // remain fixed and the content will scroll beneath it
    function scroll() {
        var bar = $(".statusBar");
        var container = $(".container-fluid");
        var height = $(".titleBar").height();
        
        if(window.pageYOffset >= height) {
            bar.addClass("scroll");
            container.css({ "padding-top" : height + "px" });
        } else {
            bar.removeClass("scroll");
            container.css({ "padding-top" : "0px" });
        }
    }
})(jQuery);
    
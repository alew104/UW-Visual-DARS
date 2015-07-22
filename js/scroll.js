(function($) {
    $(function() {
        window.addEventListener("scroll", scroll);
    });
    
    function scroll() {
        var bar = $(".statusBar");
        // 85px is the true height of #top plus the 16px margin above #top
        if(window.pageYOffset >= 70) {
            $(".statusBar").addClass("scroll");
            $(".container-fluid").css({ "padding-top" : "70px" });
        } else {
            $(".statusBar").removeClass("scroll");
            $(".container-fluid").css({ "padding-top" : "00px" });
        }
    }
})(jQuery);
    
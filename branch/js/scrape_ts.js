// Quarter codes:      [AUT, WIN, SPR, SUM]
// Year:               XXXX (four digits)
// Departments:        info, cse, engl, stat, qmeth

"use scrict";

// the only identifies in the global namespace
const courses = {};
const get_data = function() {
    return courses;
};

// jQuery-style module pattern
(function($) {
    courses.classes = [];
    
    function get_ts(qtr, year, dept) {
        // using whateverorigin.org allows bypassing the Same-Origin Policy
        const url_xsop = 'http://whateverorigin.org/get?url=';
        const url_ts = 'http://www.washington.edu/students/timeschd/';
        
        // encode to ensure safety when accepting foreign strings
        const path = encodeURIComponent(qtr.toUpperCase() + year + '/' + dept.toLowerCase() + '.html');
        
        $.ajax({
            url: url_xsop + url_ts + path + '&callback=?', 
            dataType: 'json',
            async: false,
            success: function(json) {
                const regex = /<A NAME=(info|cse|stat|engl|qmeth)\d{3}/ig;
                var str = json.contents.replace(/[\s]+/gi, ' ').replace(/&nbsp;/gi, '');
                var match = '';
                do {
                    match = regex.exec(str);
                    if (match)
                        courses.classes.push(match[0].substr(8));
                } while (match != null); 
            }
        });
    };

    $(function() {
        get_ts('SUM', '2015', 'info');
        get_ts('SUM', '2015', 'cse');
        get_ts('SUM', '2015', 'engl');
        get_ts('SUM', '2015', 'stat');
        get_ts('SUM', '2015', 'qmeth');
    });
})(jQuery);

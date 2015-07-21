// Quarter codes:      [AUT, WIN, SPR, SUM]
// Year:               XXXX (four digits)
// Departments:        info, cse, art, hcde

(function($) {
    const url_xsop = 'http://whateverorigin.org/get?url=';
    const url_ts = 'http://www.washington.edu/students/timeschd/';
    function fetch_ts(qtr, year, dept) {
        var content;
        var path = encodeURIComponent(qtr + year + '/' + dept + '.html');
        $.getJSON(url_xsop + url_ts + path + '&callback=?', function(data) {
            var str = data.contents.replace(/[\s\n]+/gi, ' ').replace(/&nbsp;/g, '');
            content = str.split(/<br>/i);
            console.log(content[2]);
            content = content.map(function(item, idx) {
                if (idx > 1)
                    return $.trim(item.replace(/<[\s\w="#%/.:?+&]+>/gi, '').replace(/\(.*\)/g, '').replace(/[\s]{2,}/g, ' ').replace(/Prerequisites /g, ''));
            });
            content.splice(0,2);
            return content;
        });
    };

    $(function() {
        var courses = fetch_ts('SUM', '2015', 'info');
        console.log(courses);
    });
})(jQuery);

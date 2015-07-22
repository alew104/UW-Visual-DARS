// Quarter codes:      [AUT, WIN, SPR, SUM]
// Year:               XXXX (four digits)
// Departments:        info, cse, art, hcde

"use scrict";

// the only identifies in the global namespace
const courses = {};
const get_data = function() {
    return courses;
};

// jQuery-style module pattern
(function($) {
    courses.classes = {};
    
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
                var str = json.contents.replace(/[\s\n]+/gi, ' ').replace(/&nbsp;/gi, '');
                var content = str.split(/<br>/i);
                content = content.map(function(item, idx) {
                    // the first 2 elements are not relevant (the <head> section and table header)
                    if (idx > 1)
                        // get rid of all html tags and characters that we don't need
                        return $.trim(item.replace(/<[\s\w="#%/.:?+&]+>/gi, '')
                                          .replace(/(CR\/NC|>|%|\(.*\))/g, '')
                                          .replace(/Prerequisites/g, '')
                                          .replace(/[\s]{2,}/g, ' '));
                });
                // those first two elements are undefined because they were skipped in the map()
                content.splice(0, 2);
                
                // process the remainder of the elements
                content.map(function(line) {
                    // currently we have a space-delimited list to process
                    var tokens = line.split(/ /);
                    var department = tokens.shift();
                    
                    // engl has weird messages in the time schedule we need to ignore
                    if (department.toUpperCase() != dept.toUpperCase())
                        return;
                    
                    var number = tokens.shift();
                    var name = dept.toLowerCase() + number;
                    
                    // build the title from several tokens
                    var title = tokens.shift();
                    while (!tokens[0].match(/\d/))
                        title = title + ' ' + tokens.shift();
                    
                    // skip sln and letter
                    tokens.splice(0, 2);

                    // add the data to the JSON object
                    courses.classes[name.valueOf()] = {
                        "dept" : department,
                        "num" : number,
                        "fullName" : name,
                        "title" : title
                    };
                });
            }
        });
    };

    $(function() {
        get_ts('SUM', '2015', 'info');
        get_ts('SUM', '2015', 'cse');
        get_ts('SUM', '2015', 'engl');
    });
})(jQuery);

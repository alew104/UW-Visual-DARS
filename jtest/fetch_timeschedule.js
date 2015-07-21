// Quarter codes:      [AUT, WIN, SPR, SUM]
// Year:               XXXX (four digits)
// Departments:        info, cse, art, hcde

// (function() {
    window.onload = function() {
        fetch_ts('SUM', '2015', 'info');
    };

    const url_base = 'http://www.washington.edu/students/timeschd/';

    function fetch_ts(qtr, year, dept) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("text").innerHTML = xhr.responseText;
                document.getElementById("type").innerHTML = xhr.responseType;
                document.getElementById("xml").innerHTML = xhr.responseXML;
            } else
                console.log("Request failed :\\\\\\");
        }
        console.log(url_base + qtr + year + '/' + dept + '.html');
        xhr.open("GET", url_base + qtr + year + '/' + dept + '.html', true);
        xhr.send();
    }
// })();

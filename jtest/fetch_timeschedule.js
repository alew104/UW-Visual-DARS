// Quarter codes:      [AUT, WIN, SPR, SUM]
// Year:               XXXX (four digits)
// Departments:        info, cse, art, hcde

const url_base = 'https://www.washington.edu/students/timeschd/';

function loadXMLDoc(qtr, year, dept) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("text").innerHTML = xmlhttp.responseText;
            document.getElementById("type").innerHTML = xmlhttp.responseType;
            document.getElementById("xml").innerHTML = xmlhttp.responseXML;
        } else
            console.log("Request failed :\\\\\\");
    }
    xmlhttp.open("GET", url_base + qtr + year + '/' + dept'.html', true);
    xmlhttp.send();
}

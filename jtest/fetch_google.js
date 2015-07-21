

$.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://www.washington.edu/students/timeschd/SUM2015/info.html') + '&callback=?', function(data){
	$('body').xml(data.contents);
});
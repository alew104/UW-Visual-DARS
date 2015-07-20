var data = JSON.parse(classes);

// $scope.netid = netid;
$scope.credits = 0;
$scope.classesTaken = new Array();

$scope.markCompleted = function (class) {
	data.classes[class].completed = true;
	$scope.classesTaken.push(class);
	$scope.credits += data.classes[class].credits;
}

$scope.checkPrereq = function (class) {
	var result = true;
	var prereqs = data.classes[class].prereqs;
	if (!prereqs) {
		for (var i = 0; i < prereqs.length; i++) {
			if (result) {
				result = prereqs[i].completed;
			}
		}
	}
	return result;
}

$scope.suggestNextClass = function () {
	
}

$scope.checkCredit = function () {
	return $scope.credits + '/180 credits';
}
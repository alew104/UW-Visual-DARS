var myCtrl = myApp.controller('myCtrl', function($scope) {

	$scope.data = JSON.parse(classes);

// $scope.netid = netid;
	$scope.credits = 0;
    $scope.electivesCredits = 0;
	$scope.classesTaken = [];
    $scope.electives = [];

	$scope.markCompleted = function (_class) {
		$scope.data.classes[_class].completed = true;
		$scope.classesTaken.push(_class);
        if(!$scope.data.classes[_class].required) {
            $scope.electives.push(_class);
            $scope.electivesCredits += $scope.data.classes[_class].credits;
        }
		$scope.credits += $scope.data.classes[_class].credits;
	};

	$scope.checkPrereq = function (_class) {
		var result = true;
		var prereqs = data.classes[_class].prereqs;
		if (!prereqs) {
			for (var i = 0; i < prereqs.length; i++) {
				if (result) {
					result = prereqs[i].completed;
				}
			}
		}
		return result;
	};

	$scope.suggestNextClass = function () {

	};

    $scope.checkElectives = function () {
        return $scope.electivesCredits + '/75 credits';
    };

	$scope.checkCredit = function () {
		return $scope.credits + '/180 credits';
	};
};
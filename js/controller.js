var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope) {

	$scope.data = data.classes;
    $scope.yearOne = year1.classes;
    $scope.yearTwo = year2.classes;
    $scope.yearThree = year3.classes;
    $scope.yearFour = year4.classes;

    //$scope.netid = netid;
    $scope.credits = 0;
    $scope.electivesCredits = 0;
    $scope.classesTaken = [];
    $scope.electives = [];

    $scope.markCompleted = function (_class) {
        if(!$scope.data[_class].completed) {
            $scope.data[_class].completed = true;
            $scope.classesTaken.push(_class);
            if (!$scope.data[_class].required) {
                $scope.electives.push(_class);
                $scope.electivesCredits += $scope.data[_class].credits;
            }
            $scope.credits += $scope.data[_class].credits;
        }
    };

    $scope.checkPrereq = function (_class) {
        var result = true;
        var prereqs = $scope.data[_class].prereqs;
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
});

var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope) {

	$scope.data = data.classes;
    $scope.offerings = offerings.classes;
    $scope.yearOne = year1.classes;
    $scope.yearTwo = year2.classes;
    $scope.yearThree = year3.classes;
    $scope.yearFour = year4.classes;
    $scope.elective = electives.classes;

    //$scope.netid = netid;
    $scope.credits = 0;
    $scope.electivesCredits = 0;
    $scope.classesTaken = [];
    $scope.electives = [];

    $scope.markCompleted = function (_class) {
        var prereqsCheckResult = $scope.checkPrereq(_class);
        if(!$scope.data[_class].completed && prereqsCheckResult.checkPassed) {
            $scope.data[_class].completed = true;
            $scope.classesTaken.push(_class);
            if (!$scope.data[_class].required) {
                $scope.electives.push(_class);
                $scope.electivesCredits += $scope.data[_class].credits;
            }
            $scope.credits += $scope.data[_class].credits;
        }
        else if($scope.data[_class].completed) {
            $scope.completedMessage = 'This class has already been marked as completed.';
        } else {
            $scope.prereqsNeeded = prereqsCheckResult.unfinishedPrereqs;
        }
    };

    $scope.checkPrereq = function (_class) {
        var unfinishedPrereqs = [];
        var checkPassed = true;
        var prereqs = $scope.data[_class].prereqs;
        if (prereqs != null) {
            for (var i = 0; i < prereqs.length; i++) {
                var currClassCompleted = $scope.data[prereqs[i]].completed;
                if (!currClassCompleted) {
                    unfinishedPrereqs.push(prereqs[i]);
                    checkPassed = false;
                }
            }
        }
        return {
            checkPassed: checkPassed,
            unfinishedPrereqs: unfinishedPrereqs
        };
    };

    $scope.checkElectives = function () {
        return $scope.electivesCredits + '/75 credits';
    };

	$scope.checkCredit = function () {
		return $scope.credits + '/180 credits';
	};
});

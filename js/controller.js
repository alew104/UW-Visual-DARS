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

    $scope.suggestClasses = function(_class){
        if($scope.data[_class].completed) {
            return false;
        }
        return $scope.offerings.indexOf(_class) > -1;
    };

    $scope.checkCompleted = function(_class) {
        return $scope.data[_class].completed;
    };

    $scope.changeCompletedStatus = function (_class) {
        $scope.errMessage = '';
        var index = $scope.classesTaken.indexOf(_class);
        index === -1 ? $scope.markCompleted(_class) : $scope.removeMark(_class, index);
    };

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
            $scope.errMessage = 'Already completed';
        } else {
            $scope.errMessage = 'Need prereq: ' + prereqsCheckResult.unfinishedPrereqs;
        }
    };

    $scope.removeMark = function (_class, index) {
        $scope.data[_class].completed = false;
        $scope.classesTaken.splice(index, 1);
        if (!$scope.data[_class].required) {
            $scope.electives.push($scope.electives.indexOf(_class));
            $scope.electivesCredits -= $scope.data[_class].credits;
        }
        $scope.credits -= $scope.data[_class].credits;
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

});

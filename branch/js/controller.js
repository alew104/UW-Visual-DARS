

// jQuery-style module pattern
(function($) {
    var myApp = angular.module('myApp', []);
    
    myApp.service('myServ', function ($http) {
        var self = this;
        
        self.courses = {};
        self.courses.offered = [];
        

        self.get_ts = function() {
            // using whateverorigin.org allows bypassing the Same-Origin Policy
            const url_xsop = 'http://whateverorigin.org/get?url=';   
            const url_ts = 'http://www.washington.edu/students/timeschd/'; 
            
            // hard-coded but may have time to write a function to determine the year and next quarter
            const qtr = 'AUT';
            const year = '2015';
            const dept = ['info', 'cse', 'engl', 'stat', 'qmeth'];
            
            dept.map(function(d) {
                // encode to ensure safety when accepting foreign strings
                var path = encodeURIComponent(qtr.toUpperCase() + year + '/' + d.toLowerCase() + '.html');
                var url = url_xsop + url_ts + path +  + '&callback=?';

//                $http.get(url)
//                        .success(function(json) {
//                            var str = json.contents.replace(/[\s]+/gi, ' ').replace(/&nbsp;/gi, '');
//                            var match = '';
//                            const regex = /<A NAME=(info|cse|stat|engl|qmeth)\d{3}/ig;
//                            do {
//                                match = regex.exec(str);
//                                if (match)
//                                    courses.offered.push(match[0].substr(8));
//                            } while (match != null); 
//                        })
//                        .error(function() {
//                            console.log("error");
//                        });
                $.ajax({
                    url: url_xsop + url_ts + path + '&callback=?', 
                    dataType: 'json',
                    async: false,
                    success: function(json) {
                        const regex = /<A NAME=(info|cse|stat|engl|qmeth)\d{3}/ig;
                        var str = json.contents.replace(/[\s]+/gi, ' ').replace(/&nbsp;/gi, '');
                        var match = '';
                        do {
                            match = regex.exec(str);
                            if (match)
                                courses.classes.push(match[0].substr(8));
                        } while (match != null); 
                    }
                });
            });
        };

        self.get_ts();
    });

    var myCtrl = function($scope, myServ) {
        $scope.offerings = myServ.courses.offered;

        $scope.data = data.classes;
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

        $scope.suggestClasses = function(_class) {
            if($scope.data[_class].completed) {
                return false;
            }
            return $scope.offerings.indexOf(_class) > -1;
        };

        $scope.checkCompleted = function(_class) {
            return $scope.data[_class].completed;
        };

        $scope.changeCompletedStatus = function (_class) {
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
                $scope.errMessage = 'Missing prerequisites: ' + prereqsCheckResult.unfinishedPrereqs;
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
        
    };
    
    myApp.controller('myCtrl', myCtrl);

})(jQuery);

 var baseUrl;
 var apiQuery;
 var classes;
 var accessToken;
 var data;
 var myApp = angular.module('myApp', [])


// allows us to order by a property within the object
myApp.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
            return filtered;
    };
});



var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
    //untested getClasses function just pulled from my spotifyapp
    function getClasses (userId, playlistId) {
        return $.ajax({
            async:false,
            url: "https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks",
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            success: function(threadsResults) {
                playlistTracks = threadsResults.items;
                parseTracks(playlistTracks);
            }
        });
    };
};

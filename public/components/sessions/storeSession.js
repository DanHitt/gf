var app = angular.module("GamesApp");

app.service("StoreSessionService", ["$http", "$localStorage", function ($http, $localStorage) {

    this.getStores = function () {
        var state = $localStorage.state;
        return $http.get("/stores/" + state).then(function (response) {
            return response.data;
        });
    };
    this.byStateGetStores = function (state) {
        return $http.get("/stores/" + state).then(function (response) {
            return response.data;
        });
    };

    this.makeFavoriteStore = function (store) {
        return $http.get("/api/sessionMaster/makeStoreFavorite/" + store).then(function (response) {
            return response.data
        })
    }

    this.getSessions = function (storeId) {
        console.log(storeId)
        return $http.get("/storeSessions/" + storeId).then(function (response) {
            return response.data;
        })
    }

    this.deleteMySession = function (sessionId) {
        console.log('service')
        return $http.delete("/api/sessionMaster/deleteMySession/" + sessionId).then(function (response) {
            return response.data
        })
    }

    this.joinSession = function (sessionId) {
        return $http.get("/api/sessionMaster/joinSession/" + sessionId).then(function (response) {
            return response;
        })
    }

    this.exitSession = function (sessionId) {
        return $http.get("/api/sessionMaster/exitSession/" + sessionId).then(function (response) {
            return response;
        })
    }


    this.getGames = function () {
        return $http.get("/games").then(function (response) {
            return response.data;
        });
    };
}]);

app.controller("StoreSessionController", ["$scope", "$localStorage", "$location", "StoreSessionService", "UserService", function ($scope, $localStorage, $location, StoreSessionService, UserService) {

    $scope.userService = UserService;
    $scope.showSession = false;
    $scope.showJoinButton = true;
    $scope.size = 1;
    $scope.myState = $localStorage.state;
    $scope.myStore = $localStorage.myStore || 'None';
    $scope.storeId = $localStorage.storeInfo._id;
    $scope.storeName = $localStorage.storeInfo.name;
    $scope.store = $localStorage.storeInfo;
    $scope.name = $localStorage.name;


    $scope.getSessions = function (storeId) {
        StoreSessionService.getSessions(storeId).then(function (storeSessions) {
            $scope.sessions = storeSessions;
            $scope.sessionsFull = storeSessions;
        })
    }
    $scope.getSessions($scope.storeId);

    $scope.getGames = function () {
        StoreSessionService.getGames().then(function (games) {
            console.log(games);
            $scope.games = games;
            $scope.games.unshift({name: "None"});
        });
    }
    $scope.getGames();

    $scope.filterByDate = function (dateFilter) {
        // not working due to format of date save...look at moment.js?
        console.log(dateFilter)
        var temp = [];
        if (dateFilter) {
            for (var i = 0; i < $scope.sessionsFull.length; i++) {
                if ($scope.sessionsFull[i].dateOfSession === dateFilter) {
                    temp.push($scope.sessionsFull[i]);
                }
            }
            $scope.sessions = temp;
        }

    }

    $scope.filterByGame = function (gameFilter) {
        console.log(gameFilter);
        var temp = [];
        if (gameFilter.name === "None") {
            $scope.sessions = $scope.sessionsFull;
            return;
        } else if (gameFilter) {
            for (var i = 0; i < $scope.sessionsFull.length; i++) {
                if ($scope.sessionsFull[i]._game.name){
                    if ($scope.sessionsFull[i]._game.name === $scope.gameFilter.name) {
                        temp.push($scope.sessionsFull[i]);
                    }
                }

            }
            $scope.sessions = temp;

        } else return;


    }

    $scope.deleteMySession = function (sessionId) {
        console.log('sessionId: ' + sessionId);
        StoreSessionService.deleteMySession(sessionId).then(function (response) {
            console.log('done delete')
            toastr.success(response.message)
            $scope.stores = [];
        }, function (response) {
            toastr.error(response.message)
        })

    }

    $scope.makeFavoriteStore = function (storeId, storeName) {
        $scope.myStore = storeName;
        $localStorage.myStore = storeName;
        //
        StoreSessionService.makeFavoriteStore(storeId).then(function (response) {
            console.log(response)
            $location.path("/showStores")
            toastr.success(response.message)
        }, function (response) {
            toastr.error(response.message);
        })
        $scope.stores = $scope.stores;
    }


    $scope.sessionCreator = function (id) {
        $localStorage.store = id;
        $location.path('/createSession');
    }

    $scope.joinSession = function (sessionId) {
        StoreSessionService.joinSession(sessionId).then(function (response) {
            console.log(response)
            toastr.success(response.data.message);
            $location.path("/showStores");
        }, function (response) {
            toastr.error(response.data.message);
        })
    }

    $scope.exitSession = function (sessionId) {
        StoreSessionService.exitSession(sessionId).then(function (response) {
            toastr.success(response.data.message)
            $location.path("/showStores");
        }, function (response) {
            toastr.error(response.data.message);
        })
    }

}]);

app.directive("logoFull", function () {
    return {
        template: '<img src="images/eyeLogo.svg" alt="Gamefinder: Find Players.  Find Games.">'
    }
})

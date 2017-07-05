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


}]);

app.controller("StoreSessionController", ["$scope", "$localStorage", "$location", "StoreSessionService", "UserService", function ($scope, $localStorage, $location, StoreSessionService, UserService) {

    $scope.userService = UserService;
    $scope.showSession = false;
    $scope.showJoinButton = true;
    $scope.size = 1;
    $scope.myState = $localStorage.state;
    $scope.myStore = $localStorage.myStore || 'None';
    $scope.storeId = $localStorage.storeInfo.storeId;
    $scope.storeName = $localStorage.storeInfo.storeName;
    $scope.name = $localStorage.name;


    $scope.getSessions = function (storeId) {
        StoreSessionService.getSessions(storeId).then(function (storeSessions) {
            $scope.sessions = storeSessions;
            console.log(storeSessions)
        })
    }
    $scope.getSessions($scope.storeId);

    $scope.deleteMySession = function (sessionId) {
        console.log('sessionId: ' + sessionId);
        StoreSessionService.deleteMySession(sessionId).then(function (response) {
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

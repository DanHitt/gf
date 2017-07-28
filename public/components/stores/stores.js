var app = angular.module("GamesApp");

app.service("StoresService", ["$http", "$localStorage", function ($http, $localStorage) {

    this.getStores = function () {
        var state = $localStorage.state;
        return $http.get("/stores/" + state).then(function (response) {
            return response.data;
        });
    };

    this.getStoreByName = function (storeName) {
        return $http.get("/stores/getStoreByName/" + storeName).then(function (response) {
            return response.data;
        })
    }

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
        return $http.get("/storeSessions/" + storeId).then(function (response) {
            return response.data;
        })
    }

    this.getUser = function (userId) {
        return $http.get("/api/sessionMaster/getUser").then(function (response) {
            return response.data
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

app.controller("StoresController", ["$scope", "$localStorage", "$location", "StoresService", "UserService", "$modal", function ($scope, $localStorage, $location, StoresService, UserService, $modal) {

    $scope.store = {};
    $scope.stores = [];
    $scope.userService = UserService;
    $scope.showSession = false;
    $scope.showJoinButton = true;
    $scope.size = 1;
    $scope.myState = $localStorage.state;
    $scope.myStore = $localStorage.myStore || 'None';
    $scope.dateFilter = new Date();
    $scope.supported = false;

    $scope.states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    //*******************modals
    $scope.open = function (message) {
        var fullMessage = "<div><center><h1>Comments</h1></center><h3 style='padding-left:10px'>" + message + "</h3></div>"
        var modalInstance = $modal.open({
            template: fullMessage,
        });
    }
    $scope.openAddy = function (store) {
            var fullMessage = "<div><center><h1>Full Address</h1></center><h3 style='padding-left:10px'>" + store.streetAddy + ' ' + store.city + ', ' + store.state + ' ' + store.zip + "</h3></div>"
            var modalInstance = $modal.open({
                template: fullMessage,
        });
    }
        //end modals***************
    $scope.getUser = function () {
        StoresService.getUser($localStorage.userId).then(function (user) {
            $scope.user = user;
        })
    }
    $scope.getUser();

    $scope.getStores = function () {
        StoresService.getStores().then(function (stores) {
            $scope.stores = stores;
            $scope.storesFull = stores;
            if ($localStorage.state) $scope.newState = $localStorage.state;
            $scope.cities = [];
            $scope.cities.push("None");
            $scope.cityFilter = $scope.cities[0];
            $scope.games = [];

            for (var i = 0; i < stores.length; i++) {
                if ($scope.cities.indexOf(stores[i].city) === -1) {
                    $scope.cities.push(stores[i].city)
                }
            }
            if ($scope.cities.lenth > 0) {
                $scope.cityFilter = cities[0]
            }
        });
    };
    $scope.getStores(); //init stores onload



    $scope.filterCity = function (cityFilter) {
        var temp = [];
        if (cityFilter === "None") {
            $scope.stores = $scope.storesFull;
            return;
        }
        for (var i = 0; i < $scope.storesFull.length; i++) {
            if ($scope.storesFull[i].city === cityFilter) {
                temp.push($scope.storesFull[i]);
            }
        }
        $scope.stores = temp;
    }

    $scope.filterByDate = function (dateFilter) {
        var temp = [];
        for (var i = 0; i < $scope.storesFull.length; i++) {
            //            if ($scope.storeFull[i].){
            //
            //            }
        }
    }

    $scope.getStoreSessions = function (store) {
        $localStorage.storeInfo = store;
        $location.path('/storeSession')
    }

    $scope.getStoreByName = function () {
        StoresService.getStoreByName($localStorage.myStore).then(function (store) {
            $scope.myStoreInfo = store
            $localStorage.storeInfo = {
                storeId: store._id,
                storeName: store.name
            };
            $location.path('/storeSession')
        })
    }

    $scope.deleteMySession = function (sessionId) {
        StoresService.deleteMySession(sessionId).then(function (response) {
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
        StoresService.makeFavoriteStore(storeId).then(function (response) {
            $location.path("/showStores")
            toastr.success(response.message)
        }, function (response) {
            toastr.error(response.message);
        })
        $scope.stores = $scope.stores;
    }

    $scope.changeState = function (newState) {
        StoresService.byStateGetStores(newState).then(function (stores) {
            $scope.stores = stores
        })
    }

    $scope.sessionCreator = function (id) {
        $localStorage.store = id;
        $location.path('/createSession');
    }

    $scope.getSessions = function (storeId) {
        StoresService.getSessions(storeId).then(function (storeSessions) {
            $scope.storeSessions = storeSessions;
        })
    }

    $scope.joinSession = function (sessionId) {
        StoresService.joinSession(sessionId).then(function (response) {
            toastr.success(response.data.message);
            $location.path("/showStores");
        }, function (response) {
            toastr.error(response.data.message);
        })
    }

    $scope.exitSession = function (sessionId) {
        StoresService.exitSession(sessionId).then(function (response) {
            toastr.success(response.data.message)
            $location.path("/showStores");
        }, function (response) {
            toastr.error(response.data.message);
        })
    }
    $scope.openGoogleMaps = function (store) {
        console.log(store);
        let location = "http://maps.google.com/?q=" + store.streetAddy + ", " + store.city + ", " + store.state + " " + store.zip + "/";
        window.open(location);

    }

}]);

app.directive('tooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).hover(function () {
                // on mouseenter
                $(element).tooltip('show');
            }, function () {
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

app.directive("logoFull", function () {
    return {
        template: '<img src="images/eyeLogo.svg" alt="Gamefinder: Find Players.  Find Games.">'
    }
})

var app = angular.module("GamesApp");

app.service("AddStoreService", ["$http", "$localStorage", function ($http, $localStorage) {

    this.addStore = function(store){
        return $http.push("/stores/", store).then(function (response) {
            return response.data
        })
    }





}]);

app.controller("AddStoreController", ["$scope", "$localStorage", "$location", "AddStoreService", "$modal", function ($scope, $localStorage, $location, AddStoreService, $modal) {



    $scope.states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


    $scope.addStore = function(store){
        AddStoreService.addStore(store).then(function(response){
            toastr.success(response.data.message);
            $location.path("/");
        }, function (response){
            toastr.error(response.data.message);

        })
    }




}]);



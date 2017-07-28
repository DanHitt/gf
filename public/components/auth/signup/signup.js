var app = angular.module("GamesApp.Auth");

app.controller("SignupController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.states = ['Alabama','Alaska','American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia', 'Florida',   'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia', 'Wisconsin', 'Wyoming'];


    $scope.passwordMessage = "";
    $scope.signup = function (user) {
        if (user.password !== $scope.passwordRepeat) {
            $scope.passwordMessage = "Password no matchy-matchy.";
        } else {
            UserService.signup(user).then(function(response) {
                toastr.success(response.data.message);
                $location.path("/login");
            }, function(response) {
                toastr.error(response.data.message);
            });
        }
    }
}]);

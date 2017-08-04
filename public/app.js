var app = angular.module("GamesApp", ["ngRoute", "GamesApp.Auth", "ngStorage", "ui.bootstrap"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html",
            controller: "HomeController"
        })
        .when("/games", {
            templateUrl: "components/games/games.html",
            controller: "GamesController"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "ProfileController"
        })
        .when("/findSession", {
            templateUrl: "components/sessions/sessions.html",
            controller: "findSessionsController"
        })
        .when("/createSession", {
            templateUrl: "components/sessions/createSession.html",
            controller: "CreateSessionController"
        })
        .when("/showStores", {
            templateUrl: "components/stores/stores.html",
            controller: "StoresController"
        })
        .when("/storeSession", {
            templateUrl: "components/sessions/storeSession.html",
            controller: "StoreSessionController"
        })
        .when("/addStore", {
            templateUrl: "components/stores/addStore.html",
            controller: "AddStoreController"
        })

}]);

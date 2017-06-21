"use strict";

app.controller("ProfileFormCtrl", function($scope, DataFactory, $location, $routeParams, $window, AuthFactory) {

    let user = AuthFactory.getUser();

    $routeParams.userId = user;
    console.log("user", user);

    DataFactory.getProfile({ uid: user })
        .then(stuff => {
            $scope.profile = stuff.data;
        });

    $scope.editProfile = () => {
        DataFactory.editProfile(user, $scope.profile)
            .then(() => {
                $location.url("/boards");
            });
    };

});

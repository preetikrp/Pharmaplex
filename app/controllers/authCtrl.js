"use strict";

//login, logout, register, loginGoogle, clever conditional, authfactory
app.controller("AuthCtrl", function($scope, $window, AuthFactory, $location) {

    console.log("AuthCtrl is loaded");
    $scope.account = {
        email: "",
        password: ""
    };
    //change below with $window.location also, remove scocpe from logout
    // logout has no scope applied since it is only called internally
    let logout = () => {
        console.log("logout clicked");
        AuthFactory.logoutUser()
            .then(function(data) {
                console.log("logged out?", data);
                $window.location.url = "#!/";
            }, function(error) {
                console.log("error occured on logout");
            });
    };

    //when first loaded, make sure no one is logged in
    if (AuthFactory.isAuthenticated()) {
        logout();
    }

    $scope.register = () => {
        console.log("you clicked register");
        AuthFactory.createUser({
                email: $scope.account.email,
                password: $scope.account.password
            })
            .then((userData) => {
                console.log("UserCtrl newUser:", userData);
                $scope.login();
            }, (error) => {
                console.log("Error creating user:", error);
            });
    };

    $scope.login = () => {
        console.log("you clicked login");
        AuthFactory
            .loginUser($scope.account)
            .then(() => {
                // $scope.isLoggedIn = true;
                // console.log("UserCtrl: user is loggedIn", $scope.isLoggedIn );
                // $scope.$apply();
                $window.location.href = "#!/Home";
            });
    };

    $scope.loginGoogle = () => {
        console.log("you clicked login with Google");
        AuthFactory.authWithProvider()
            .then(function(result) {
                var user = result.user.uid;
                console.log("logged in user:", user);
                //Once logged in, go to another view
                $location.path("/task-list");
                $scope.$apply();
            }).catch(function(error) {
                // Handle the Errors.
                console.log("error with google login", error);
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    };
});

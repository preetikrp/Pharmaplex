"use strict";
app.controller('SearchCtrl', function($scope, AuthFactory, $window, DataFactory) {
    $scope.isLoggedIn = false;
    $scope.SearchText;

    $scope.searchForDrug = function() {
        DataFactory.getDrugData($scope.SearchText)
        .then((tasks) => {
        	console.log("tasks", tasks);
        	//response.write(tasks);
        })
    }


});

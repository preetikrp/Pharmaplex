"use strict";
console.log("Hi");




app.controller('myCtrl', function($scope, $http) {
    $scope.$watch('search', function() {
        $scope.$watch('singleSelect', function() {
            fetch();
        });
    });


    $scope.search = "";
    $scope.singleSelect = "";

    function fetch() {
        console.log("here");
        $http.get(EncryptPayload($scope.search, $scope.singleSelect, "cdd6bf883c", "2qG4/R1YcWWWmE7F5j1hjA=="))
            .then(function(response) {
                $scope.myData = response.data;

                $scope.candidates = $scope.myData.data.candidates;

                if ($scope.singleSelect === 'di') {
                    $scope.druginfo = $scope.myData.data.drugs.tablet;
                }


                // if($scope.singleSelect ==='fp'){
                $scope.fairprice = $scope.myData.data.mobile_url;
                //}

            });
    };
})

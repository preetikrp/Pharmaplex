"use strict";

app.factory("DataFactory", function($q, $http, fbcreds) {

const getDrugData = (SearchText) => {
    return $q((resolve, reject) => {
       $http.get(EncryptPayload(SearchText, "cdd6bf883c", "2qG4/R1YcWWWmE7F5j1hjA=="))
            .then(function(response) {
                
                resolve(response.data);
               //$scope.myData = response.data;
                console.log("response: " + response.status);
                console.log("response: " + response.data);
            })


        .catch((error) => {
            reject(error);
        });
    });

}
return {
    getDrugData
}

});

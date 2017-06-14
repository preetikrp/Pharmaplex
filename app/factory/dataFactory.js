"use strict";

app.factory("DataFactory", function($q, $http, fbcreds) {
//making http call from factory so multiple controller can connects us to the data.


	$http.get(EncryptPayload("lipitor", "cdd6bf883c", "2qG4/R1YcWWWmE7F5j1hjA=="))
        .then(function(response) {
            console.log("response: " + response.status);
        });

});

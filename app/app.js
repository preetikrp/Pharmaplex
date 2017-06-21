"use strict";

document.writeln("<script type='text/javascript' src='./app/hmac-sha256.js'></script>");
document.writeln("<script type='text/javascript' src='./app/enc-base64-min.js'></script>");

function EncryptPayload(searchqry, singleSelect, api_key, sec_key) {
    var qry = "name=" + searchqry + "&api_key=" + api_key;
    var hash = CryptoJS.HmacSHA256(qry, sec_key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    var stringReplaced = hashInBase64.replace(/[+]/g, "_");
    var finalSignature = stringReplaced.replace(/[/]/g, "_");
    var apiname = "";
    if (singleSelect === "fp") {
        apiname = "http://localhost:6060/api/goodrx/fair-price?name=";
    } else if (singleSelect === "cp") {
        apiname = "http://localhost:6060/api/goodrx/compare-price?name=";
    } else if (singleSelect === "lp") {
        apiname = "http://localhost:6060/api/goodrx/low-price?name=";

    } else if (singleSelect === "di") {
        apiname = "http://localhost:6060/api/goodrx/drug-info?name=";
    } else if (singleSelect === "ds") {
        apiname = "http://localhost:6060/api/goodrx/drug-search?name=";
    } else {
        apiname = "http://localhost:6060/api/goodrx/fair-price?name=";
    }

    //console.log("http://localhost:6060/api/goodrx/compare-price?name=" + searchqry + "&api_key=" + api_key + "&sig=" + finalSignature);
    //return ("http://localhost:6060/api/goodrx/compare-price?name=" + searchqry + "&api_key=" + api_key + "&sig=" + finalSignature);

    console.log(apiname + searchqry + "&api_key=" + api_key + "&sig=" + finalSignature);
    return (apiname + searchqry + "&api_key=" + api_key + "&sig=" + finalSignature);

}



const app = angular.module("myApp", ["ngRoute"]);

let isAuth = (AuthFactory) =>
    new Promise((resolve, reject) => {
        AuthFactory.isAuthenticated()
            .then((userExists) => {
                if (userExists) {
                    console.log("Authenticated, go ahead");
                    resolve();
                } else {
                    console.log("Authentication rejected");
                    reject();
                }
            });
    });




app.config(($routeProvider) => {
    $routeProvider
        .when("/intro", {
            templateUrl: "partials/intro.html",
            controller: "myCtrl",
            resolve: { isAuth }
        })


    .when("/search", {
        templateUrl: "partials/searchPage.html",
        controller: "myCtrl"
            //resolve: { isAuth }
    })


    .when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCtrl"
        })
        .when("/logout", {
            templateUrl: "partials/login.html",
            controller: "AuthCtrl"

        })
        .when("/ContactUs", {
            templateUrl: "partials/Contact.html",
            controller: "profieleFormCtrl",
            resolve: { isAuth }
        })

    .otherwise("/");
});


app.run(($location, fbcreds) => {
    let cred = fbcreds;
    let authConfig = {
        apiKey: cred.apiKey,
        authDomain: cred.authDomain,
        databaseURL: cred.databaseUrl
    };

    firebase.initializeApp(authConfig);
});

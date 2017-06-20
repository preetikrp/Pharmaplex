"use strict";

document.writeln("<script type='text/javascript' src='./app/hmac-sha256.js'></script>");
document.writeln("<script type='text/javascript' src='./app/enc-base64-min.js'></script>");

function EncryptPayload(searchqry, api_key, sec_key) {
    var qry = "name=" + searchqry + "&api_key=" + api_key;
    var hash = CryptoJS.HmacSHA256(qry, sec_key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    var stringReplaced = hashInBase64.replace(/[+]/g, "_");
    var finalSignature = stringReplaced.replace(/[/]/g, "_");

    console.log("http://localhost:6060/api/goodrx/compare-price?name=" + searchqry + "&api_key=" + api_key + "&sig=" + finalSignature);
    return ("http://localhost:6060/api/goodrx/compare-price?name=" + searchqry + "&api_key=" + api_key + "&sig=" + finalSignature);

}


const app = angular.module("myApp", ["ngRoute"]);

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
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
    //.when("/", {
    // templateUrl: "partials/intro.html",
    //controller: "myCtrl",
    //resolve: { isAuth }
    // })

        .when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCtrl"
        })
        .when("/intro", {
            templateUrl: "partials/intro.html",
            resolve: {isAuth}
        })
        .when("/logout", {
            templateUrl: "partials/login.html",
            controller: "AuthCtrl"

        })
        .when("/ContactUs", {
            templateUrl: "partials/contact.html",
            //controller: "ContactUsCtrl",
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

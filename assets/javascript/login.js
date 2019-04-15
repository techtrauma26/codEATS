$(document).ready(function(){
    // ============================================================
    // FIREBASE Initialization ====================================
    // ============================================================

    const config = {
        apiKey: "AIzaSyC6JCjLeAlqzN4h32NAPlQdDKVv-Ij5qLc",
        authDomain: "codeats-43f9e.firebaseapp.com",
        databaseURL: "https://codeats-43f9e.firebaseio.com",
        projectId: "codeats-43f9e",
        storageBucket: "codeats-43f9e.appspot.com",
        messagingSenderId: "1033500801409"
      };

    firebase.initializeApp(config);
    const database = firebase.database();
    const rootReference = firebase.database().ref();
    let goodLogin = false;
    let userArray = [];
    // check Firebase to see if the user's input will match a username in the database
    rootReference.once("value") // pulls data one time 
    .then(function(snapshot) {
        // Pulls the key values for each item in the "users" folder in Firebase (i.e. the usernames)
        snapshot.child("users/").forEach(function(userSnapshot) {
            // create a temporary array with the available usernames
            userArray.push(userSnapshot.key);
        })
    });

    // When we load the page, first see if the username is in local storage from the "remember me" feature
    let localUserName = localStorage.getItem("codEATS-username");
    if (localUserName !== null && localUserName !== "null") {
        $("#username").val(localUserName);
    }

    $("#login-button").on("click", function(){
        let username = $("#username").val().trim();

        // check to see if the input was valid
        if (userArray.includes(username)) {
            console.log("cool")
            goodLogin = true;
        }
        else {
            goodLogin = false;
        }
        if (goodLogin) {
            // Save the username to session storage
            sessionStorage.setItem("username", username);
            // if the user checked the remember me button, save their username to localStorage
            if($("#login-remember").is(':checked')) {
                localStorage.setItem("codEATS-username", username);
            }
            // if the user did not check the button, enter a null entry for the username in local storage.
            else {
                localStorage.setItem("codEATS-username", null);
            }
            // take the user to the index page to start searching if their username was valid
            window.location.href = ("index.html");
        }
        else {
            alert("Your username was not found in our records. Please select a valid username!")
        }
    })

});
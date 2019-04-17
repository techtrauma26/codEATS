$(document).ready(function(){

    // Load the current user from session storage
    let currentUser = sessionStorage.getItem("username");
    let currentPage = window.location.href.split("/").pop();
    // Our API Key
    // *** Need to make this publicly hidden later
    let apiKey = "IkthJOhbnmrhVTwbTB6OGKMzeQSlDeLB9EIS35SKpaE6_N7K7Xo_JVhnh383r_cQNRFPAo9y73ifnCRqHwsuDvxtuV3tCtKC4azI9ciyF-PgiuQbKi4i6ozdnAiwXHYx";
    const categoriesList = ["American", "BBQ", "Pizza", "Indian", "Mexican", "Italian", "Chinese", "Japanese", "Korean", "Thai", "Mediterranean", "Vegetarian"];

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

    // ============================================================
    // Custom Functions ===========================================
    // ============================================================

    function buildCategories() {
        for (let i = 0; i < categoriesList.length; i++) {
            $("#list").append(`<option>${categoriesList[i]}</option>`);
        }
    }

    function pushFavorite(dbTestObject) {
        // *** need to update to object literal on user name. Currently hard coded for Cody.
        database.ref("users/cody/favorites").push(dbTestObject);
        //database.ref(`users/${currentUser}/favorites`).push(dbTestObject);
    }

    // the function that performs the yelp API call using data established by the user on the index.html page.
    function search() {
        let category = sessionStorage.getItem("category");
        let location = sessionStorage.getItem("location");
        let price = sessionStorage.getItem("price");
        let radius = sessionStorage.getItem("radius");
        let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${category}${location}${price}${radius}`;
        console.log(queryURL)
        
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        }).then(function(response) {
            //let dbTestObject = {"name": response.businesses[2].name, "id": response.businesses[2].id};
            console.log(response)
            for (let i = 0; i < response.businesses.length; i++) {
                // Pull data for each of the restaurants
                let name = response.businesses[i].name;
                let rating = response.businesses[i].rating;
                let reviewCount = response.businesses[i].review_count;
                let price = response.businesses[i].price;
                let ratingPath = "";
                // determine which image to use for the yelp rating
                switch (rating) {
                    case 0:
                        ratingPath = "assets/images/yelp_stars/large_0.png";
                        break;
                    case 1:
                        ratingPath = "assets/images/yelp_stars/large_1.png";
                        break;
                    case 1.5:
                        ratingPath = "assets/images/yelp_stars/large_1_half.png";
                        break;
                    case 2:
                        ratingPath = "assets/images/yelp_stars/large_2.png";
                        break;
                    case 2.5:
                        ratingPath = "assets/images/yelp_stars/large_2_half.png";
                        break;
                    case 3:
                        ratingPath = "assets/images/yelp_stars/large_3.png";
                        break;
                    case 3.5:
                        ratingPath = "assets/images/yelp_stars/large_3_half.png";
                        break;
                    case 4:
                        ratingPath = "assets/images/yelp_stars/large_4.png";
                        break;
                    case 4.5:
                        ratingPath = "assets/images/yelp_stars/large_4_half.png";
                        break;
                    case 5:
                        ratingPath = "assets/images/yelp_stars/large_5.png";
                        break;
                  }
                let profilePic = response.businesses[i].image_url;
                let card = 
                `<div class="card content-align-center">
                    <img class="card-img-top" id="cardMapImg" style="width: 200px; height: 200px; padding: 10px;" src="${profilePic}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                </div>
                    <ul class="list-group list-group-flush"s>
                        <li class="list-group-item" id="priceRange">${price}</li>
                        <li class="list-group-item" id="rating"><img src=${ratingPath} alt="yelp rating (${rating})"><img src="assets/images/yelp_stars/Yelp_trademark_RGB_outline.png" alt="Yelp Logo" style="width: 100px;"><p style="font-size: 10pt; color: #767777;">${reviewCount} Reviews</p></li>
                    </ul>
                </div>`;
                $("#search-results").append(card);
            }
        });

    }

    buildCategories();
    // If we are on the search page, perform the API call.
    if (currentPage === "results.html") {
        search();
    }

    $("#geolocation").on("click", function(){
        if($("#geolocation").is(':checked')) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(userPosition);

                function userPosition(position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    currentLocation = `&latitude=${latitude}&longitude=${longitude}`;
                    sessionStorage.setItem("location", currentLocation);
                }
              }
              else {
                  alert("Geolocation functionality is not supported by your browser. Please type in a location.")
              }
        }
    })

    $("#eat").on("click", function(){
        // clear variables
        let currentCategory = "";
        let currentLocation = "";
        let currentPrice = "";
        let currentRadius = 0;
        // rough code for making a modal appear if minimum search criteria is not met.

        currentCategory = $("#list").val();
        if (currentCategory !== "Food Category") {
            currentCategory = currentCategory.toLowerCase() + "+food";
            sessionStorage.setItem("category", currentCategory); // store variable in session data to use on search page
        }

        // check to see if geolocation marker is NOT checked. If not, we use text entry
        if ($("#geolocation").is(':checked')) {
        }
        else {
            console.log("wow")
            currentLocation = $("#location-input").val().trim().toLowerCase(); // convert to lowercase and remove all extra spaces w/ trim
            currentLocation = currentLocation.replace(/\s/g, "+"); // remove all spaces from input and replace with + (so it will work with api)
            if (currentLocation.trim() !== undefined && currentLocation.trim() !== "") {
                currentLocation = "&location=" + currentLocation;
                sessionStorage.setItem("location", currentLocation);
            }
            else {
                // *** should probably change this to a modal
                currentLocation = "";
            }
        }
        // *** make SMART later
        // if current price is not undefined, grab from DOM. Else, insert empty string.
        currentPrice = "&price=2";
        sessionStorage.setItem("price", currentPrice);
        //let currentPrice = $("#price").val();
        if (currentPrice === undefined) {
            currentPrice = ""; // insert a blank string so as to not modify the API call.
        }
        // *** make SMART later
        //let currentRadius = $("#radius").val();
        currentRadius = "&radius=5000"
        sessionStorage.setItem("radius", currentRadius);
        if (currentRadius === undefined) {
            currentRadius = "";
        }

        // *** make sure it only takes them to the new page if the criteria are met.
        window.location.href = ("results.html");

    })

    // ========= Testing below


    // *** pulling data one time most for testing. Later, we will need to update this each time you load the lists
    rootReference.once("value") // pulls data one time 
        .then(function(snapshot) {
            // returns the array of objects in the users/name/favorites section
            let favoritesList = snapshot.child(`users/${currentUser}/favorites`).val();
            let blackList = snapshot.child(`users/${currentUser}/blacklist`).val();

            // This section of code loops through each item in the favorites list and appends it to a list.
            snapshot.child("users/cody/favorites").forEach(function(favoriteSnapshot) {
                let listItemText = favoriteSnapshot.val().name;
                let listItemID = favoriteSnapshot.val().id;

                let listItem = $("<li>");
                listItem.text(listItemText);
                listItem.attr("id", listItemID);
                // *** uncomment once we have an ID from front end team
                // $("#content").append(listItem);

            })
        });
});
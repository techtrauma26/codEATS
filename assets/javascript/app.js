$(document).ready(function () {

    $("#favorite-alert").hide();
    $("#blacklist-alert").hide();
    // Load the current user from session storage
    let currentUser = sessionStorage.getItem("username");
    let currentPage = window.location.href.split("/").pop();
    // Our API Key
    // *** Need to make this publicly hidden later
    let apiKey = "IkthJOhbnmrhVTwbTB6OGKMzeQSlDeLB9EIS35SKpaE6_N7K7Xo_JVhnh383r_cQNRFPAo9y73ifnCRqHwsuDvxtuV3tCtKC4azI9ciyF-PgiuQbKi4i6ozdnAiwXHYx";
    const categoriesList = ["American", "BBQ", "Pizza", "Indian", "Mexican", "Italian", "Chinese", "Japanese", "Korean", "Thai", "Mediterranean", "Vegetarian", "Doughnuts"];
    let noResults = true;

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
            $("#favoriteDropdown").append(`<option>${categoriesList[i]}</option>`);
            $("#blacklistDropdown").append(`<option>${categoriesList[i]}</option>`);
        }
    }

    function pushFavorite(favoriteObject) {
        database.ref(`users/${currentUser}/favorites`).push(favoriteObject);
    }
    function pushBlacklist(blacklistObject) {
        database.ref(`users/${currentUser}/blacklist`).push(blacklistObject);
    }

    function navbar() {
        var modal = document.getElementById("myLinks");
        if (modal.style.display === "block") {
            modal.style.display = "none";
        } else {
            modal.style.display = "block";
        }
    }

    // the function that performs the yelp API call using data established by the user on the index.html page.
    function search() {
        let category = sessionStorage.getItem("category");
        let location = sessionStorage.getItem("location");
        let price = sessionStorage.getItem("price");
        let radius = sessionStorage.getItem("radius");
        let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${category}${location}${price}${radius}`;
        //console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        }).then(function (response) {
            //console.log(response)
            for (let i = 0; i < response.businesses.length; i++) {
                // Pull data for each of the restaurants
                let name = response.businesses[i].name;
                let isClosed = response.businesses[i].is_closed;
                if (isClosed === false) {
                    openImg = "assets/images/open.png"
                } else {
                    openImg = "assets/images/closed.png"
                };

                let phone = response.businesses[i].display_phone
                let dialPhone = response.businesses[i].phone
                let distanceRaw = response.businesses[i].distance
                let distanceMi = (distanceRaw / 1600).toFixed(2);

                let address1 = response.businesses[i].location.display_address[0];
                let address2 = response.businesses[i].location.display_address[1]
                let address3 = response.businesses[i].location.display_address[2];

                let lat = response.businesses[i].coordinates.latitude;
                let long = response.businesses[i].coordinates.longitude;

                if (address3 !== undefined) {
                    address = `${address1}, ${address2}, ${address3}`
                } else {
                    address = `${address1}, ${address2}`
                };

                let reviewCount = response.businesses[i].review_count;
                let price = response.businesses[i].price;
                let rating = response.businesses[i].rating;
                let businessID = response.businesses[i].id;
                let pricePath = "";
                //determine which image to use for the price
                switch (price) {
                    case "$":
                        pricePath = "assets/images/yelp_stars/price1.png";
                        break;
                    case "$$":
                        pricePath = "assets/images/yelp_stars/price2.png";
                        break;
                    case "$$$":
                        pricePath = "assets/images/yelp_stars/price3.png";
                        break;
                    case "$$$$":
                        pricePath = "assets/images/yelp_stars/price4.png";
                        break;
                }

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
                // create a bootstrap card and pass in variables for each restaurant
                let card =
                `<div class="card content-align-center" businessid="${businessID}" businessname="${name}" category="${category}" lat="${lat}" long="${long}">
                <div class= "row">
                <div class= "col-6">
                <img class="card-img-top" id="cardMapImg" style="width: 95%; height: 95%; padding: 10px 5px 5px 10px" src="${profilePic}" alt="Card image cap"> </div>
                <div class= "col-6">
                <img id="mapSelector" class="map" src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14.75&size=100x100&maptype=roadmap&markers=size:small|color:red%7C${lat},${long}&key=AIzaSyCsGFnE3jXUNWVPu8NNUTeDaRmDtRDIxiI" alt="map">
                </div> </div>
                <div class="card-body"> 
                <div class= "row">
                    <div class= "col-9 card-title" id="card-name">
                        <h5 class="card-title" id="name" style="float: left;">${name}</h5>
                    </div>
                    <div class= "col-3">
                        <i class="far fa-thumbs-down fa-lg"></i><i class="far fa-thumbs-up fa-lg"></i>
                    </div>
                </div>
                <div class= "row">
                    <div class= "col-12 restInfo">
                        <p class="restInfo" id="strAdd">${address}</p>
                    </div>
                </div>
                <div class= "row">
                    <div class= "col-6 restInfo">
                        <p class="restInfo"id="distance">Distance: ${distanceMi} mi</p>
                    </div>
                    <div class= "col-6 restInfo">
                        <p class="restInfo"id="phone"><a href="tel:${dialPhone}">${phone}</p>
                    </div>
                </div>            
            </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" id="priceRange"><img class="prices" src=${pricePath} alt="price range (${price})"><img id="open" src=${openImg} alt="open-${i}"></li>
                    <li class="list-group-item" id="rating"><img src=${ratingPath} alt="yelp rating (${rating})"><img src="assets/images/yelp_stars/Yelp_trademark_RGB_outline.png" alt="Yelp Logo" style="width: 100px;"><p class="pCard" style="font-size: 10pt; color: #767777;">${reviewCount} Reviews</p></li>
                </ul>
            </div>`;
                $("#search-results").append(card);
            }
        });

    }

    function userList(pathString, foodCategory, foodCategoryAPI) {
        rootReference.once("value") // pulls data one time 
            .then(function (snapshot) {
                let businessIdList = []; // initialize a list of business IDs. These will be passed into the API call at the end of this function.

                // use a connection string that takes the current user and a pathstring (either favorite or blacklist) to navigate to the correct part of the database.
                snapshot.child(`users/${currentUser}/${pathString}`).forEach(function (userSnapshot) {
                    let listItemID = userSnapshot.val().id; // get the business ID for the API call
                    let listItemCategory = userSnapshot.val().category; // get the category

                    // if the category in the database matches the dropdown category, add that business ID to the list we will pull.
                    if (listItemCategory === `${foodCategory}` || foodCategory === "All Favorites" || foodCategory === "All Blacklisted") {
                        businessIdList.push(listItemID);
                    }
                })
                // pass our matches from the database to the card building API for favorites and blacklists.
                userListCards(businessIdList, foodCategoryAPI);
            });
    }

    function userListCards(businessIdList, category) {
        for (let i = 0; i < businessIdList.length; i++) {

            let businessID = businessIdList[i];
            let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${businessID}`;
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${apiKey}`
                }
            }).then(function (response) {
                // console.log(response)
                let name = response.name;
                let isClosed = response.is_closed;
                if (isClosed === false) {
                    openImg = "assets/images/open.png"
                } else {
                    openImg = "assets/images/closed.png"
                };
                let phone = response.display_phone
                let dialPhone = response.phone
                let distanceRaw = response.distance
                let distanceMi = (distanceRaw / 1600).toFixed(2);

                let address1 = response.location.display_address[0];
                let address2 = response.location.display_address[1]
                let address3 = response.location.display_address[2];

                let lat = response.coordinates.latitude;
                let long = response.coordinates.longitude;

                let reviewCount = response.review_count;
                let price = response.price;
                let rating = response.rating;
                let businessID = response.id;
                let pricePath = "";
                if (address3 !== undefined) {
                    address = `${address1}, ${address2}, ${address3}`
                } else {
                    address = `${address1}, ${address2}`
                };
                //determine which image to use for the price
                switch (price) {
                    case "$":
                        pricePath = "assets/images/yelp_stars/price1.png";
                        break;
                    case "$$":
                        pricePath = "assets/images/yelp_stars/price2.png";
                        break;
                    case "$$$":
                        pricePath = "assets/images/yelp_stars/price3.png";
                        break;
                    case "$$$$":
                        pricePath = "assets/images/yelp_stars/price4.png";
                        break;
                }

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
                let profilePic = response.image_url;
                // create a bootstrap card and pass in variables for each restaurant
                let card =
                `<div class="card content-align-center" businessid="${businessID}" businessname="${name}" category="${category}" lat="${lat}" long="${long}">
                <div class= "row">
                <div class= "col-6">
                <img class="card-img-top" id="cardMapImg" style="width: 175px; height: 175px; padding: 10px 5px 5px 10px" src="${profilePic}" alt="Card image cap"> </div>
                <div class= "col-6">
                <img id="mapSelector" class="map" src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14.75&size=100x100&maptype=roadmap&markers=size:small|color:red%7C${lat},${long}&key=AIzaSyCsGFnE3jXUNWVPu8NNUTeDaRmDtRDIxiI" alt="map">
                </div> </div>
                <div class="card-body"> 
                <div class= "row">
                    <div class= "col-9 card-title" id="card-name">
                        <h5 class="card-title" id="name" style="float: left;">${name}</h5>
                    </div>
                    <div class= "col-3">
                        <i class="far fa-thumbs-down fa-lg"></i><i class="far fa-thumbs-up fa-lg"></i>
                    </div>
                </div>
                <div class= "row">
                    <div class= "col-12 restInfo">
                        <p class="restInfo" id="strAdd">${address}</p>
                    </div>
                </div>
                <div class= "row">
                    <div class= "col-6 restInfo">
                        <p class="restInfo"id="distance">Distance: ${distanceMi} mi</p>
                    </div>
                    <div class= "col-6 restInfo">
                        <p class="restInfo"id="phone"><a href="tel:${dialPhone}">${phone}</p>
                    </div>
                </div>            
            </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" id="priceRange"><img class="prices" src=${pricePath} alt="price range (${price})"><img id="open" src=${openImg} alt="open-${i}"></li>
                    <li class="list-group-item" id="rating"><img src=${ratingPath} alt="yelp rating (${rating})"><img src="assets/images/yelp_stars/Yelp_trademark_RGB_outline.png" alt="Yelp Logo" style="width: 100px;"><p class="pCard" style="font-size: 10pt; color: #767777;">${reviewCount} Reviews</p></li>
                </ul>
            </div>`;
                $("#search-results").append(card);
            });
        }
        if (businessIdList.length < 1 || businessIdList === undefined) {
            $("#search-results").append("<h4 class='text-center' style='color: darkgray; padding-top: 30px;'>No results to display for this Category!</h4>");
        }
    }

    // If we are on blacklist or favorite, add an extra catgory to the list
    if (currentPage === "favorites.html") {
        categoriesList.unshift("All Favorites");
    }
    if (currentPage === "blacklist.html") {
        categoriesList.unshift("All Blacklisted");
    }
    // run the buildCategories function by default
    buildCategories();
    // If we are on the search page, perform the API call.
    if (currentPage === "results.html") {
        search();
    }

    // ============================================================
    // Event Listener Functions ===================================
    // ============================================================

    // Directions API
    $("#search-results").on("click", "#mapSelector", function (){
        // get the geolocation latitude and longitude from checkbox function if available.
        let userLong = sessionStorage.getItem("geoLocLong");
        let userLat = sessionStorage.getItem("geoLocLat");
        //console.log(userLong, userLat)
        // get the lat and long of the restaurant in question from the div parent attributes.
        let longitude = $(this).parent().parent().parent().attr("long");
        let latitude = $(this).parent().parent().parent().attr("lat");
        // if the user selected geolocation, we will pass it in as the 
        if (userLong !== null && userLat !== null) {
            let userLocString = `&saddr=${userLat},${userLong}`
            // if we're on iOS, open in Apple Maps 
            if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPod") != -1)) {
                window.open(`maps://maps.google.com/maps/dir/?daddr=${latitude},${longitude}${userLocString}&amp;ll=`);
            }
            // else use Google
            else {
                window.open(`https://maps.google.com/maps/dir/?daddr=${latitude},${longitude}${userLocString}&amp;ll=`);
            }
        }
        else {
            // if we're on iOS, open in Apple Maps 
            if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPod") != -1)) {
                window.open(`maps://maps.google.com/maps/dir/?daddr=${latitude},${longitude}&amp;ll=`);
            }
            // else use Google
            else {
                window.open(`https://maps.google.com/maps/dir/?daddr=${latitude},${longitude}&amp;ll=`);
            }
        }

    })

    // THUMBS UP
    // Push a restaurant to your favorites list if you hit the thumbs up button
    $("#search-results").on("click", ".fa-thumbs-up", function () {
        // check to see if the user is logged in before they try to favorite something.
        if (currentUser === null) {
            $("#favoriteLoginModal").modal();
        }
        // if they are logged in, carry on with event listener function.
        else {
            // gather the necessary data packet from parent attributes.
            let favoriteName = $(this).parent().parent().parent().parent().attr("businessname");
            let favoriteBusinessID = $(this).parent().parent().parent().parent().attr("businessid");
            let favoriteCatgeory = $(this).parent().parent().parent().parent().attr("category");
            let businessIdList = [];
            let alreadyInList = false;

            rootReference.once("value") // pulls data one time from the database
                // get a list of the items from you favorite list and see if the business ID matches the one you are trying to favorite.
                .then(function (snapshot) {
                    snapshot.child(`users/${currentUser}/favorites`).forEach(function (userSnapshot) {
                        let listItemID = userSnapshot.val().id;
                        businessIdList.push(listItemID);
                        if (favoriteBusinessID === listItemID) {
                            alreadyInList = true;
                        }

                    })
                    if (alreadyInList === false) {
                        // construct an object to pass to the database.
                        let favoriteObject = { "name": favoriteName, "id": favoriteBusinessID, "category": favoriteCatgeory };
                        // push the new favorite object to the database.
                        $("#favorite-alert").fadeTo(2000, 500).slideUp(500, function () {
                            $("#favorite-alert").slideUp(500);
                        });
                        pushFavorite(favoriteObject);
                    }
                    else {
                        $("#favoriteExistsModal").modal();
                    }
                });
            // If we searched the database and did not find an ID already in the list, continue with database push.
        }
    });
    // THUMBS DOWN
    // same function as above, but for blacklisting a restaurant
    $("#search-results").on("click", ".fa-thumbs-down", function () {
        if (currentUser === null) {
            $("#favoriteLoginModal").modal();
        }
        else {
            let blacklistName = $(this).parent().parent().parent().parent().attr("businessname");
            let blacklistBusinessID = $(this).parent().parent().parent().parent().attr("businessid");
            let blacklistCatgeory = $(this).parent().parent().parent().parent().attr("category");
            let businessIdList = [];
            let alreadyInList = false;

            rootReference.once("value") // pulls data one time from the database
                // get a list of the items from you favorite list and see if the business ID matches the one you are trying to favorite.
                .then(function (snapshot) {
                    snapshot.child(`users/${currentUser}/blacklist`).forEach(function (userSnapshot) {
                        let listItemID = userSnapshot.val().id;
                        businessIdList.push(listItemID);
                        if (blacklistBusinessID === listItemID) {
                            alreadyInList = true;
                        }

                    })
                    if (alreadyInList === false) {
                        // construct an object to pass to the database.
                        let blacklistObject = { "name": blacklistName, "id": blacklistBusinessID, "category": blacklistCatgeory };
                        $("#blacklist-alert").fadeTo(2000, 500).slideUp(500, function () {
                            $("#blacklist-alert").slideUp(500);
                        });
                        pushBlacklist(blacklistObject);
                    }
                    else {
                        $("#blacklistExistsModal").modal();
                    }
                });
        }
    });

    $("#geolocation").on("click", function () {
        if ($("#geolocation").is(':checked')) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(userPosition);

                function userPosition(position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    currentLocation = `&latitude=${latitude}&longitude=${longitude}`;
                    sessionStorage.setItem("geoLocLat", latitude);
                    sessionStorage.setItem("geoLocLong", longitude);
                    sessionStorage.setItem("location", currentLocation);
                }
            }
            else {
                alert("Geolocation functionality is not supported by your browser. Please type in a location.")
            }
        }
    })

    $("#divWheel1").on("click", function () {
        console.log("CLICKED!")
        let currentPrice = ($(this).data("text"));
        console.log("CurrentPrice:", currentPrice);
    });

    $("#eat").on("click", function () {
        // clear variables
        let currentCategory = "";
        let currentLocation = "";
        let currentPrice = "";
        let currentRadius = 0;
        let usingGeoLoc = false;
        // rough code for making a modal appear if minimum search criteria is not met.

        currentCategory = $("#list").val();
        if (currentCategory !== "Food Category") {
            currentCategory = currentCategory.toLowerCase() + "+food";
            sessionStorage.setItem("category", currentCategory); // store variable in session data to use on search page
        }

        // check to see if geolocation marker is NOT checked. If not, we use text entry
        if ($("#geolocation").is(':checked')) {
            usingGeoLoc = true;
            //currentLocation = "GeoLoc";
        }
        else {
            currentLocation = $("#location-input").val().trim().toLowerCase(); // convert to lowercase and remove all extra spaces w/ trim
            currentLocation = currentLocation.replace(/\s/g, "+"); // remove all spaces from input and replace with + (so it will work with api)
            if (currentLocation.trim() !== undefined && currentLocation.trim() !== "") {
                currentLocation = "&location=" + currentLocation;
                sessionStorage.setItem("location", currentLocation);
            }
        }
        if (currentCategory === "Food Category" || (currentLocation === "" && usingGeoLoc === false)) {
            $("#indexModal").modal();
        }
        else {
            // *** make SMART later!
            // if current price is not undefined, grab from DOM. Else, insert empty string.
            // $(".wheelsUp").on("click", function () {
            //     console.log("CLICKED!")
            //     let currentPrice = ($(this).attr("data-wheelnav-navitemtext"));
            //     console.log("CurrentPrice:", currentPrice);
            //     sessionStorage.setItem("price", currentPrice);
            //     //let currentPrice = $("#price").val();
                if (currentPrice === undefined) {
                    currentPrice = ""; // insert a blank string so as to not modify the API call.
                }
                // *** make SMART later
                //let currentRadius = $("#radius").val();
                // currentRadius = "&radius=5000"
                // sessionStorage.setItem("radius", currentRadius);
                if (currentRadius === undefined) {
                    currentRadius = "";
                }

                // *** make sure it only takes them to the new page if the criteria are met.
                console.log("yo boi")
                window.location.href = ("results.html");
            
        };
    });

    // When changing the category list value on the favorites page, pass the category to a database search
    $("#favoriteDropdown").change(function () {
        $("#search-results").html(""); // clear the HTML of the search results when you change the category
        let foodCategory = $(this).val(); // get the foodcategory from the dropdown
        let foodCategoryAPI = "All Categories"
        if (foodCategory !== "All Favorites") {
            foodCategoryAPI = foodCategory.toLowerCase();
            foodCategory = foodCategoryAPI.toLowerCase() + "+food";
        }
        userList("favorites", foodCategory, foodCategoryAPI); // pass variables into a function to build a favorite or blacklist
    })
    // same function as above, but navigates to the blacklist for the user.
    $("#blacklistDropdown").change(function () {
        $("#search-results").html("");
        let foodCategory = $(this).val();
        let foodCategoryAPI = "All Categories"
        if (foodCategory !== "All Blacklisted") {
            let foodCategoryAPI = foodCategory.toLowerCase();
            foodCategory = foodCategoryAPI.toLowerCase() + "+food";
        }
        userList("blacklist", foodCategory, foodCategoryAPI);
    });
});
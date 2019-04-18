$(document).ready(function () {

    // Load the current user from session storage
    let currentUser = sessionStorage.getItem("username");
    let currentPage = window.location.href.split("/").pop();
    // Our API Key
    // *** Need to make this publicly hidden later
    let apiKey = "IkthJOhbnmrhVTwbTB6OGKMzeQSlDeLB9EIS35SKpaE6_N7K7Xo_JVhnh383r_cQNRFPAo9y73ifnCRqHwsuDvxtuV3tCtKC4azI9ciyF-PgiuQbKi4i6ozdnAiwXHYx";
    const categoriesList = ["American", "BBQ", "Pizza", "Indian", "Mexican", "Italian", "Chinese", "Japanese", "Korean", "Thai", "Mediterranean", "Vegetarian", "Doughnuts"];

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
        }).then(function (response) {
            console.log(response)
            for (let i = 0; i < response.businesses.length; i++) {
                // Pull data for each of the restaurants
                let name = response.businesses[i].name;
                let isClosed = response.businesses[i].is_closed
                console.log("isClosed:",isClosed)
                    if (isClosed === false) {
                        openImg = "assets/images/open.png"
                    } else {
                        openImg = ""
                    };

                    console.log("image:",openImg)

                let phone = response.businesses[i].display_phone
                let dialPhone = response.businesses[i].phone
                let distanceRaw = response.businesses[i].distance
                let distanceMi = (distanceRaw / 1600).toFixed(2);

                let address1 = response.businesses[i].location.display_address[0];
                let address2 = response.businesses[i].location.display_address[1]
                let address3 = response.businesses[i].location.display_address[2];
                
                if (address3 !== undefined) {
                    address = `${address1}, ${address2}, ${address3}`
                } else {
                    address = `${address1}, ${address2}`
                };

<<<<<<< HEAD
                console.log("address:", address)
=======
                // console.log("address:", address)
>>>>>>> 4cc2916696bfda477993ea347ac7b0168d4b74c7
                let reviewCount = response.businesses[i].review_count;
                let price = response.businesses[i].price;
                console.log("price:", price)
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
                    `<div class="card content-align-center" businessid="${businessID}" businessname="${name}" category="${category}">
                    <img class="card-img-top" id="cardMapImg" style="width: 200px; height: 200px; padding: 10px;" src="${profilePic}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title" id="name" style="float: left;">${name}</h5><i class="far fa-thumbs-down fa-lg"></i><i class="far fa-thumbs-up fa-lg"></i><br><br>
                    <p class="restInfo" id="strAdd">${address}</p><br>
                    <p class="restInfo"id="distance">Distance: ${distanceMi} mi</p>
                    <p class="restInfo"id="phone"><a href="tel:${dialPhone}">${phone}</p>

                    <div class="map" id="map"></div>
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

<<<<<<< HEAD
    function userList(pathString, foodCategory, foodCategoryAPI) {
        rootReference.once("value") // pulls data one time 
            .then(function (snapshot) {
                let businessIdList = []; // initialize a list of business IDs. These will be passed into the API call at the end of this function.

                // use a connection string that takes the current user and a pathstring (either favorite or blacklist) to navigate to the correct part of the database.
                snapshot.child(`users/${currentUser}/${pathString}`).forEach(function (userSnapshot) {
                    let listItemID = userSnapshot.val().id; // get the business ID for the API call
                    console.log(listItemID)
                    let listItemCategory = userSnapshot.val().category; // get the category
                   
                    // if the category in the database matches the dropdown category, add that business ID to the list we will pull.
                    if (listItemCategory === `${foodCategory}`) { 
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
                let name = response.name;
                let address1 = response.location.display_address[0];
                let address2 = response.location.display_address[1]
                let address3 = response.location.display_address[2];
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
                    `<div class="card content-align-center" businessid="${businessID}" businessname="${name}" category="${category}">
                    <img class="card-img-top" id="cardMapImg" style="width: 200px; height: 200px; padding: 10px;" src="${profilePic}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title" id="name" style="float: left;">${name}</h5><i class="far fa-thumbs-down fa-lg"></i><i class="far fa-thumbs-up fa-lg"></i><br><br>
                    <p id="strAdd">${address}</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="priceRange"><img class="prices" src=${pricePath} alt="price range (${price})"></li>
                        <li class="list-group-item" id="rating"><img src=${ratingPath} alt="yelp rating (${rating})"><img src="assets/images/yelp_stars/Yelp_trademark_RGB_outline.png" alt="Yelp Logo" style="width: 100px;"><p class="pCard" style="font-size: 10pt; color: #767777;">${reviewCount} Reviews</p></li>
                    </ul>
                </div>`;
                $("#search-results").append(card);
            });
        }
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

    // Push a restaurant to your favorites list if you hit the thumbs up button
    $("#search-results").on("click", ".fa-thumbs-up", function () {
        // gather the necessary data packet from parent attributes.
        let favoriteName = $(this).parent().parent().attr("businessname");
        let favoriteBusinessID = $(this).parent().parent().attr("businessid");
        let favoriteCatgeory = $(this).parent().parent().attr("category");
        // construct an object to pass to the database.
        let favoriteObject = { "name": favoriteName, "id": favoriteBusinessID, "category": favoriteCatgeory };
        // push the new favorite object to the database.
        pushFavorite(favoriteObject);
    })
    // same function as above, but for blacklisting a restaurant
    $("#search-results").on("click", ".fa-thumbs-down", function () {
        let blacklistName = $(this).parent().parent().attr("businessname");
        let blacklistBusinessID = $(this).parent().parent().attr("businessid");
        let blacklistCatgeory = $(this).parent().parent().attr("category");
        let blacklistObject = { "name": blacklistName, "id": blacklistBusinessID, "category": blacklistCatgeory };
        pushBlacklist(blacklistObject);
    })

    $("#geolocation").on("click", function () {
        if ($("#geolocation").is(':checked')) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(userPosition);
=======
    buildCategories();
    // If we are on the search page, perform the API call.
    if (currentPage === "results.html") {
        search();
    }

    // Push a restaurant to your favorites list if you hit the thumbs up button
    $("#search-results").on("click", ".fa-thumbs-up", function () {
        // gather the necessary data packet from parent attributes.
        let favoriteName = $(this).parent().parent().attr("businessname");
        let favoriteBusinessID = $(this).parent().parent().attr("businessid");
        let favoriteCatgeory = $(this).parent().parent().attr("category");
        // construct an object to pass to the database.
        let favoriteObject = { "name": favoriteName, "id": favoriteBusinessID, "category": favoriteCatgeory };
        // push the new favorite object to the database.
        pushFavorite(favoriteObject);
    })

    $("#geolocation").on("click", function () {
        if ($("#geolocation").is(':checked')) {
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

    $("#eat").on("click", function () {
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
        currentPrice = "&price=1";
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
>>>>>>> 4cc2916696bfda477993ea347ac7b0168d4b74c7

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

    $("#eat").on("click", function () {
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

<<<<<<< HEAD
        // *** make sure it only takes them to the new page if the criteria are met.
        window.location.href = ("results.html");

    })

    // When changing the category list value on the favorites page, pass the category to a database search
    $("#favoriteDropdown").change(function () {
        $("#search-results").html(""); // clear the HTML of the search results when you change the category
        let foodCategory = $(this).val(); // get the foodcategory from the dropdown
        let foodCategoryAPI = foodCategory.toLowerCase();
        foodCategory = foodCategoryAPI.toLowerCase() + "+food";
        userList("favorites", foodCategory, foodCategoryAPI); // pass variables into a function to build a favorite or blacklist
    })
    // same function as above, but navigates to the blacklist for the user.
    $("#blacklistDropdown").change(function () {
        $("#search-results").html(""); 
        let foodCategory = $(this).val();
        let foodCategoryAPI = foodCategory.toLowerCase();
        foodCategory = foodCategoryAPI.toLowerCase() + "+food";
        userList("blacklist", foodCategory, foodCategoryAPI);
    })

=======
    // *** pulling data one time most for testing. Later, we will need to update this each time you load the lists
    rootReference.once("value") // pulls data one time 
        .then(function (snapshot) {
            // returns the array of objects in the users/name/favorites section
            let favoritesList = snapshot.child(`users/${currentUser}/favorites`).val();
            let blackList = snapshot.child(`users/${currentUser}/blacklist`).val();

            // This section of code loops through each item in the favorites list and appends it to a list.
            snapshot.child(`users/${currentUser}/favorites`).forEach(function (favoriteSnapshot) {
                let listItemText = favoriteSnapshot.val().name;
                let listItemID = favoriteSnapshot.val().id;

                let listItem = $("<li>");
                listItem.text(listItemText);
                listItem.attr("id", listItemID);
                // *** uncomment once we have an ID from front end team
                // $("#content").append(listItem);

            })
        });

    // Initialize the platform object:
//     var platform = new H.service.Platform({
//         'app_id': '{dvLccvAou7nT9tE8cye8}',
//         'app_code': '{czCIkQ__dhmMRcg92ktOq}'
//       });
//       // Retrieve the target element for the map:
//       var targetElement = document.getElementById('map');
      
//       // Get the default map types from the platform object:
//       var defaultLayers = platform.createDefaultLayers();

// // Instantiate (and display) a map object:
// // var map = new H.Map(
// //   document.getElementById('mapContainer'),
// //   defaultLayers.normal.map,
// //   {
// //     zoom: 10,
// //     center: { lat: 52.5, lng: 13.4 }
// //   });
    
>>>>>>> 4cc2916696bfda477993ea347ac7b0168d4b74c7
});

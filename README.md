# codEATS
https://techtrauma26.github.io/codEATS/

codEATs is a mobile-first application that quickly matches its users with a restaurant tailored to the user’s circumstances in food category of interest, price tolerance, restaurant rating preferences, and travel ease. Selecting their choice in the above categories, codEATs provides the user with a selection of fits based on these choices and enables the user to launch their map and navigate to their selected restaurant.

# Getting Started
codEATS was designed with simplicity in mind. As such, the website should be fairly easy to navigate. Please see the below functionality by page:

- login.html:

This page will allow the user to login to codEATS. Only users with an existing valid user name will be able to log in with the current version. If the username does not exist in our Firebase database, a login error will occur. If "remember me" is checked at log in, the username will be saved to local storage for later use. Logging in is not necessary to use the application. 

- index.html:

- results.html:


- favorites.html and blacklist.html:

These two pages function in the same way. The user (if logged in), will be able to select a food category from the dropdown menu and display the favorite or banned restaurants from that category. Upon selecting a category, Firebase will return an array of unique Yelp business IDs to pass into the yelp business search API. It will use the results of these individual calls to pull data about the restaurants and display cards just like results.html for the user to view.

# Built With
- Bootstrap 4 - CSS Framework (w/ additional custom styling)
- Google Firebase - Database connection for user favorites/banned restaurants.
- Yelp API - Used for restaurant details a search engine.
- Google Places API - Used for map and navigation elements to restaurants.
- Pure Chat - Live business chat software.

# Versioning
Using github for version control.

# Authors
- Cody Clegg
- Vyjoo Frank
- Sam Mansfield
- Larry Evans

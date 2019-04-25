# codEATS
https://techtrauma26.github.io/codEATS/

codEATs is a mobile-first application that quickly matches its users with a restaurant tailored to the user’s circumstances in food category of interest, price tolerance, restaurant rating preferences, and travel ease. Selecting their choice in the above categories, codEATs provides the user with a selection of fits based on these choices and enables the user to launch their map and navigate to their selected restaurant.

# Getting Started
codEATS was designed with simplicity in mind. As such, the website should be fairly easy to navigate. Please see the below functionality by page:

- login.html:

This page will allow the user to login to codEATS. Only users with an existing valid user name will be able to log in with the current version. If the username does not exist in our Firebase database, a login error will occur. If "remember me" is checked at log in, the username will be saved to local storage for later use. Logging in is not necessary to use the application. 

- index.html:


This page is the main landing page for codEATS, and is known in the navigation bar as the Search page.  This page contains the main UI in which a user is able quickly identify their dining desires to generate a list of restaurants that will best quench their craving.  The page is designed to display all of the user inputs within the vertical viewport of the user’s mobile device with no scrolling required.  There are 2 required inputs on the page: 1) the category of restaurant the user wants to eat, and 2) the location of the user.  The page allows the user to either key in their current location, or check the box to allow codEATS to use the geolocation of the user.  This info is all codEATS needs to generate a restaurant list in the user’s vincity for the category the user is craving.  

There are also 3 additional optional search filters that can be used to fine tune the search results: 

1) PRICE- this filter allows the user to indicate their desired price point from $ to $$$$ with $ being the least expensive and $$$$ being the most.  A choice of $ will return only the cheapest price point for the category.  Selections of $$ or $$$ will contain a combination of these price points and lower price points, while $$$$ returns the most expensive.

2) RATING (SORT BY)- this filter allows the user to sort the results based on the Yelp rating for the restaurant.  The sort logic takes into account the number of reviews the restaurant has received, so a restaurant with a 4 star rating but a higher number of reviews could display higher than a restaurant with a 4.5 rating based on a limited number of reviews.  

3) RANGE- this filter allows the user to identify the preferred proximity of the results that are returned based on the consumer’s travel considerations.

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

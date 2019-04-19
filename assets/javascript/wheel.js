// //Initialize wheelnav by id
// var priceWheelnav = new wheelnav("divWheelnav");
// priceWheelnav.colors=["#ffc90e","#ff8000"]
// priceWheelnav.radius="30";
// priceWheelnav.createWheel(["$","$$","$$$","$$$$"]);

// var ratingWheelnav = new wheelnav("divWheelnav2");
// ratingWheelnav.colors=["#ff8000","#a90e15"]
// ratingWheelnav.radius="30";
// ratingWheelnav.createWheel(["1","2","3","4"]);

// var radiusWheelnav = new wheelnav("divWheelnav3");
// radiusWheelnav.colors=["#ff8000","#ffc90e"]
// radiusWheelnav.radius="30";
// radiusWheelnav.createWheel(["<1 mile","<5 miles","<10 miles","<50 miles"]);


// //Wrapper function for element without an ID attribute
// var wheelnavWrapper = function (elementwithoutid) {
//   var fakeid = "wheelnav";
//   var counter = 0;
//   while (document.getElementById(fakeid + counter.toString()) !== null) {
//     counter++;
//   }
  
//   if (elementwithoutid != null) {
//     if (!elementwithoutid.hasAttribute("id")) {
//       elementwithoutid.setAttribute("id", fakeid + counter.toString());
//     }
//     return new wheelnav(elementwithoutid.id);
//   }
// };

// //Initialize wheelnav by element
// var elementsbyname = document.querySelectorAll("div[name=test]");

// var wheelnav0 = wheelnavWrapper(elementsbyname[0]);
// wheelnav0.createWheel(["name","name","name","name"]);

// var wheelnav1 = wheelnavWrapper(elementsbyname[1]);
// wheelnav1.createWheel(["name","name","name","name"]);

// var elementbyclass = document.querySelector("div.wheelNav.withoutid");

// var wheelnav2 = wheelnavWrapper(elementbyclass);
// wheelnav2.createWheel(["class","class","class","class"]);

var priceWheel = new wheelnav("divWheel1");
var ratingWheel = new wheelnav("divWheel2");
var radiusWheel = new wheelnav("divWheel3");
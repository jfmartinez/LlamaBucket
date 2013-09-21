/*
*	Ideally this is how the items will be passed to the client side.
*/
var items = {
	content : [
	{ name : "Sword",
	  description: "An authentic samurai sword, from acient Japan",
	  year : 09,
	  brand : "AJB",
	  general: "Don't know what goes here",
	  category : 3,
	  price : 1.30,
	  image : "http://images4.wikia.nocookie.net/__cb20130105173711/runescape/images/c/cb/Steel_sword_detail.png"
	},
	{ name : "Kick Ass Ball",
	  description: "This is one kickass ball",
	  year : 09,
	  brand : "CoolShiii",
	  general: "Don't know what goes here",
	  category : 3,
	  price : 2.35,
	  image : "http://static.giantbomb.com/uploads/scale_small/0/6393/528516-1ball2.jpg"
	},
	{ name : "Toy Car",
	  description: "A toy car with some stolen tires",
	  year : 09,
	  brand : "MadFos",
	  general: "Don't know what goes here",
	  category : 3,
	  price : 2.23,
	  image : "http://img.dooyoo.co.uk/GB_EN/orig/0/8/4/4/9/844993.jpg"
	},
	{ name : "Nexus 4",
	  description: "Because it's awesome!",
	  year : 09,
	  brand : "Google",
	  general: "Don't know what goes here",
	  category : 1,
	  price : 250.00,
	  image : "http://www.notebookcheck.net/fileadmin/_migrated/pics/nexus4-1_02.png"
	},
	{ name : "iPhone 5",
	  description: "Aww yeah, it's an iPhone",
	  year : 09,
	  brand : "Apple",
	  general: "Don't know what goes here",
	  category : 1,
	  price : 570.99,
	  image : "http://cdn.arstechnica.net/wp-content/uploads/2012/09/iphone5-intro.jpg"
	},
	{ name : "YouWantIt",
	  description: "You don't know what this is, but you want it.",
	  year : 09,
	  brand : "YouWantIt.Com",
	  general: "Don't know what goes here",
	  category : 5,
	  price : 0.01,
	  image : "http://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/256px-006Charizard.png"
	}]
}

/*
* This is what the categories will be once the query is made, each category is a JSON containing an id, the category and it's parent category's id. 
*/
var categories = {
	content : [
	{ id : 1, category : "Books", parent : null},
	{ id : 2, category : "Electronics", parent : null},
	{ id : 3, category : "Computers", parent : null},
	{ id : 4, category : "Clothing", parent : null},
	{ id : 5, category : "Shoes", parent : null},
	{ id : 6, category : "Sports", parent : null},
	{ id : 7, category :  "Toys", parent : null},
	{ id : 8, category : "Children", parent : 1},
	{ id : 9, category : "Fiction", parent : 1},
	{ id : 10, category : "Technology", parent : 1},
	{ id : 11, category : "Business", parent : 1},
	{ id : 12, category : "TV", parent : 2},
	{ id : 13, category : "Audio", parent : 2},
	{ id : 14, category : "Phones", parent : 2},
	{ id : 15, category : "Cameras", parent : 2},
	{ id : 16, category : "Videos", parent : 2},
	{ id : 17, category : "Laptops", parent : 3},
	{ id : 18, category : "Desktops", parent : 3},
	{ id : 19, category : "Tablets", parent : 3},
	{ id : 20, category : "Printers", parent : 3},
	{ id : 21, category : "Children", parent : 4},
	{ id : 22, category : "Men", parent : 4},
	{ id : 23, category : "Shirts", parent : 22},
	{ id : 24, category : "Pants", parent : 22},
	{ id : 25, category : "Socks", parent : 22},
	{ id : 26, category : "Women", parent : 4},
	{ id : 27, category : "Shirts", parent : 26},
	{ id : 28, category : "Pants", parent : 26},
	{ id : 29, category : "Dresses", parent : 26},
	{ id : 30, category : "Children", parent : 5},
	{ id : 31, category : "Men", parent : 5},
	{ id : 32, category : "Women", parent : 5},
	{ id : 33, category : "Bycicles", parent : 6},
	{ id : 34, category : "Frames", parent : 33},
	{ id : 35, category : "Wheels", parent : 33},
	{ id : 36, category : "Helmet", parent : 33},
	{ id : 37, category : "Parts", parent : 33},
	{ id : 38, category : "Children", parent : 4},
	{ id : 39, category : "Fishing", parent : 6},
	{ id : 40, category : "Baseball", parent : 6},
	{ id : 41, category : "Golf", parent : 6},
	{ id : 42, category : "Basketball", parent : 6}
	]
}

var get_results = function(req, res, next)
{
	res.send(items);
}

var get_categories = function(req, res, next)
{
	res.send(categories);
}

exports.get_results = get_results;
exports.get_categories = get_categories;
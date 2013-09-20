var items = {
	content : [
	{ name : "Sword",
	  description: "An authentic samurai sword, from acient Japan",
	  year : 09,
	  brand : "AJB",
	  general: "Don't know what goes here",
	  category : 5,
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
	  category : 2,
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

var categories = {
	content : [
	"Books",
	"Electronics",
	"Computers",
	"Clothing",
	"Shoes",
	"Sports"
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
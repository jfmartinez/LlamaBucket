var items = {
	content : [
	{ name : "Sword",
	  description: "An authentic samurai sword, from acient Japan",
	  year : 09,
	  brand : "AJB",
	  general: "Don't know what goes here",
	  category : 5
	},
	{ name : "Kick Ass Ball",
	  description: "This is one kickass ball",
	  year : 09,
	  brand : "CoolShiii",
	  general: "Don't know what goes here",
	  category : 3
	},
	{ name : "Toy Car",
	  description: "A toy car with some stolen tires",
	  year : 09,
	  brand : "MadFos",
	  general: "Don't know what goes here",
	  category : 2
	},
	{ name : "Nexus 4",
	  description: "Because it's awesome!",
	  year : 09,
	  brand : "Google",
	  general: "Don't know what goes here",
	  category : 1
	},
	{ name : "iPhone 5",
	  description: "Aww yeah, it's an iPhone",
	  year : 09,
	  brand : "Apple",
	  general: "Don't know what goes here",
	  category : 1
	},
	{ name : "YouWantIt",
	  description: "You don't know what this is, but you want it.",
	  year : 09,
	  brand : "YouWantIt.Com",
	  general: "Don't know what goes here",
	  category : 5
	}]
}

var get_results = function(req, res, next)
{
	res.send(items);
}

exports.get_results = get_results;
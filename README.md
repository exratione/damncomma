damncomma.js
------------

Because we all hate that damn comma...

### What is the Damn Comma?

	[ 
	  "a",
	  "b", // <---- this is!
	]
	
	{
	  x: "x",
	  y: "y", // <---- so is this!
	}

If you came to Javascript from PHP or Python, you no doubt feel much as I do about the damn comma. So here is a quick hack to make you feel that much better about life.

### How Does it Work?

By introducing a little trivial preprocessing into require() and JSON.parse() to smooth away the damn commas. You use it like this - see /example:

	var dc = require("damncomma");
	dc.modules(true);
	dc.JSON(true);

	// existing modules are unaffected by the presence of damncomma. Probably. Maybe. But you like uncertainty, right?
	var path = require("path");
	var fs = require("fs");

	// load up a test module with damn commas, show that it works.
	var testModule = require("./dc.js");
	console.log(testModule.dcArray);
	console.log(testModule.dcObject);

	// load up and parse JSON with damn commas, show that it works.
	var filepath = path.resolve(__dirname, "./dc.json");
	var json = fs.readFileSync(filepath, "utf-8");
	var obj = JSON.parse(json);
	console.log(obj);

### Why Would I Even Use This?

Because you enjoy losing an annoying language feature and gaining the nebulous uncertainty that comes with introducing possibly deep and unexpected bugs. After all, who doesn't enjoy preprocessing the source code before it goes anywhere near a compiler or interpreter, such that it bears no semblance to what was written? Why, some of the most successful languages in history are practically built on that foundation - you'll be standing on the shoulders of giants!
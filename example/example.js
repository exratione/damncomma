var dc = require("damncomma");
dc.modules(true);
dc.JSON(true);

// existing modules are unaffected by the presence of damncomma
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

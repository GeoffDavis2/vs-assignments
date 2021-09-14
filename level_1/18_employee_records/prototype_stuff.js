console.clear();

function Person (nameParam, ageParam) {
    this.name = nameParam;
    this.age = ageParam;
}

// If not needing to use "this" then arrow function will work
Person.prototype.eat = foodParam => console.log("I just ate " + foodParam);

// But if you need to reference a "this" in the function, then you need the regular function syntax
//      Curly Brackets are also needed...
Person.prototype.sayMyName = function() {
    console.log("My Name is " + this.name)
};

var geoff = new Person("Geoff Davis", 55);

console.log(geoff);
console.log(Object.getPrototypeOf(geoff));
console.log(Object.keys(geoff));
for(p in geoff) console.log(p);
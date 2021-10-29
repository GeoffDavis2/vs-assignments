const x = [
    { a: 1, b: 1, c: 1 },
    { a: 1, b: 1, c: 1 },
    { a: 1, b: 1, c: 1 },
    { a: 1, b: 1, c: 1 },
    { a: 1, b: 1, c: 1 },
    { a: 1, b: 1, c: 1 },
    { a: 1, b: 1, c: 1 }
]

console.log(x);

let y = [...x];

console.log( y);

y[0].a = 2;
y[0].b = 2;
y[0].c = 2;


console.log( y);
console.log(x);
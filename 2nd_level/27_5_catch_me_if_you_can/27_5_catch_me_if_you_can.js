console.log('\33c');

// 1a
console.log('\n#1a');
function sum(x, y){
    try {
        if(typeof x != 'number') throw new Error('1st argument is not a number.');
        if(typeof y != 'number') throw new Error('2nd argument is not a number.');
        return x + y;
    } catch(err) {
        console.log(err.message);
        return null;
    }
}
console.log(sum('1', 2));


// 1b
console.log('\n#1b');
try {
    if(sum(-3, '3') === null) throw new Error('One of the arguments is not a number.');
    console.log(sum(-3, 3));
} catch(err) {
    console.log(err.message);
}


// 2a
console.log('\n#2a');
var user = {username: "sam", password: "123abc"};
function login(username, password){
    //check credentials
    try {
        if(user.username != username) throw new Error("Username doesn't match!");
        if(user.password != password) throw new Error("Password doesn't match!");
        console.log('Login successfull!');
        return true;
    } catch(err) {
        console.log(err.message);
        return false;
    }
}
login('x', '123abc');


// 2b
console.log('\n#2b');
try{
    console.log('Good Username & Password...');
    if(!login('sam', '123abc')) throw new Error('Login not successfull!');
    
    console.log('\nBad Username & Password...');
    if(!login('x', '123abc')) throw new Error('Login not successfull!');
} catch(err){
    console.log(err.message);
}
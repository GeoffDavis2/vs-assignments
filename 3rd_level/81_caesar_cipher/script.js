var readline = require('readline-sync');

const caesarCipherEncode = (input, shift = 0) =>
    input.split('').reduce((output, letter) => {
        let charCode = letter.charCodeAt(0);
        if ((charCode > 96) && (charCode < 123)) output += String.fromCharCode(((letter.charCodeAt(0) + shift - 97) % 26) + 97)
        else (output += letter);
        return output;
    }, '')

do {
    console.log('\033c');
    var input = readline.question('What phrase would you like to encrypt? ').toLowerCase();
    var shift = parseInt(readline.question('How many letters would you like to shift? '));
    console.log(caesarCipherEncode(input, shift));
    readline.question('Hit any key to continue...')
} while (true);
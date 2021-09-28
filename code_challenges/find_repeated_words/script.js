function strToArray(str) {
    // console.log('\nGet array of words. from the string');
    const arrayOfWords = str.split(' ');
    // console.log(arrayOfWords);
    return arrayOfWords;
}

function getUniqueWords(words) {
    // console.log('\nTurn arrayOfWords into array of unique words.');
    const uniqueWords = [];
    words.forEach(word => {
        word = word
            .toUpperCase()
            .replace(/[^A-Z]/g, '');
        if (!uniqueWords.some(e => e === word)) uniqueWords.push(word);
    });
    // console.log(uniqueWords);
    return uniqueWords;
};

function matchingWords(str) {
    console.log('\33cThe String...');
    console.log(str);

    const arrayOfWords = strToArray(str);
    const arrayOfUniqueWords = getUniqueWords(arrayOfWords);
}

// matchingWords('there are two times this string has two. This string is there. There are words');


function countUniqueWords(words) {
    // console.log('\nTurn arrayOfWords into array of objects with word and word count.');
    const uniqueWords = [];
    words.forEach(word => {
        word = word
            .toUpperCase()
            .replace(/[^A-Z]/g, '');
        i = uniqueWords.findIndex(obj => obj.word === word);
        if (i >= 0) uniqueWords[i].count++
        else uniqueWords.push({ word: word, count: 1 });
    });
    // console.table(uniqueWords);
    return uniqueWords;
};

function sortWordCountObjectsByCount(arr) {
    // console.log('\nSort array of word/count objects by count.');
    arr.sort((a, b) => a.count - b.count);
    // console.table(arr);
    return arr;
}

function filterArrayOfWordCountObjects(arr) {
    console.log('\nFilter array of word/count objects by count.');
    const filteredArray = arr.filter(e => (e.count > 1) && e.word.length >= 3);
    console.log(filteredArray);
    return filteredArray;
}

function main() {
    console.log('\33c');
    const str = "Banh mi pull skateboard ipsum lorem, kombucha scenester banjo. Franzen mlkshk consequat, PBR&B lever lever listicle irony pop-up sriracha on the saliva. Shabby on chic eu iceland far next level far lever pull drinking the right vinegar fanny pack pull minim right chicharrones migas.";
    // console.log(str);

    const arrayOfWords = strToArray(str);
    let arrayOfWordCountObjects = countUniqueWords(arrayOfWords);
    arrayOfWordCountObjects = arrayOfWordCountObjects.filter(obj => obj.count > 1);
    
    const sortedArrayOfWordCountObjects = sortWordCountObjectsByCount(arrayOfWordCountObjects);
    const filteredArrayOfWordCountObjects = filterArrayOfWordCountObjects(arrayOfWordCountObjects);
    console.log(filteredArrayOfWordCountObjects);
}

main();
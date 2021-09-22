const theHeader = document.getElementById('header');
theHeader.className = 'header';


// *********************** Qualifier *****************************
// The verbose way based on V-School lessons upto this point
const paraOne = document.createElement('p');
paraOne.id = 'para1';
paraOne.style.fontWeight = 'bold';
paraOne.style.fontSize = 'x-large';
paraOne.textContent = 'JavaScript Made This!!';
theHeader.appendChild(paraOne);

// By using Object.assign I can assign the ID at the same time that I appendChild
const paraTwo = theHeader.appendChild(Object.assign(document.createElement('p'), { id: 'para2' }));

// Add the 1st span which is my name
const theName = paraTwo.appendChild(Object.assign(document.createElement('span'), { id: 'the-name' }));
theName.className = 'name';
theName.textContent = 'Geoff';

// Add the 2nd span
const theRest = paraTwo.appendChild(Object.assign(document.createElement('span'), { id: 'the-rest' }));
theRest.textContent = ' made the Javascript';


// *********************** Bronze *****************************
// Change messages to "Something, fun, and, good"
document.getElementsByClassName('message left')[0].textContent = 'Something';
document.getElementsByClassName('message right')[0].textContent = 'fun';
document.getElementsByClassName('message left')[1].textContent = 'and';
document.getElementsByClassName('message right')[1].textContent = 'good';

// Add Event Listener to clear Messages if you click the clear-button
document.getElementById('clear-button').addEventListener('click', e => {
    const theMessages = document.getElementsByClassName('messages')[0];
    while (theMessages.lastElementChild) theMessages.removeChild(theMessages.lastElementChild);
});


// *********************** Silver *****************************

// 1st remove the backgroundColor settings in .left and .right
// This way when I change colors, the rest of .left and .right style still works
document.styleSheets[0].cssRules[5].style.backgroundColor = '';
document.styleSheets[0].cssRules[6].style.backgroundColor = '';

// Also set margin top to mesages for a little spacing
document.styleSheets[0].cssRules[4].style.marginTop = '2px';

// Now add my own style Rules for Background Color and Font Color (this goes into document.styleSheets[1])...
const myNewStyleElements = document.createElement('style');
document.head.appendChild(myNewStyleElements);

myNewStyleElements.sheet.insertRule('.left-alt1 {background-color: burlywood}');
myNewStyleElements.sheet.insertRule('.right-alt1 {background-color: lightblue}');

myNewStyleElements.sheet.insertRule('.left-alt2 {background-color: red; color:white}');
myNewStyleElements.sheet.insertRule('.right-alt2 {background-color: black; color:red}');

myNewStyleElements.sheet.insertRule('.left-alt3 {background-color: green}');
myNewStyleElements.sheet.insertRule('.right-alt3 {background-color: magenta}');

myNewStyleElements.sheet.insertRule('.left-alt4 {background-color: blue; color:yellow;}');
myNewStyleElements.sheet.insertRule('.right-alt4 {background-color: yellow; color:blue}');

// Set Messages to start out with left-alt1 and right-alt1 Color Theme
document.querySelectorAll('.left').forEach(theElement => theElement.className = 'message left left-alt1');
document.querySelectorAll('.right').forEach(theElement => theElement.className = 'message right right-alt1');

// Add dropdowns for other Color Themes (theme-three & theme-three)
const themeDropDown = document.getElementById('theme-drop-down');

const dropDown3 = document.createElement('option');
dropDown3.value = 'theme-three';
dropDown3.textContent = 'green/magenta';
themeDropDown.appendChild(dropDown3);

const dropDown4 = document.createElement('option');
dropDown4.value = 'theme-four';
dropDown4.textContent = 'yellow/blue';
themeDropDown.appendChild(dropDown4);

// Add the Event Listener to change the Color Themes
document.querySelector('#theme-drop-down').addEventListener('change', (event) => {
    switch (event.target.value) {
        case 'theme-one':
            document.querySelectorAll('.left').forEach(theElement => theElement.className = 'message left left-alt1');
            document.querySelectorAll('.right').forEach(theElement => theElement.className = 'message right right-alt1');
            break;

        case 'theme-two':
            document.querySelectorAll('.left').forEach(theElement => theElement.className = 'message left left-alt2');
            document.querySelectorAll('.right').forEach(theElement => theElement.className = 'message right right-alt2');
            break;

        case 'theme-three':
            document.querySelectorAll('.left').forEach(theElement => theElement.className = 'message left left-alt3');
            document.querySelectorAll('.right').forEach(theElement => theElement.className = 'message right right-alt3');
            break;

        case 'theme-four':
            document.querySelectorAll('.left').forEach(theElement => theElement.className = 'message left left-alt4');
            document.querySelectorAll('.right').forEach(theElement => theElement.className = 'message right right-alt4');
            break;
    }
});


// *********************** Gold *****************************
const theInput = document.getElementById('input');

// Set beter instructions for entering new Messages
theInput.value = '';
const betterInstructions = document.createElement('div');
betterInstructions.textContent = 'Enter next message above';
document.getElementsByName('message')[0].appendChild(betterInstructions);

// Add Event Listener for the "Send" Button
document.querySelector('form button').id = 'send-button';
document.getElementById('send-button').type = 'button';
document.getElementById('send-button').addEventListener('click', e => {
    const theMessages = document.getElementsByClassName('messages')[0];    
    const theNewMessage = document.createElement('div');
    theNewMessage.className = 'message right right-alt1';
    theNewMessage.textContent = theInput.value;
    theMessages.appendChild(theNewMessage);
});

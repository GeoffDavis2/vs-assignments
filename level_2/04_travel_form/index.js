const theForm = document.theForm;

theForm.addEventListener('submit', e => {
    let popUp = '';
    e.preventDefault();
    popUp += `First name: ${theForm.firstName.value} \n`;
    popUp += `Last name: ${theForm.lastName.value} \n`;
    popUp += `Age: ${theForm.age.value} \n`;
    popUp += `Gender: ${theForm.gender.value} \n`;
    popUp += `Location: ${theForm.destination.value} \n`;
    const diet = Array
        .from(theForm.dietRestrictions)
        .filter(e => e.checked)
        .map(e => e.value)
        .toString();
    // Array.from(theForm.dietRestrictions).forEach(e => {
    //     if(e.checked) popUp += e.value + ', ';
    // })
    popUp += `Dietary restrictions: ${diet}`;
    alert(popUp);
});

// testArr = [1,2,3,4,5,6];
// console.log(testArr.toString());
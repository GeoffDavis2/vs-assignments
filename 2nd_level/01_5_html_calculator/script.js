const theMainForm = document.the_main_form;

theMainForm.add_button.addEventListener('click', e => {
    e.preventDefault();
    theMainForm.add_output.value = parseFloat(theMainForm.add_num1.value) + parseFloat(theMainForm.add_num2.value);
});

theMainForm.sub_button.addEventListener('click', e => {
    e.preventDefault();
    theMainForm.sub_output.value = parseFloat(theMainForm.sub_num1.value) - parseFloat(theMainForm.sub_num2.value);
});

theMainForm.mult_button.addEventListener('click', e => {
    e.preventDefault();
    theMainForm.mult_output.value = parseFloat(theMainForm.mult_num1.value) * parseFloat(theMainForm.mult_num2.value);
});

theMainForm.div_button.addEventListener('click', e => {
    e.preventDefault();
    theMainForm.div_output.value = parseFloat(theMainForm.div_num1.value) / parseFloat(theMainForm.div_num2.value);
});

console.log(theMainForm.add_num1.value);
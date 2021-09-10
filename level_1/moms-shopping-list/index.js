const theInputForm = document["add-item"];

theInputForm.addEventListener("submit", e => {
    e.preventDefault();
    const theNewItem = document.createElement('div');
    theNewItem.textContent = theInputForm.newItemInput.value;

    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    theNewItem.appendChild(editButton);

    const xButton = document.createElement('button');
    xButton.textContent = 'edit';
    theNewItem.appendChild(xButton);

    document.getElementById('the-list').appendChild(theNewItem);
    theInputForm.newItemInput.value = '';
})

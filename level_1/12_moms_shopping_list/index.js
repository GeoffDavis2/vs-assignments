// Todo
//      Add comments
//      Change to UL?
//      Change so it only adds edit input and submit button when needed then removes after...?

const theInputForm = document['add-item'];
var theList = document.getElementById('the-list');

function addNewItem(theItemText) {
    const theNewItem = document.createElement('div');

    const itemText = document.createElement('span');
    itemText.textContent = theItemText;
    theNewItem.appendChild(itemText);

    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.addEventListener('click', () => {
        itemText.style.display = 'none';
        editButton.style.display = 'none';
        delButton.style.display = 'none';
        editItemInput.value = itemText.textContent;
        editItemInput.style.display = 'inline-block';
        submitButton.style.display = 'inline-block';
    })
    theNewItem.appendChild(editButton);

    const delButton = document.createElement('button');
    delButton.textContent = 'X';
    delButton.addEventListener('click', e => e.target.parentNode.remove());
    theNewItem.appendChild(delButton);

    const editItemInput = document.createElement('input');
    editItemInput.type = 'text';
    editItemInput.style.display = 'none';
    theNewItem.appendChild(editItemInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'submit';
    submitButton.addEventListener('click', () => {
        itemText.textContent = editItemInput.value;
        itemText.style.display = 'inline';
        editButton.style.display = 'inline-block';
        delButton.style.display = 'inline-block';
        editItemInput.style.display = 'none';
        submitButton.style.display = 'none';
    })
    submitButton.style.display = 'none';
    theNewItem.appendChild(submitButton);

    return theNewItem;
};

theInputForm.addEventListener('submit', e => {
    e.preventDefault();
    theList.appendChild(addNewItem(theInputForm.newItemInput.value));
    theInputForm.newItemInput.value = '';
});

document.getElementById('save-button').addEventListener('click', () => {
    localStorage.clear();
    for (let i = 0; i < theList.children.length; i++) localStorage.setItem(i, theList.children[i].getElementsByTagName('span')[0].textContent);
});

document.getElementById('restore-button').addEventListener('click', () => {
    theList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) theList.appendChild(addNewItem(localStorage.getItem(i)));
});
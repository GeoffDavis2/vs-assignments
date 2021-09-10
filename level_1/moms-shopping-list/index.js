// Todo
//      Add comments
//      Change to UL?
//      Change so it only adds edit input and submit button when needed then removes after...?
//      Add session storage
//          Close but it does not restore the eventlisteners

const theInputForm = document['add-item'];

theInputForm.addEventListener('submit', e => {
    e.preventDefault();
    const theNewItem = document.createElement('div');

    const itemText = document.createElement('span');
    itemText.textContent = theInputForm.newItemInput.value;
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

    document.getElementById('the-list').appendChild(theNewItem);
    theInputForm.newItemInput.value = '';
})

document.getElementById('save-button').addEventListener('click', () => {
    console.log(document.getElementById('the-list').innerHTML);
    localStorage.clear();
    localStorage.setItem('save', document.getElementById('the-list').innerHTML);
});


document.getElementById('restore-button').addEventListener('click', () => document.getElementById('the-list').innerHTML = localStorage.getItem('save'));


// document.getElementById('save-button').addEventListener('click', () => {
//     localStorage.clear();
//     const x = document.getElementById('the-list');
//     for (let i = 0; i < x.children.length; i++) {
//         console.log(x.children[i].getElementsByTagName('span')[0].textContent);
//         localStorage.setItem(i, x.children[i].getElementsByTagName('span')[0].textContent)
//     }
// })


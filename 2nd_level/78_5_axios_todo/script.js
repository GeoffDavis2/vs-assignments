// Clear all todo's from the html todo-list
function clearAll() {
    document.getElementById('todo-list').innerHTML = '';
    document.theNewTodoForm.newTodoTitle.value = ''
    document.theNewTodoForm.newTodoPrice.value = ''
    document.theNewTodoForm.newTodoDesc.value = ''
    document.theNewTodoForm.newTodoImg.value = ''
    document.theUpdateTodoForm.newTodoTitle.value = ''
    document.theUpdateTodoForm.newTodoPrice.value = ''
    document.theUpdateTodoForm.newTodoDesc.value = ''
    document.theUpdateTodoForm.newTodoImg.value = ''
}

function loadToDos() {
    axios.get('https://api.vschool.io/gvd/todo')
        .then(response => response.data.forEach(todoObj => addTodoObj(todoObj)))
        .catch(err => console.log(err));
}

function convertToCurrency(num) {
    return '$' + num.toFixed(2).toLocaleString("en-US");
}

function deleteTodo(idNum) {
    console.log('pressed delete button' + idNum);
    axios.delete('https://api.vschool.io/gvd/todo/' + idNum)
        .then(response => {
            clearAll();
            loadToDos();
        })
        .catch(err => alert(err));
}

function checkBoxStatusChanged(isChecked, idNum) {
    const todoObj = { "completed": isChecked }
    axios.put('https://api.vschool.io/gvd/todo/' + idNum, todoObj)
        .then(response => {
            clearAll();
            loadToDos();
        })
        .catch(err => alert(err));
}

function editTodo(idNum) {
    document.theUpdateTodoForm.className = '';
    clearAll();
    loadToDos();
    axios.get('https://api.vschool.io/gvd/todo/' + idNum)
        .then(response => {
            document.theUpdateTodoForm.newTodoTitle.value = response.data.title;
            if(typeof response.data.price !== 'undefined') document.theUpdateTodoForm.newTodoPrice.value = response.data.price;
            if(typeof response.data.description !== 'undefined') document.theUpdateTodoForm.newTodoDesc.value = response.data.description;
            if(typeof response.data.imgUrl !== 'undefined') document.theUpdateTodoForm.newTodoImg.value = response.data.imgUrl;
            document.getElementById('submit-edit-todo-btn').dataset.temp = idNum;
        })
        .catch(err => alert(err));
    // clearAll();
    // loadToDos();
}

function addTodoObj(todoObj) {
    // Create the "Card" that will contain each todo and all its information
    const todoCard = document.createElement('div');
    todoCard.dataset.id = todoObj._id;
    todoCard.dataset.completed = todoObj.completed;
    todoCard.className = 'todo-card';

    // Add a div for the title data
    const todoTitle = document.createElement('div');
    todoTitle.textContent = todoObj.title;
    todoTitle.className = 'todo-title'
    todoCard.appendChild(todoTitle);

    // Add a checkbox for complete(ing) todos
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox'
    checkBox.checked = todoObj.completed;
    checkBox.className = 'todo-check-box';
    checkBox.addEventListener('change', (e) => checkBoxStatusChanged(e.target.checked, todoObj._id))
    todoCard.appendChild(checkBox);

    // Add a div for the price data
    if (!isNaN(todoObj.price)) {
        const todoPrice = document.createElement('div');
        todoPrice.textContent = convertToCurrency(todoObj.price);
        todoPrice.className = 'todo-price';
        todoCard.appendChild(todoPrice);
    }

    // Add a div for the description data
    if (todoObj.description) {
        const todoDesc = document.createElement('div');
        todoDesc.textContent = todoObj.description;
        todoDesc.className = 'todo-desc';
        todoCard.appendChild(todoDesc);
    }

    // Add a div for the image
    if (todoObj.imgUrl) {
        const todoImg = document.createElement('img');
        todoImg.src = todoObj.imgUrl;
        todoImg.className = 'todo-img';
        todoCard.appendChild(todoImg);
    }

    // Add a button to edit the todo item
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'todo-btn';
    editBtn.addEventListener('click', () => editTodo(todoObj._id))
    todoCard.appendChild(editBtn);

    // Add a button to delete the todo item
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'todo-btn';
    deleteBtn.addEventListener('click', () => deleteTodo(todoObj._id))
    todoCard.appendChild(deleteBtn);

    // Add the card to the "todo-list" section
    document.getElementById("todo-list").appendChild(todoCard);
}

document.getElementById('new-todo-btn').addEventListener('click', () => {
    document.theNewTodoForm.className = '';
});

document.getElementById('submit-new-todo-btn').addEventListener('click', e => {
    e.preventDefault();
    if (document.theNewTodoForm.newTodoTitle.value == '') {
        alert("You must at least enter a value for the Title.");
        return;
    }

    const todoObj = { "title": document.theNewTodoForm.newTodoTitle.value }
    if (document.theNewTodoForm.newTodoPrice.value != '') todoObj.price = document.theNewTodoForm.newTodoPrice.value;
    if (document.theNewTodoForm.newTodoDesc.value != '') todoObj.description = document.theNewTodoForm.newTodoDesc.value;
    if (document.theNewTodoForm.newTodoImg.value != '') todoObj.imgUrl = document.theNewTodoForm.newTodoImg.value;

    axios.post('https://api.vschool.io/gvd/todo', todoObj)
        .then(response => {
            clearAll();
            loadToDos();
            document.theNewTodoForm.className = 'hidden';
        })
        .catch(err => alert(err));
});

document.getElementById('canx-new-todo-btn').addEventListener('click', e => {
    e.preventDefault();
    clearAll();
    loadToDos();
    document.theNewTodoForm.className = 'hidden';
});

document.getElementById('submit-edit-todo-btn').addEventListener('click', e => {
    e.preventDefault();
    const idNum = e.target.dataset.temp;
    e.target.removeAttribute('data-temp');
    if (document.theUpdateTodoForm.newTodoTitle.value == '') {
        alert("You must at least enter a value for the Title.");
        return;
    }
    
    const todoObj = { "title": document.theUpdateTodoForm.newTodoTitle.value }
    if (document.theUpdateTodoForm.newTodoPrice.value != '') todoObj.price = document.theUpdateTodoForm.newTodoPrice.value;
    if (document.theUpdateTodoForm.newTodoDesc.value != '') todoObj.description = document.theUpdateTodoForm.newTodoDesc.value;
    if (document.theUpdateTodoForm.newTodoImg.value != '') todoObj.imgUrl = document.theUpdateTodoForm.newTodoImg.value;

    axios.put('https://api.vschool.io/gvd/todo/' + idNum, todoObj)
        .then(response => {
            clearAll();
            loadToDos();
            document.theUpdateTodoForm.className = 'hidden';
        })
        .catch(err => alert(err));
});

document.getElementById('canx-edit-todo-btn').addEventListener('click', e => {
    e.preventDefault();
    clearAll();
    loadToDos();
    document.theUpdateTodoForm.className = 'hidden';
});


clearAll();
loadToDos();
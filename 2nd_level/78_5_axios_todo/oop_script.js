// Clear all todo's from the html todo-list
function clearAll() {
    document.getElementById('todo-list').innerHTML = '';
    document.theForm.newTodoTitle.value = ''
    document.theForm.newTodoPrice.value = ''
    document.theForm.newTodoDesc.value = ''
    document.theForm.newTodoImg.value = ''
}

// Get the Todos from the V School api and load each Todo into the html
function loadToDos() {
    axios.get('https://api.vschool.io/gvd/todo')
        .then(response => response.data.forEach(todoObj => addTodoObj(todoObj)))
        .catch(err => console.log(err));
}


// Add each todoObj into the html
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

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'todo-btn';
    deleteBtn.addEventListener('click', () => deleteTodo(todoObj._id))
    todoCard.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'todo-btn';
    editBtn.addEventListener('click', () => deleteTodo(todoObj._id))
    todoCard.appendChild(editBtn);

    const checkBox = document.createElement('button');
    checkBox.textContent = 'Delete';
    checkBox.className = 'todo-btn';
    checkBox.addEventListener('click', () => deleteTodo(todoObj._id))
    todoCard.appendChild(checkBox);

    // Add the card to the "todo-list" section
    document.getElementById("todo-list").appendChild(todoCard);
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

document.getElementById('new-todo-btn').addEventListener('click', () => {
    document.theForm.className = '';
});

document.getElementById('submit-todo-btn').addEventListener('click', e => {
    e.preventDefault();
    if (document.theForm.newTodoTitle.value == '') {
        alert("You must at least enter a value for the Title.");
        return;
    }

    const todoObj = { "title": document.theForm.newTodoTitle.value }
    if (document.theForm.newTodoPrice.value != '') todoObj.price = document.theForm.newTodoPrice.value;
    if (document.theForm.newTodoDesc.value != '') todoObj.description = document.theForm.newTodoDesc.value;
    if (document.theForm.newTodoImg.value != '') todoObj.imgUrl = document.theForm.newTodoImg.value;

    axios.post('https://api.vschool.io/gvd/todo', todoObj)
        .then(response => {
            clearAll();
            loadToDos();
            document.theForm.className = 'hidden';
        })
        .catch(err => alert(err));
});

document.getElementById('canx-todo-btn').addEventListener('click', e => {
    e.preventDefault();
    clearAll();
    loadToDos();
    document.theForm.className = 'hidden';
});

clearAll();
loadToDos();
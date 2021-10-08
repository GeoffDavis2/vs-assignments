class TestTodo {
    constructor(todoObj) {
        this.id = todoObj._id;
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
        // deleteBtn.addEventListener('click', () => deleteTodo(todoObj._id))
        todoCard.appendChild(deleteBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'todo-btn';
        editBtn.addEventListener('click', () => deleteTodo(todoObj._id))
        todoCard.appendChild(editBtn);

        const checkBox = document.createElement('button');
        checkBox.textContent = 'Delete';
        checkBox.className = 'todo-btn';
        checkBox.addEventListener('click', () => deleteTodo())
        todoCard.appendChild(checkBox);

        // Add the card to the "todo-list" section
        document.getElementById("todo-list").appendChild(todoCard);
    }

    deleteTodo() {
        console.log('pressed delete button' + idNum);
        axios.delete('https://api.vschool.io/gvd/todo/' + this.id)
            .then(response => {
                clearAll();
                loadToDos();
            })
            .catch(err => alert(err));
    }

}
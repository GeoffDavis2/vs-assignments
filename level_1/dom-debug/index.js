const colors = ["red", "blue", "green"]

document.getElementById("add").addEventListener("click", e => document.getElementById("list").appendChild(createSubItem(e)));

function createDropDown() {
    const dropDown = document.createElement("select");
    for (let i = 0; i < colors.length; i++){
        const option = document.createElement("option");
        option.innerHTML = colors[i];
        option.value = colors[i];
        dropDown.append(option);
    };
    dropDown.addEventListener("change", e => e.target.parentNode.style.backgroundColor = e.target.value);
    dropDown.style.marginLeft = '5PX';
    return dropDown;
}

function createSubItem(e) {
    const subItem = document.createElement("div");
    subItem.textContent = document.getElementById("input").value;;
    const dropDown = createDropDown();
    subItem.appendChild(dropDown);
    subItem.setAttribute("class", "sub-item");
    subItem.style.backgroundColor = 'red';
    subItem.style.border = "solid black 1px";
    document.getElementById('input').value = null;
    return subItem;
}



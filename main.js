const addBtn = document.querySelector('.add');
const resetBtn = document.querySelector('.resetBtn');
const inputTask = document.querySelector('.item');
const inputSearch = document.querySelector('.lookFor');
const list = document.querySelector('.list ul');
const listItems = document.querySelectorAll('li');
const removeBtn = document.createElement("button");
const counter = document.querySelector('.counter')
const notification = document.querySelector('.notification')
const appSection = document.querySelector('.app');
const numberOfOneItem = document.querySelector('.number');
const additionalInfo = document.querySelector('.info')
let array = [];
let ammounts = [];
let informations = [];
let content = "";
let amountValue = 1;
let message = "";

const clearInputs = () => {
    content = "";
    amountValue = 1;
    message = "";
    numberOfOneItem.value = "";
    additionalInfo.value = "";
    inputTask.value = "";
}

// dodawanie elementów

inputTask.addEventListener("input", () => {
    content = inputTask.value;
})

numberOfOneItem.addEventListener("input", () => {
    amountValue = numberOfOneItem.value
})

additionalInfo.addEventListener("input", () => {
    message = additionalInfo.value;
})

const generateList = () => {
    list.textContent = "";
    array.forEach((position, index) => {
        const li = document.createElement('li');
        list.appendChild(li);
        li.textContent = `${position.title}, ${position.amount}${position.extra ? "," : ""} ${position.extra}`;
        li.dataset.index = index;
        li.innerHTML += `<button class="removeBtn">Usuń</button>`
        li.querySelector('button').addEventListener("click", removeTask)
        counter.textContent = array.length;
    })
}


addTask = (e) => {
    e.preventDefault();
    if (content === "") {
        alert("Nie możesz dodać pustej pozycji")
        clearInputs()
        return
    }
    if (array.filter((position) => position.title.toLowerCase() === content.toLowerCase()).length > 0) {
        alert(`Ten element jest już na liście`);
        clearInputs()
        return;
    }
    const task = new Object()
    task.title = content;
    task.amount = amountValue;
    task.extra = message;
    array.push(task);
    generateList()
    clearInputs()
}



addBtn.addEventListener("click", addTask)

// usuwanie elementów

const removeTask = (e) => {
    const itemIndex = e.target.parentNode.dataset.index;
    array.splice(itemIndex, 1);
    e.target.remove();
    counter.textContent = array.length;
    generateList();
    inputSearch.value = "";
}


document.querySelectorAll('li button').forEach(item => item.addEventListener("click", removeTask))


// wyszukiwarka

const result = () => {
    if (inputSearch.value === "") return generateList();
    list.textContent = "";
    const resultArr = array.forEach((item, index) => {
        if (item.title.toLowerCase().includes(inputSearch.value.toLowerCase())){
            const li = document.createElement('li');
            list.appendChild(li);
            li.dataset.index = index;
            li.textContent = `${item.title}, ${item.amount}${item.extra ? "," : ""} ${item.extra}`
            li.innerHTML += `<button class="removeBtn">Usuń</button>`
            li.querySelector('button').addEventListener("click", removeTask)
        }
    })
}


inputSearch.addEventListener("input", result)

//reset

const resetAll = () => {
    array = [];
    clearInputs();
    list.textContent = "";
    counter.textContent = array.length;
    notification.classList.remove('active');
    appSection.classList.remove('blur');
    notification.textContent = "";
    resetBtn.addEventListener("click", resetNotification)
}


const notificationText = () => {
    const text = document.createElement('h2');
    if (array.length === 0) {
        text.textContent = "Nie możesz zresetować pustej listy"
        notification.appendChild(text);
        setTimeout(() => {
            notification.classList.remove('active');
            appSection.classList.remove('blur');
            notification.textContent = "";
            resetBtn.addEventListener("click", resetNotification)
        }, 2000);
    }
    else {
        text.textContent = `Czy chcesz usunąć z listy wszystkie (${array.length}) elementy?`
        notification.appendChild(text);
        const positiveBtn = document.createElement('button');
        positiveBtn.className = "positive";
        positiveBtn.textContent = "Tak"
        positiveBtn.addEventListener("click", resetAll)
        notification.appendChild(positiveBtn);
        const negativeBtn = document.createElement('button');
        negativeBtn.className = "negative";
        negativeBtn.textContent = "Nie";
        negativeBtn.addEventListener("click", () => {
            notification.classList.remove('active');
            appSection.classList.remove('blur');
            notification.textContent = "";
        })
        notification.appendChild(negativeBtn);
    }
}

const resetNotification = () => {
    resetBtn.removeEventListener("click", resetNotification)
    notification.classList.add('active');
    appSection.classList.add('blur')
    notificationText();
}

resetBtn.addEventListener("click", resetNotification)









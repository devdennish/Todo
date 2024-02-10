const input = document.getElementById('input');
const addButton = document.getElementById('add');
const itemList = document.getElementById('item-list');

//show input box when users clicks on + icon//
const showInput = () => {
  input.type = 'text';
};
//get user input from the input box//
const getInput = () => {
  const todoValue = input.value;
  return todoValue;
};

//Hide input box when user hits enter key//
const hideInput = (e) => {
  if (e.key === 'Enter') {
    //Add element to DOM//
    itemList.appendChild(createTodo(getInput()));
    //Add items to localStorage//
    itemToStorage(getInput());

    //hide input field and reset value//
    input.type = 'hidden';
    input.value = '';
  }
};

//create list item//
const createTodo = (todo) => {
  const li = document.createElement('li');
  li.className = 'items';
  li.textContent = todo;
  const i = createIcon('fa-solid fa-xmark');
  li.appendChild(i);
  return li;
};

//create icon//

const createIcon = (classess) => {
  const i = document.createElement('i');
  i.className = classess;
  i.id = 'close';
  return i;
};

//check and add items to local storage//
const itemToStorage = (item) => {
  let storageItems;
  if (localStorage.getItem('items') === null) {
    storageItems = [];
  } else {
    storageItems = JSON.parse(localStorage.getItem('items'));
  }
  storageItems.push(item);
  localStorage.setItem('items', JSON.stringify(storageItems));
};

// get items from local storage//
const itemFromStorage = () => {
  const items = JSON.parse(localStorage.getItem('items'));
  if (items === null) {
    return;
  } else {
    items.forEach((item) => {
      itemList.appendChild(createTodo(item));
    });
  }
};
itemFromStorage();

//remove item//
const removeList = (e) => {
  if (e.target.className === 'fa-solid fa-xmark') {
    removeItem(e.target.parentElement);
  }
};

const removeItem = (item) => {
  if (confirm('Are you sure')) {
    //remove item from DOM//
    item.remove();
    //remove item from local storage//
    removeItemFromStorage(item.textContent);
  }
};

//remove item from local storage//
const removeItemFromStorage = (item) => {
  let storageItem = JSON.parse(localStorage.getItem('items'));
  storageItem = storageItem.filter((i) => {
    return i != item;
  });
  localStorage.setItem('items', JSON.stringify(storageItem));
  console.log(storageItem);
};

//Event Listener//
addButton.addEventListener('click', showInput);
input.addEventListener('input', getInput);
input.addEventListener('keypress', hideInput);
itemList.addEventListener('click', removeList);

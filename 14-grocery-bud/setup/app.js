// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem);

// clear all items
clearBtn.addEventListener("click", deleteAllItems);

// display items from local storage
window.addEventListener("load", fetchLocalData());

// ****** FUNCTIONS **********
function addItem(event) {
  //removes the default behaviour of reloading the page when the item is submitted.
  event.preventDefault();

  const value = grocery.value;
  const id = new Date().getTime().toString(); // You wouldn't do this IRL

  if (value && !editFlag) {
    createItem(value, id);
    addLocalStorage(value, id);
  } else if (value && editFlag) {
    editItem(grocery.value, editID);
    editLocalStogage(grocery.value, editID);
  } else {
    displayAlert("please enter value", "danger");
  }

  resetApp();
}

//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function createItem(value, id) {
  // add the item
  const newGroceryItem = document.createElement("section");

  newGroceryItem.setAttribute("data-id", id);

  newGroceryItem.classList.add("grocery-item");

  newGroceryItem.innerHTML = `<p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;

  list.appendChild(newGroceryItem);

  //show container
  container.classList.add("show-container");

  // Add Event listener to the edit & delete button - update the edit flag.
  newGroceryItem.addEventListener("click", (e) => {
    //* EDIT BUTTON
    e.target.classList.contains("edit-btn") ||
    e.target.parentNode.classList.contains("edit-btn")
      ? ((editFlag = true),
        (grocery.value = value),
        (editID = newGroceryItem.getAttribute("data-id")))
      : (editFlag = false);
    //* DELETE BUTTON
    if (
      e.target.classList.contains("delete-btn") ||
      e.target.parentNode.classList.contains("delete-btn")
    ) {
      deleteItem(newGroceryItem);
    }
  });

  return newGroceryItem;

  // TODO call store in local storage function
}

function editItem(value, id) {
  const itemEdited = document.querySelector(`[data-id = "${id}"`);

  itemEdited.querySelector(".title").innerHTML = value;

  editFlag = false;
}

function resetApp() {
  grocery.value = "";
}

function deleteItem(item) {
  deleteItemLocalStorage(item.getAttribute("data-id"));
  item.remove();
  if (list.childElementCount == 0) {
    container.classList.remove("show-container");
  }
}

function deleteAllItems() {
  document.querySelectorAll(".grocery-item").forEach((e) => {
    deleteItem(e);
  });
}

// ****** LOCAL STORAGE **********
function addLocalStorage(value, id) {
  const groceryItem = { id, value };

  let items = getLocalStorage();

  items.push(groceryItem);

  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStogage(value, id) {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id == id) {
      item.value = value;
    }
    return item;
  });

  localStorage.setItem("list", JSON.stringify(items));
}

function deleteItemLocalStorage(id) {
  let items = getLocalStorage();

  console.log(items);
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// ****** SETUP ITEMS **********

function fetchLocalData() {
  let items = getLocalStorage();
  items.forEach((item) => createItem(item.value, item.id));
}

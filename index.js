// import initialize App from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const appSettings = {
  databaseURL: "https://shopping-list-379b3-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputEl = document.getElementById("input-field");
const addBtn = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(shoppingListInDb, inputValue);
  clearInputFieldEl();
  // console.log(inputValue)
});

onValue(shoppingListInDb, function (snapshot) {
  // console.log to test functionality
  //   console.log(snapshot.val);
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();
    // For each item in the array, append it to the shoppingListEl
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = `<li>No items in the list</li>`;
  }
});

function clearInputFieldEl() {
  // clear the input on the button being clicked
  inputEl.value = "";
}
function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0];
  let itemValue = item[1];
  // create a new li element
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  // On click, delete the item from the database
  newEl.addEventListener("click", function () {
    let exactLocationInDb = ref(database, `shoppingList/${itemID}`);
    // Delete the item from the database
    remove(exactLocationInDb);
  });
  shoppingListEl.append(newEl);
}

// import initialize App from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const appSettings = {
  databaseURL: "https://shopping-list-379b3-default-rtdb.firebaseio.com/",
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
  appendItemToShoppingListEl(inputValue);
  // console.log(inputValue)
});

function clearInputFieldEl() {
  // clear the input on the button being clicked
  inputEl.value = "";
}

function appendItemToShoppingListEl(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}

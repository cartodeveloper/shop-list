const SHOP = [
  // "ciud callback function stands for any"
  { id: cuid(), name: "ex. salmon", checked: false },
  { id: cuid(), name: "ex. checked oranges", checked: true },
];

function generateItem(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${
        item.checked ? "shopping-item__checked" : ""
      }">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}
// here we deconstruct and join items as strings.
function itemsToStrings(shoppingList) {
  console.log("Generating shopping list element");
  const items = shoppingList.map((item) => generateItem(item));
  return items.join("");
}

function renderShop() {
  // render the shopping list in the DOM
  const shoppingListItemsString = itemsToStrings(SHOP);
  $(".js-shopping-list").html(shoppingListItemsString);
}

function addItem(itemName) {
  SHOP.push({ id: cuid(), name: itemName, checked: false });
}

function itemSubmit() {
  $("#js-shopping-list-form").submit(function (event) {
    // event.prevent Default.
    event.preventDefault();
    const newItemName = $(".js-shopping-list-entry").val();
    $(".js-shopping-list-entry").val("");
    addItem(newItemName);
    renderShop();
  });
}

function toggleCheckedForListItem(itemId) {
  const item = SHOP.find((item) => item.id === itemId);
  item.checked = !item.checked;
}

function getItemId(item) {
  return $(item).closest("li").data("item-id");
}

function checkClick() {
  $(".js-shopping-list").on("click", `.js-item-toggle`, (event) => {
    const id = getItemId(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShop();
  });
}
// DELETE ITEMS from my Shopping LIST
function deleteListItem(itemId) {
  // Array.prototype.findIndex() method is used here as = "SHOP"
  const itemIndex = SHOP.findIndex((item) => item.id === itemId);
  SHOP.splice(itemIndex, 1);
}

function itemDeleted() {
  $(".js-shopping-list").on("click", ".js-item-delete", (event) => {
    const itemId = getItemId(event.currentTarget);
    deleteListItem(itemId);
    // render the updated shopping list
    renderShop();
  });
}
// this is the order of the render callbacks when the page loads.
function shoppingListOn() {
  renderShop();
  itemSubmit();
  checkClick();
  itemDeleted();
}

// when the page loads, call the callbacks in the correct order.
$(shoppingListOn);

let bagItems;
onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse (bagItemsStr) : [];
    displayItemOnHomePage();
    displayBagIcon();

}


function addToBag(itemsid) {
    bagItems.push(itemsid);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();

}

function displayBagIcon(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if (bagItems.length > 0){
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    }
    else{
        bagItemCountElement.style.visibility = 'hidden';
    }

}

function displayItemOnHomePage() {
    let itemsContainerElement = document.querySelector('.items-container');
    if (itemsContainerElement == null){
        return;
    }

let innerHtml = '';
items.forEach(items => {
    innerHtml += `<div class="item-container">
          <img class="item-image" src="${items.image}" alt="item image">
          <div class="rating">
            ${items.rating.stars} ⭐| ${items.rating.count}
          </div>
          <div class="company-name">${items.company}</div>
          <div class="item-name">${items.item_name}</div>
          <div class="price">
            <span class="current-price">${items.current_price} </span>
            <span class="original-price">${items.original_price} </span>
            <span class="dis">${items.discount_percentage} </span>
          </div>
          <button class="btn-add-bag" onclick = "addToBag(${items.id})" >Add TO Bag</button>
          
        </div>`

});

itemsContainerElement.innerHTML = innerHtml; 

} 


const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad(){
    loadbagItemObjects();
    displayBagItems();
    displayBagSummery();
}

function displayBagSummery(){
    let bagSummeryElement = document.querySelector('.bag-summary');

    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    

    bagItemObjects.forEach(bagItems => {
        totalMRP += bagItems.original_price;
        totalDiscount += bagItems.original_price - bagItems.current_price;
    });

    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

    bagSummeryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem}) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function loadbagItemObjects(){
    console.log(bagItems);

    bagItemObjects = bagItems.map(itemsId => {
        for( let i = 0; i<items.length; i++){
            if ( itemsId == items[i].id){
                return items[i]
            }
        }
    });

    console.log(bagItemObjects);
}

function displayBagItems(){
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML ='';
    bagItemObjects.forEach(bagItems => {
        innerHTML += generateItemHtml(bagItems);
        
    });
   containerElement.innerHTML = innerHTML;

}

function removeFromBag(itemsId){
   bagItems = bagItems.filter(bagItemsId => bagItemsId != itemsId);
   localStorage.setItem('bagItems', JSON.stringify(bagItems));
   loadbagItemObjects();
   displayBagIcon();
   displayBagItems();
   displayBagSummery();
}
 
function generateItemHtml(items){
    return  `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${items.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${items.company}</div>
              <div class="item-name">${items.item_name}</div>
              <div class="price-container">
                <span class="current-price"> Rs ${items.current_price}</span>
                <span class="original-price">Rs${items.original_price}</span>
                <span class="discount-percentage">${items.discount_percentage}%off</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${items.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${items.delivery_date} Oct 2023</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = removeFromBag(${items.id})>X</div>
          </div>`;


}
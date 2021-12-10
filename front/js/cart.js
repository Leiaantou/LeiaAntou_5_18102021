let itemsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
async function displayCart() {
  const positionEmptyCart = document.getElementById("cart__items");
  let cartArray = [];

  if (itemsInLocalStorage === null || itemsInLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    for (i = 0; i < itemsInLocalStorage.length; i++) {
      const product = await getProductById(itemsInLocalStorage[i].id);
      const totalPriceItem = (product.price *= itemsInLocalStorage[i].quantity);
      console.log(totalPriceItem);
      cartArray += `
       <article class="cart__item" data-id=${itemsInLocalStorage[i].id}>
       <div class="cart__item__img">
         <img src="${product.imageUrl}" alt="Photographie d'un canapé">
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__titlePrice">
           <h2>${product.name}</h2>
           <p>${itemsInLocalStorage[i].color}</p>
           <p>
           
           ${totalPriceItem} €</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemsInLocalStorage[i].quantity}>
           </div>
           <div class="cart__item__content__settings__delete">
             <p data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} class="deleteItem">Supprimer</p>
           </div>
         </div>
       </div>
     </article>
     `;
    }
    // Affichage du nombre total d'articles et du prix total du panier
    let totalQuantity = 0;
    let totalPrice = 0;
    for (i = 0; i < itemsInLocalStorage.length; i++) {
      const article = await getProductById(itemsInLocalStorage[i].id);
      totalQuantity += parseInt(itemsInLocalStorage[i].quantity);
      console.log(totalQuantity);
      totalPrice += parseInt(article.price * itemsInLocalStorage[i].quantity);
      console.log(totalPrice);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    if (i == itemsInLocalStorage.length) {
      positionEmptyCart.innerHTML = cartArray;
      changeQuantity();
      deleteItem();
    }
  }
}
async function getProductById(productId) {
  return (
    fetch("http://localhost:3000/api/products/" + productId)
      .then(function (res) {
        //  console.log (res.json())
        return res.json();
      })
      .catch((err) => {
        // Une erreur est survenue
        console.log("erreur");
      })

      //insertion des données de l'API dans le DOM (titre, img, nom, prix, description et option couleurs)
      .then(function (response) {
        return response;
      })
  );
}
displayCart();

// Prix total du panier

// Modifier la quantité

function changeQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  console.log(quantityInputs);
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      console.log(event);
      console.log(event.target.getAttribute("data-id"));
      console.log(event.target.getAttribute("data-color"));
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("cartItems");
      let items = JSON.parse(cartItems);
      const resultat = items.find((product) => {
        if (product.id === dataId && product.color === dataColor) return true;
        return false;
      });
      if (resultat != undefined) {
        items = items.map((item, index) => {
          if (item.id === dataId && item.color === dataColor) {
            item.quantity = inputValue;
          }
          return item;
        });
      }
      let itemsStr = JSON.stringify(items);
      localStorage.setItem("cartItems", itemsStr);
      location.reload();
    });
  });
}

// Supprimer un article

function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  console.log(deleteButtons);
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      console.log(deleteId, deleteColor);
      itemsInLocalStorage = itemsInLocalStorage.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      deleteConfirm = window.confirm(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );
      if (deleteConfirm == true) {
        localStorage.setItem("cartItems", JSON.stringify(itemsInLocalStorage));
        location.reload();
      }
      alert("Article supprimé avec succès");
    });
  });
}

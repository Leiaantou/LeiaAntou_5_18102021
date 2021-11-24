// récupération id
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + productId;
// console.log("Fetch URL is " + objectURL);

function addToCart(productItem) {
  let cartItems = localStorage.getItem("cartItems");
  //si panier vide
  if (cartItems === null) {
    let items = [productItem];
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
  } else {
    //si le panier contient des produits
    let items = JSON.parse(cartItems);
    const resultat = items.find((product) => {
      if (product.id === productItem.id && product.color === productItem.color)
        return true;
      return false;
    });
    if (resultat != undefined) {
      items = items.map((item, index) => {
        if (item.id === productItem.id && item.color === productItem.color) {
          item.quantity += productItem.quantity;
        }
        return item;
      });
    } else {
      items.push(productItem);
    }
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
  }
}

// fonction fléchée
// function noName(product){
//   return product.id === 'cerises';
// }

//récupération des produits de l'API
function displayProduct() {
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
    .then(function (getProduct) {
      const product = getProduct;
      console.log(product);

      let productTitle = document.querySelector("title");
      productTitle.innerHTML = product.name;

      let productImg = document.querySelector("article>div.item__img");
      productImg.innerHTML = `<img src ="${product.imageUrl}" alt="${product.altTxt}">`;

      let productName = document.getElementById("title");
      productName.innerHTML = product.name;

      let productPrice = document.getElementById("price");
      productPrice.innerHTML = `${product.price}`;

      let productDescription = document.getElementById("description");
      productDescription.innerHTML = product.description;

      let productColors = document.getElementById("colors");
      for (i = 0; i < product.colors.length; i++) {
        productColors.innerHTML += `<option product="${product.colors[i]}">${product.colors[i]}</option>`;
      }
    });

  //panier
  const cartButton = document.getElementById("addToCart");
  cartButton.addEventListener("click", (event) => {
    event.preventDefault();
    let productColor = document.getElementById("colors").value;
    let productQuantity = parseInt(document.getElementById("quantity").value);
    //si aucune couleur sélectionnée
    if (productColor == "") {
      alert("Veuillez sélectionner une couleur");
      return;
    }
    //si quantité = 0
    else if (productQuantity == 0) {
      alert("Veuillez renseigner une quantité");
      return;
    }

    const productOptions = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    console.log(productOptions);
    addToCart(productOptions);
  });
}
displayProduct();

// const products = getProducts();
// console.log(products);
displayProducts();
async function getProducts() {
  return await fetch("http://localhost:3000/api/products")
    .then(function (res) {
      // if (res.ok) {
      //  console.log (res.json())
      return res.json();
      // }
    })
    .then(function (value) {
      console.log(value);
      return value;
    })
    .catch(function (err) {
      // Une erreur est survenue
      console.log(err);
    });
}

async function displayProducts() {
  const products = await getProducts();
  console.log("displayProducts", products);
  let productsSection = document.getElementById("items");
  for (i = 0; i < products.length; i++) {
    let productsItems = `
      <a href="./product.html?id=${products[i]._id}">
      <article>
      <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
      <h3 class="productName">${products[i].name}</h3>
      <p class="productDescription">${products[i].description}</p>
      </article> 
      </a>`;
    productsSection.innerHTML += productsItems;
  }
}
// manipuler le tableau de produits en bouclant grâce à JS pour parcourir tous les elements
// créer une variable productsItems qui contient une chaine de caracteres vide
// dans notre boucle concatené tous les produits en remplaçant dans le html les valeurs statiques
// afficher à l'intérieur de la section items le contenu de la variable productsItems

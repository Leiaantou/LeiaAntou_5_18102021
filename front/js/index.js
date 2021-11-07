//   const products = getProducts();
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
    let productsItems = '';
    productsItems += '          <a href="./product.html?id=' + products.Id + '">' +
        '<article>' +
        '<img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">' +
        '<h3 class="productName">Kanap name1</h3>' +
        '<p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>' +
        '</article>' +
        '</a>'
}
// manipuler le tableau de produits en bouclant grâce à JS pour parcourir tous les elements
// créer une variable productsItems qui contient une chaine de caracteres vide
// dans notre boucle concatené tous les produits en remplaçant dans le html les valeurs statiques
// afficher à l'intérieur de la section items le contenu de la variable productsItems
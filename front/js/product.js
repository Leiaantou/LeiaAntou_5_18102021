const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
// console.log("product id " + id);
const objectURL = "http://localhost:3000/api/products/" + id;
// console.log("Fetch URL is " + objectURL);

displayProduct(id);
async function getProductById(id) {
  return await fetch("http://localhost:3000/api/products/" + id)
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

async function displayProduct(id) {
  const product = await getProductById(id);
  console.log("displayProduct", product);

  let title = document.querySelector("title");
  title.innerHTML = product.name;

  let img = document.querySelector("article>div.item__img");
  img.innerHTML = `<img src ="${product.imageUrl}" alt="${product.altTxt}">`;

  let name = document.getElementById("title");
  name.innerHTML = product.name;

  let price = document.getElementById("price");
  price.innerHTML = `${product.price}`;

  let description = document.getElementById("description");
  description.innerHTML = product.description;

  let color = document.getElementById("colors");
  for (i = 0; i < product.colors.length; i++) {
    color.innerHTML += `<option product="${product.colors[i]}">${product.colors[i]}</option>`;
  }
}

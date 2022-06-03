const d = document,
  ss = sessionStorage;

const getAllProductSections = async () => {
  try {
    let res = await fetch("assets/productos.json"),
      json = await res.json();

    // console.log(json);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    json.forEach((product) => {
      d.querySelector(`.${product.categoria} .cards`).innerHTML += `
      <div class="card" data-image="${product.imagen}" data-name="${product.producto}" data-price="${product.precio}">
        <img src="${product.imagen}" alt="Star Wars">
        <div class="card-content">
          <h3>${product.producto}</h3>
          <p>$${product.precio}</p>
          <a href="producto.html">Ver producto</a>
        </div>
      </div>
      `;
    });
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    d.querySelector(`.${product.categoria} .cards`).innerHTML += `
      <p>Error ${err.status}: ${message}</p>
    `;
  }
};

const getAllProducts = async () => {
  console.log("aqui");
  try {
    let res = await fetch("assets/productos.json"),
      json = await res.json();

    // console.log(json);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    json.forEach((product) => {
      d.querySelector(`.all-products .cards`).innerHTML += `
      <div class="card">
        <img src="${product.imagen}" alt="Star Wars">
        <div class="card-content">
          <h3>${product.producto}</h3>
          <p>$${product.precio}</p>
          <a href="producto.html">Ver producto</a>
        </div>
      </div>
      `;
    });
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    d.querySelector(`.all-products .cards`).innerHTML += `
      <p>Error ${err.status}: ${message}</p>
    `;
  }
};

const responsiveMedia = () => {
  let breakpoint = matchMedia("(min-width: 1150px)");

  const responsive = (e) => {
    if (e.matches) {
      d.querySelectorAll(".cards .card:nth-child(5)").forEach((el) =>
        el.classList.remove("none")
      );
      d.querySelectorAll(".cards .card:nth-child(6)").forEach((el) =>
        el.classList.remove("none")
      );
    } else {
      d.querySelectorAll(".cards .card:nth-child(5)").forEach((el) =>
        el.classList.add("none")
      );
      d.querySelectorAll(".cards .card:nth-child(6)").forEach((el) =>
        el.classList.add("none")
      );
    }
  };

  breakpoint.addEventListener("change", (e) => responsive(e));
};

const product = () => {
  d.querySelector(".product").innerHTML = `
    <article class="container">
      <aside class="product-content">
        <div class="img-content">
          <img src="${ss.getItem("image")}" alt="${ss.getItem("name")}">
        </div>
        <div class="product-description">
          <h1>${ss.getItem("name")}</h1>
          <p>$${ss.getItem("price")}</p>
          <p>
            Voluptas voluptatum quibusdam similique, class debitis alias maecenas eveniet ridiculus, facilis fusce!
            Ullam conubia?
            Sociis, minima malesuada habitasse distinctio sequi aliqua malesuada. Quisque deleniti proin expedita,
            aliquid litora.
            Iste recusandae? Commodo, quia ridiculus doloribus vero dictum? Penatibus donec placeat faucibus, dolorum
            do. Animi
            porta anim magnam
          </p>
        </div>
      </aside>
    </article>
    `;
};

d.addEventListener("DOMContentLoaded", (e) => {
  let url = location.href;
  if (url.includes("index.html") || url.match(/[AluraGeek]$/)) {
    getAllProductSections();
    responsiveMedia();
  }

  if (url.includes("productos.html")) {
    getAllProducts();
  }

  if (url.includes("producto.html")) {
    product();
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".card a")) {
    e.preventDefault();
    // console.log(e.target.closest(".card"));
    // console.log(e.target.closest(".card").dataset.name);

    sessionStorage.setItem("name", e.target.closest(".card").dataset.name);
    sessionStorage.setItem("image", e.target.closest(".card").dataset.image);
    sessionStorage.setItem("price", e.target.closest(".card").dataset.price);

    location.href = "producto.html";
  }
});

const popupModal = document.querySelector(".popup-modal");
const popup = document.querySelector(".popup");

const format = new Intl.NumberFormat("id-ID");
const lazy = new LazyLoad();
let products = [];

(() => {
    window.onload = () => document.querySelector(".loading").classList.add("hidden");
    getProducts().then(res => products = res);
})();

async function getProducts() {
    const dummy = document.querySelector(".product.dummy");
    const parent = dummy.parentElement;
    const database = await fetch("database.json").then(res => res.json());
    
    for (const item of database) {
        const product = dummy.cloneNode(true);
        product.removeAttribute("style");
        product.classList.remove("dummy");
        product.id = item.slug;
        
        const thumb = product.querySelector(".thumb img");
        const image = item.image;
        
        thumb.className = "lazy";
        thumb.setAttribute("data-src", image);
        
        product.querySelector(".product-title").innerHTML = item.name;
        product.querySelector(".from").innerHTML = item.from;
        product.querySelector(".price").innerHTML = "Rp " + format.format(item.price);
        
        parent.appendChild(product);
    }
    
    lazy.update();
    document.querySelector(".product-loading").style.display = "none";
    return database;
}

function product(id) {
    popupModal.classList.remove("hidden");
    popup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    
    const item = products.find((obj) => obj.slug.includes(id));
    
    popup.querySelector(".thumb img").src = item.image;
    popup.querySelector(".popup-product-title").innerHTML = item.name;
    popup.querySelector(".popup-product-price").innerHTML = "Rp " + format.format(item.price);
    popup.querySelector(".popup-product-type").innerHTML = item.type;
    popup.querySelector(".popup-product-from").innerHTML = item.from;
    popup.querySelector(".popup-product-producer").innerHTML = item.producer;
    
    popup.querySelector(".popup-product-sold").innerHTML = String(Math.floor(Math.random() * 720));
    popup.querySelector(".popup-product-rating").innerHTML = String(Math.floor(Math.random() * 3) + 3);
}

function closeProduct() {
    popupModal.classList.add("hidden");
    popup.classList.add("hidden");
    document.body.style = "";
}

function notImplemented() {
    alert("Fungsi belum diimplementasikan ;)");
}
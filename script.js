(() => {
    window.onload = () => {
        window.lazyLoad = new LazyLoad();
        
        setTimeout(() => {
            document.querySelector(".loading").classList.add("hidden");
        }, 1000);
    }
    
    getProducts();
})();

async function getProducts() {
    const dummy = document.querySelector(".product");
    const parent = dummy.parentElement;
    
    const format = new Intl.NumberFormat("id-ID");
    const database = await fetch("database.json").then(res => res.json());
    
    for (const item of database) {
        const product = dummy.cloneNode(true);
        const thumb = product.querySelector(".thumb img");
        const image = (item.image.includes("http"))
            ? item.image
            : "img/products/" + item.image;
        
        thumb.className = "lazy";
        thumb.removeAttribute("src");
        thumb.removeAttribute("data-ll-status");
        thumb.setAttribute("data-src", image);
        
        product.querySelector(".product-title").innerHTML = item.name;
        product.querySelector(".from").innerHTML = item.from;
        product.querySelector(".price").innerHTML = "Rp " + format.format(item.price);
        
        parent.appendChild(product);
        lazyLoad.update();
    }
}
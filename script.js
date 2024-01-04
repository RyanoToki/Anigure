window.lazyLoad = new LazyLoad();

(() => {
    window.onload = () => {
        setTimeout(() => {
            document.querySelector(".loading").classList.add("hidden");
        }, 1000);
    }
    
    getProducts();
})();

async function getProducts() {
    const dummy = document.querySelector(".product.dummy");
    const parent = dummy.parentElement;
    
    const format = new Intl.NumberFormat("id-ID");
    const database = await fetch("database.json").then(res => res.json());
    
    for (const item of database) {
        const product = dummy.cloneNode(true);
        product.removeAttribute("style");
        product.classList.remove("dummy");
        
        const thumb = product.querySelector(".thumb img");
        const image = item.image;
        
        thumb.className = "lazy";
        thumb.setAttribute("data-src", image);
        
        product.querySelector(".product-title").innerHTML = item.name;
        product.querySelector(".from").innerHTML = item.from;
        product.querySelector(".price").innerHTML = "Rp " + format.format(item.price);
        
        parent.appendChild(product);
        lazyLoad.update();
    }
}
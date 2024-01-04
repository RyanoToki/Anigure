(() => {
    window.onload = () => {
        setTimeout(() => {
            document.querySelector(".loading").classList.add("hidden");
        }, 1000);
    }
    
    const dummy = document.querySelector(".product");
    const parent = dummy.parentElement;
    const format = new Intl.NumberFormat("id-ID");
    
    fetch("database.json")
        .then(res => res.json())
        .then(res => {
            for (const item of res) {
                const product = dummy.cloneNode(true);
                
                product.querySelector(".thumb img").src = (item.image.includes("http"))
                    ? item.image
                    : "img/products/" + item.image;
                product.querySelector(".product-title").innerHTML = item.name;
                product.querySelector(".from").innerHTML = item.from;
                product.querySelector(".price").innerHTML = "Rp " + format.format(item.price);
                
                parent.appendChild(product);
            }
        });
})();
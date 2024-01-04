(() => {
    window.onload = () => {
        setTimeout(() => {
            document.querySelector(".loading")
                .classList.add("hidden");
        }, 1000);
    }
})();
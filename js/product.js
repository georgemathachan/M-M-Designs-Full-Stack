//handling product page interactions (image zoom, variations)

//for the description on product detail page
document.querySelectorAll(".description-toggle").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement;
        item.classList.toggle("active");
    });
});

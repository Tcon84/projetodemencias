document.addEventListener("DOMContentLoaded", function () {

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);

                       const ano = document.getElementById("ano-atual");
            if (ano) {
                ano.textContent = new Date().getFullYear();
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o footer:", error);
        });

});
function searchSite() {

    let input = document.getElementById("siteSearch");
    let filter = input.value.toLowerCase();

    removeHighlights();

    if (filter.length < 2) return;

    let content = document.querySelector("section");

    highlightText(content, filter);
}

function highlightText(element, keyword) {

    if (!element) return;

    let walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while(node = walker.nextNode()) {

        if(node.nodeValue.toLowerCase().includes(keyword)) {

            let span = document.createElement("span");
            span.className = "highlight";

            let regex = new RegExp(`(${keyword})`, "gi");

            span.innerHTML =
                node.nodeValue.replace(regex, "<mark>$1</mark>");

            node.parentNode.replaceChild(span, node);
        }
    }

    let first = document.querySelector("mark");
    if(first){
        first.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

function removeHighlights() {
    document.querySelectorAll("mark").forEach(el => {
        el.replaceWith(el.textContent);
    });
}

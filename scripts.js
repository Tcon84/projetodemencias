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

let searchIndex = [];

async function buildSearchIndex() {

    const response = await fetch("pages.json");
    const pages = await response.json();

    for (const page of pages) {

        try {
            const res = await fetch(page);
            const text = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            const title =
                doc.querySelector("h1")?.innerText ||
                doc.title ||
                page;

            const content =
                doc.body.innerText.toLowerCase();

            searchIndex.push({
                title,
                url: page,
                content
            });

        } catch (error) {
            console.log("Erro a indexar:", page);
        }
    }
}

function searchSite() {

    const query =
        document.getElementById("siteSearch")
        .value
        .toLowerCase();

    const resultsBox =
        document.getElementById("searchResults");

    resultsBox.innerHTML = "";

    if (query.length < 2) return;

    const results = searchIndex.filter(p =>
        p.content.includes(query)
    );

    results.forEach(result => {

        const item = document.createElement("div");
        item.className = "search-result";

        item.innerHTML =
            `<a href="${result.url}">
                ${result.title}
            </a>`;

        resultsBox.appendChild(item);
    });
}

buildSearchIndex();

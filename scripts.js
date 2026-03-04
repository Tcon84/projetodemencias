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

fetch("search-data.json")
.then(response => response.json())
.then(data => searchIndex = data);

function globalSearch() {

    let input =
        document.getElementById("globalSearch")
        .value.toLowerCase();

    let resultsBox =
        document.getElementById("searchResults");

    resultsBox.innerHTML = "";

    if(input.length < 2) return;

    let results = searchIndex.filter(page =>
        page.title.toLowerCase().includes(input) ||
        page.content.toLowerCase().includes(input)
    );

    results.forEach(r => {

        let div = document.createElement("div");
        div.className = "result-item";

        div.innerHTML =
            `<strong>${r.title}</strong><br>
             <small>${r.url}</small>`;

        div.onclick = () => {
            window.location.href = r.url;
        };

        resultsBox.appendChild(div);
    });
}

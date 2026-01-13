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

document.addEventListener("DOMContentLoaded", function () {
    const ano = document.getElementById("ano-atual");
    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
});

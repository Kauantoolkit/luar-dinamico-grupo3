const URL = "https://2yrpcu57.api.sanity.io/v2022-03-07/data/query/lunar?query=*%5B_type+%3D%3D+%22categoria%22%5D%7B%0A++imagem+%7B%0A++++asset+-%3E+%7B%0A++++++url%0A++++%7D%0A++%7D%0A%7D%0A";

window.addEventListener("load", async function () {
    console.log("Página carregada");

    try {
        const resultado = await fetch(URL, {
            method: "GET",
        });

        if (!resultado.ok) {
            throw new Error("Erro ao buscar dados: " + resultado.statusText);
        }

        const json = await resultado.json();
        console.log("Dados carregados:", json);

        const categoriaContainer = document.querySelector("body > main > section.categories > section > div > div > div");

        for (let index = 0; index < json.result.length; index++) {
            console.log("Entrou no loop");

            const imgUrl = json.result[index].imagem?.asset?.url;
            if (imgUrl) {
                // Criar a div com as configurações
                const div = document.createElement("div");
                div.classList.add("col-3", "cursor-pointer");
                div.setAttribute("onclick", "link('/produto.html')");

                // Criar a imagem
                const img = document.createElement("img");
                img.classList.add("fotos_descaralhadas")
                img.src = imgUrl;

                // Inserir a imagem na div
                div.appendChild(img);

                // Adicionar a div ao container
                if (categoriaContainer) {
                    categoriaContainer.appendChild(div);
                    console.log("Div com imagem adicionada");
                }
            }
        }
    } catch (error) {
        console.error("Erro:", error);
    }
});

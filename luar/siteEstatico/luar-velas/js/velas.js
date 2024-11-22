const URL_Velas = "https://2yrpcu57.api.sanity.io/v2022-03-07/data/query/lunar?query=*%5B_type+%3D%3D+%22productWithRating%22%5D%7B%0A++title%2C%0A++rating%2C%0A++image%7Basset-%3E%7Burl%7D%7D%0A%7D%0A%0A%0A%0A++%0A";

window.addEventListener("load", async function () {
    console.log("Página carregada");

    try {
        const resultado = await fetch(URL_Velas, { method: "GET" });

        if (!resultado.ok) {
            throw new Error("Erro ao buscar dados: " + resultado.statusText);
        }

        const json = await resultado.json();
        console.log("Dados carregados:", json);

        const velasContainer = document.querySelector(".row.sc-610\\:flex-col");

        if (!velasContainer) {
            console.error("Container não encontrado!");
            return;
        }

        for (let index = 0; index < json.result.length; index++) {
            console.log(`Vela ${index + 1}:`, json.result[index]);

            const vela = json.result[index];
            const nome = vela.title;
            const avaliacao = vela.rating;
            const imgUrl = vela.image?.asset?.url;

            if (imgUrl && nome) {
                console.log(`Adicionando vela: ${nome}`);

                const div = document.createElement("div");
                div.classList.add("col-4");

                const link = document.createElement("a");
                link.classList.add("to_ficando_maluco_com_oq_fizeram_nesse_site")
                link.href = "produto.html";

                const img = document.createElement("img");
                img.classList.add("shadow-default");
                img.src = imgUrl;

                link.appendChild(img);

                const h4 = document.createElement("h4");
                h4.classList.add("mt-[5px]");
                h4.textContent = nome;

                const ratingDiv = document.createElement("div");
                ratingDiv.classList.add("rating");

                const estrelasCheias = Math.floor(avaliacao || 0);
                const meiaEstrela = avaliacao % 1 >= 0.5;
                const estrelasVazias = 5 - estrelasCheias - (meiaEstrela ? 1 : 0);

                for (let i = 0; i < estrelasCheias; i++) {
                    const star = document.createElement("i");
                    star.classList.add("fa", "fa-star");
                    ratingDiv.appendChild(star);
                }

                if (meiaEstrela) {
                    const halfStar = document.createElement("i");
                    halfStar.classList.add("fas", "fa-star-half-alt");
                    ratingDiv.appendChild(halfStar);
                }

                for (let i = 0; i < estrelasVazias; i++) {
                    const emptyStar = document.createElement("i");
                    emptyStar.classList.add("fa", "fa-star-o");
                    ratingDiv.appendChild(emptyStar);
                }

                div.appendChild(link);
                div.appendChild(h4);
                div.appendChild(ratingDiv);

                velasContainer.appendChild(div);
                console.log(`Vela ${nome} adicionada.`);
            } else {
                console.warn(`Dados insuficientes para a vela:`, vela);
            }
        }
    } catch (error) {
        console.error("Erro ao carregar as velas:", error);
    }
});

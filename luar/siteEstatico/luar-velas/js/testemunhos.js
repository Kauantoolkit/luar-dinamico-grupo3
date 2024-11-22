const BANNER_URL = "https://2yrpcu57.api.sanity.io/v2022-03-07/data/query/lunar?query=*[_type == 'productBanner']{title, description, bannerImage{asset->{url}}, whatsappLink}";

window.addEventListener("load", async function () {
    console.log("Página carregada");

    try {
        const resultado = await fetch(BANNER_URL, { method: "GET" });

        if (!resultado.ok) {
            throw new Error("Erro ao buscar dados do banner: " + resultado.statusText);
        }

        const json = await resultado.json();
        console.log("Dados carregados:", json);

        const bannerContainer = document.querySelector(".row"); // Ajuste o seletor se necessário

        if (!bannerContainer) {
            console.error("Container do banner não encontrado!");
            return;
        }

        for (let i = 0; i < json.result.length; i++) {
            const banner = json.result[i];
            const title = banner.title;
            const description = banner.description;
            const bannerImgUrl = banner.bannerImage?.asset?.url;
            const whatsappLink = banner.whatsappLink;

            if (title && description && bannerImgUrl) {
                // Criar a estrutura do banner
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("row");

                // Coluna 1 - Imagem do banner
                const col1 = document.createElement("div");
                col1.classList.add("col-2");

                const img = document.createElement("img");
                img.src = bannerImgUrl;
                img.classList.add("offer-img", "sc-1120");

                col1.appendChild(img);

                // Coluna 2 - Título e descrição
                const col2 = document.createElement("div");
                col2.classList.add("col-2");

                const p = document.createElement("p");
                p.textContent = "Nova linha!";

                const h1 = document.createElement("h1");
                h1.classList.add("sc-420:!text-[27px]");
                h1.textContent = title;

                const small = document.createElement("small");
                small.textContent = description;

                const link = document.createElement("a");
                link.classList.add("btn", "cursor-pointer", "hover:!text-[white]");
                link.textContent = "Compre Agora! →";

                if (whatsappLink) {
                    link.setAttribute("href", whatsappLink);
                    link.setAttribute("target", "_blank");
                }

                col2.appendChild(p);
                col2.appendChild(h1);
                col2.appendChild(small);
                col2.appendChild(link);

                rowDiv.appendChild(col1);
                rowDiv.appendChild(col2);

                bannerContainer.appendChild(rowDiv);
                console.log("Banner adicionado.");
            }
        }
    } catch (error) {
        console.error("Erro ao carregar o banner:", error);
    }
});

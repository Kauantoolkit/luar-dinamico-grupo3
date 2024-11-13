const URL_TEXTOS = "https://2yrpcu57.api.sanity.io/v2022-03-07/data/query/lunar?query=*%5B_type+%3D%3D+%22sobreNos%22%5D%7B%0A++title%2C%0A++paragraph%2C%0A++additionalText%0A%7D%0A%0A&perspective=published";

window.addEventListener("load", async function () {
    console.log("Página carregada");

    try {
        const resultado = await fetch(URL_TEXTOS, {
            method: "GET",
        });

        if (!resultado.ok) {
            throw new Error("Erro ao buscar dados: " + resultado.statusText);
        }

        const json = await resultado.json();
        console.log("Dados carregados:", json);

        const container = document.querySelector("body > main > div.about > div > div"); 

        for (let index = 0; index < json.result.length; index++) {
            console.log("Entrou no loop de textos");

            const item = json.result[index];
            const title = item.title;
            const paragraph = item.paragraph;
            const additionalText = item.additionalText;

            if (title || paragraph || additionalText) {
                
                const divCol2 = document.createElement("div");
                divCol2.classList.add("col-2");

           
                if (paragraph) {
                    const paragrafo = document.createElement("p");
                    paragrafo.textContent = paragraph;
                    divCol2.appendChild(paragrafo);
                }

          
                if (title) {
                    const titulo = document.createElement("h1");
                    titulo.textContent = title;
                    titulo.classList.add("sc-420:!text-[27px]");
                    divCol2.appendChild(titulo);
                }

            
                if (additionalText) {
                    const textoAdicional = document.createElement("small");
                    textoAdicional.innerHTML = additionalText; 
                    divCol2.appendChild(textoAdicional);
                }

                
                if (index === 1) {
                    const buttonContainer = document.createElement("div");
                    buttonContainer.style.marginTop = "20px"; 
                    const button = document.createElement("a");
                    button.textContent = "Entre em contato! →";
                    button.setAttribute("onclick", "link('https://api.whatsapp.com/send/?phone=5545920013524&text=Olá, gostaria de saber mais sobre as velas da Luar.&type=phone_number&app_absent=0')");
                    button.classList.add("btn", "cursor-pointer", "hover:!text-[white]");
                    buttonContainer.appendChild(button);

                    divCol2.appendChild(buttonContainer);  
                }

                
                if (container) {
                    container.appendChild(divCol2);
                    console.log("Div `col-2` com conteúdo adicionada");
                }
            }
        }
    } catch (error) {
        console.error("Erro:", error);
    }
});

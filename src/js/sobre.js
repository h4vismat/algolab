
/* ==========================================
   ALGOLAB — INTERAÇÕES DA PÁGINA SOBRE
========================================== */

/* ==========================================
   01 — CARDS EXPANSÍVEIS DA EQUIPE
========================================== */

const teamCards = document.querySelectorAll(".team-card");

teamCards.forEach((card) => {

    const button = card.querySelector(".team-card-toggle");
    const details = card.querySelector(".team-details");

    // Verifica se os elementos existem
    if (!button || !details) return;

    button.addEventListener("click", () => {

        // Verifica se o card já está aberto
        const isOpen = card.classList.contains("active");

        // Fecha todos os cards
        teamCards.forEach((item) => {

            item.classList.remove("active");

            const itemButton =
                item.querySelector(".team-card-toggle");

            const itemDetails =
                item.querySelector(".team-details");

            itemButton.setAttribute("aria-expanded", "false");
            itemDetails.hidden = true;

        });

        // Abre o card selecionado, caso estivesse fechado
        if (!isOpen) {

            card.classList.add("active");

            button.setAttribute("aria-expanded", "true");

            details.hidden = false;

        }

    });

});

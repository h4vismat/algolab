
/* ==========================================
   ALGOLAB — COMPARAÇÃO DOS ALGORITMOS
========================================== */

// ==========================================
// 1. ELEMENTOS DA INTERFACE
// ==========================================

const algorithmOptions = document.querySelectorAll(".algorithm-option");

const compareButton = document.getElementById("compare-algorithms");

const comparisonFeedback = document.getElementById("comparison-feedback");

const comparisonResult = document.getElementById("comparison-result");

// ==========================================
// 2. DADOS DOS ALGORITMOS
// ==========================================

const algorithms = {

    bubble: {
        name: "Bubble Sort",

        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",

        explanation:
            "O Bubble Sort é simples de implementar e pode apresentar desempenho linear quando a lista já está ordenada, desde que sua implementação utilize a verificação de trocas. Entretanto, em listas desordenadas, tende a realizar muitas comparações e movimentações."
    },

    insertion: {
        name: "Insertion Sort",

        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",

        explanation:
            "O Insertion Sort é especialmente eficiente para listas pequenas ou parcialmente ordenadas. Seu melhor caso é linear, pois poucos deslocamentos são necessários. Em listas muito desordenadas, seu desempenho tende a ser quadrático."
    }

};

// ==========================================
// 3. ESTADO DAS SELEÇÕES
// ==========================================

const selectedAlgorithms = {
    one: null,
    two: null
};

// ==========================================
// 4. ATUALIZAÇÃO DOS CARDS
// ==========================================

function updateAlgorithmSelection() {

    algorithmOptions.forEach(option => {

        const algorithm = option.dataset.algorithm;
        const selector = option.dataset.selector;

        const otherSelector = selector === "one" ? "two" : "one";

        const isSelected =
            selectedAlgorithms[selector] === algorithm;

        const selectedInOtherPanel =
            selectedAlgorithms[otherSelector] === algorithm;

        // Destaque visual
        option.classList.toggle("selected", isSelected);

        // Bloqueio de duplicidade
        option.disabled = selectedInOtherPanel;

        // Acessibilidade
        option.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

    });

    updateComparisonButton();

}

// ==========================================
// 5. CONTROLE DO BOTÃO
// ==========================================

function updateComparisonButton() {

    const bothSelected =
        selectedAlgorithms.one !== null &&
        selectedAlgorithms.two !== null;

    compareButton.disabled = !bothSelected;

    if (bothSelected) {

        comparisonFeedback.textContent =
            "Tudo pronto! Você já pode comparar os algoritmos.";

    } else {

        comparisonFeedback.textContent =
            "Selecione dois algoritmos diferentes para continuar.";

    }

}

// ==========================================
// 6. SELEÇÃO E DESSELEÇÃO
// ==========================================

algorithmOptions.forEach(option => {

    option.addEventListener("click", () => {

        const algorithm = option.dataset.algorithm;
        const selector = option.dataset.selector;

        // Clicar novamente no escolhido desmarca
        if (selectedAlgorithms[selector] === algorithm) {

            selectedAlgorithms[selector] = null;

        } else {

            // Seleciona ou substitui a escolha anterior
            selectedAlgorithms[selector] = algorithm;

        }

        // Oculta resultados antigos após qualquer alteração
        comparisonResult.hidden = true;

        updateAlgorithmSelection();

    });

});

// ==========================================
// 7. PREENCHIMENTO DA TABELA
// ==========================================

function fillComparisonTable() {

    const first = algorithms[selectedAlgorithms.one];
    const second = algorithms[selectedAlgorithms.two];

    // Nomes dos algoritmos
    document.getElementById("result-algorithm-one").textContent =
        first.name;

    document.getElementById("result-algorithm-two").textContent =
        second.name;

    // Melhor caso
    document.getElementById("result-best-one").textContent =
        first.best;

    document.getElementById("result-best-two").textContent =
        second.best;

    // Caso médio
    document.getElementById("result-average-one").textContent =
        first.average;

    document.getElementById("result-average-two").textContent =
        second.average;

    // Pior caso
    document.getElementById("result-worst-one").textContent =
        first.worst;

    document.getElementById("result-worst-two").textContent =
        second.worst;

    // Complexidade espacial
    document.getElementById("result-space-one").textContent =
        first.space;

    document.getElementById("result-space-two").textContent =
        second.space;

    // Título da comparação
    document.getElementById("comparison-title").textContent =
        `${first.name} × ${second.name}`;

    // Análise comparativa
    document.getElementById("comparison-explanation").innerHTML = `
        <p>
            <strong>${first.name}:</strong>
            ${first.explanation}
        </p>

        <p>
            <strong>${second.name}:</strong>
            ${second.explanation}
        </p>
    `;

}

// ==========================================
// 8. EXECUTAR COMPARAÇÃO
// ==========================================

compareButton.addEventListener("click", () => {

    // Verifica se as duas seleções são válidas
    if (
        !selectedAlgorithms.one ||
        !selectedAlgorithms.two ||
        selectedAlgorithms.one === selectedAlgorithms.two
    ) {
        return;
    }

    fillComparisonTable();

    // Exibe os resultados
    comparisonResult.hidden = false;

    // Leva o usuário até o resultado
    comparisonResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

// ==========================================
// 9. INICIALIZAÇÃO
// ==========================================

updateAlgorithmSelection();

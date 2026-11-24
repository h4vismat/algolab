
(() => {

    // ==========================================
    // 1. SELEÇÃO DO ALGORITMO
    // ==========================================

    const algorithmOptions = document.querySelectorAll(
        'input[name="algoritmo"]'
    );

    function updateSelectedAlgorithm() {
        algorithmOptions.forEach((option) => {
            const algorithm = option.value;

            document.getElementById(`${algorithm}-info`).hidden =
                !option.checked;

            document.getElementById(`${algorithm}-display`).hidden =
                !option.checked;

            // Pausa o vídeo quando o algoritmo é desmarcado
            if (!option.checked) {
                const video = document.getElementById(`${algorithm}-video`);

                if (video) {
                    video.pause();
                }
            }
        });
    }

    algorithmOptions.forEach((option) => {
        option.addEventListener('change', updateSelectedAlgorithm);
    });

    updateSelectedAlgorithm();


    // ==========================================
    // 2. CONFIGURAÇÃO DOS CONTROLES
    // ==========================================

    function configureVideoControls(algorithm) {

        const video = document.getElementById(`${algorithm}-video`);

        const playButton = document.getElementById(
            `${algorithm}-play-button`
        );

        const pauseButton = document.getElementById(
            `${algorithm}-pause-button`
        );

        const restartButton = document.getElementById(
            `${algorithm}-restart-button`
        );

        const speedControl = document.getElementById(
            `${algorithm}-animation-speed`
        );

        // Verifica se os elementos existem
        if (!video || !playButton || !pauseButton ||
            !restartButton || !speedControl) {

            console.error(`Elementos não encontrados: ${algorithm}`);
            return;
        }

        // ==========================================
        // INDICADOR DE ESTADO
        // ==========================================

        const statusContainer = document.getElementById(
            `${algorithm}-status-indicator`
        ).parentElement;

        const statusText = document.getElementById(
            `${algorithm}-status-text`
        );

        function updateVideoStatus(status, message) {
            statusContainer.classList.remove(
                'is-ready',
                'is-playing',
                'is-paused',
                'is-finished'
            );

            statusContainer.classList.add(`is-${status}`);
            statusText.textContent = message;
        }

        // Estado inicial
        updateVideoStatus('ready', 'Pronto');

        // Detecta reprodução
        video.addEventListener('play', () => {
            updateVideoStatus('playing', 'Reproduzindo');
        });

        // Detecta pausa
        video.addEventListener('pause', () => {
            if (video.ended) {
                return;
            }

            if (video.currentTime === 0) {
                updateVideoStatus('ready', 'Pronto');
            } else {
                updateVideoStatus('paused', 'Pausado');
            }
        });

        // Detecta finalização
        video.addEventListener('ended', () => {
            updateVideoStatus('finished', 'Finalizado');
        });

        // ==========================================
        // 3. INICIAR
        // ==========================================

        playButton.addEventListener('click', () => {

            video.play().catch((error) => {
                console.error('Erro ao reproduzir:', error);
            });

        });


        // ==========================================
        // 4. PAUSAR
        // ==========================================

        pauseButton.addEventListener('click', () => {

            video.pause();

        });


        // ==========================================
        // 5. REINICIAR
        // ==========================================

        restartButton.addEventListener('click', () => {

            video.pause();
            video.currentTime = 0;

            video.play().catch((error) => {
                console.error('Erro ao reiniciar:', error);
            });

        });


        // ==========================================
        // 6. ALTERAR VELOCIDADE
        // ==========================================

        speedControl.addEventListener('change', () => {

            video.playbackRate = Number(speedControl.value);

        });

    }


    // ==========================================
    // 7. INICIALIZAR CONTROLES
    // ==========================================

    configureVideoControls('bubble');
    configureVideoControls('insertion');

})();


const bubbleCode = document.getElementById("bubble-python-code");
const bubbleCopyButton = document.getElementById("bubble-copy-code");

bubbleCopyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(bubbleCode.textContent);

        bubbleCopyButton.innerHTML =
            '<i class="fa-solid fa-check"></i> Copiado!';

        setTimeout(() => {
            bubbleCopyButton.innerHTML =
                '<i class="fa-regular fa-copy"></i> Copiar';
        }, 2000);

    } catch (error) {
        console.error("Não foi possível copiar o código:", error);
    }
});

// Alterar o algoritmo da implementação 


const bubbleCodes = {
    python: {
        name: "Exemplo em Python",
        icon: "fa-brands fa-python",
        code: `def bubble_sort(lista):
    n = len(lista)

    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = (
                    lista[j + 1],
                    lista[j]
                )

    return lista`
    },

    c: {
        name: "Exemplo em C",
        icon: "fa-solid fa-code",
        code: `#include <stdio.h>

void bubbleSort(int lista[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (lista[j] > lista[j + 1]) {
                int temp = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temp;
            }
        }
    }
}`
    },

    javascript: {
        name: "Exemplo em JavaScript",
        icon: "fa-brands fa-js",
        code: `function bubbleSort(lista) {
    const n = lista.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (lista[j] > lista[j + 1]) {
                [lista[j], lista[j + 1]] =
                    [lista[j + 1], lista[j]];
            }
        }
    }

    return lista;
}`
    },

    java: {
        name: "Exemplo em Java",
        icon: "fa-brands fa-java",
        code: `public class BubbleSort {

    public static void bubbleSort(int[] lista) {
        int n = lista.length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (lista[j] > lista[j + 1]) {
                    int temp = lista[j];
                    lista[j] = lista[j + 1];
                    lista[j + 1] = temp;
                }
            }
        }
    }
}`
    }
};


// ==========================================
// 1. ELEMENTOS DA INTERFACE
// ==========================================

const languageToggle = document.getElementById("bubble-language-toggle");
const languageOptions = document.getElementById("bubble-language-options");
const languageName = document.getElementById("bubble-language-name");
const codeElement = document.getElementById("bubble-python-code");


// ==========================================
// 2. ABRIR E FECHAR SELETOR DE LINGUAGEM
// ==========================================

if (languageToggle && languageOptions) {

    languageToggle.addEventListener("click", () => {
        const isExpanded =
            languageToggle.getAttribute("aria-expanded") === "true";

        languageToggle.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        languageOptions.hidden = isExpanded;
    });


    // Fechar ao clicar fora do seletor

    document.addEventListener("click", (event) => {
        const clickedInside =
            languageToggle.contains(event.target) ||
            languageOptions.contains(event.target);

        if (!clickedInside) {
            languageOptions.hidden = true;
            languageToggle.setAttribute("aria-expanded", "false");
        }
    });


    // Fechar com a tecla ESC

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            languageOptions.hidden = true;
            languageToggle.setAttribute("aria-expanded", "false");
        }
    });

}


// ==========================================
// 3. TROCAR LINGUAGEM DO CÓDIGO
// ==========================================

if (languageOptions && codeElement && languageName && languageToggle) {

    const languageIcon = languageToggle.querySelector(
        ".fa-brands, .fa-code"
    );

    languageOptions.querySelectorAll("button").forEach((button) => {

        button.addEventListener("click", () => {

            const language = button.dataset.language;
            const selectedCode = bubbleCodes[language];

            if (!selectedCode) return;

            // Atualizar nome da linguagem
            languageName.textContent = selectedCode.name;

            // Atualizar ícone
            if (languageIcon) {
                languageIcon.className = selectedCode.icon;
            }

            // Atualizar código exibido
            codeElement.textContent = selectedCode.code;

            // Atualizar classe da linguagem
            codeElement.className = `language-${language}`;

            // Fechar menu
            languageOptions.hidden = true;

            languageToggle.setAttribute("aria-expanded", "false");

        });

    });

}

// Atualização de implementação Insertion Sort


const insertionCodes = {
    python: {
        name: "Exemplo em Python",
        icon: "fa-brands fa-python",
        code: `def insertion_sort(lista):
    for i in range(1, len(lista)):
        chave = lista[i]
        j = i - 1

        while j >= 0 and lista[j] > chave:
            lista[j + 1] = lista[j]
            j -= 1

        lista[j + 1] = chave

    return lista`
    },

    c: {
        name: "Exemplo em C",
        icon: "fa-solid fa-code",
        code: `void insertionSort(int lista[], int n) {
    for (int i = 1; i < n; i++) {
        int chave = lista[i];
        int j = i - 1;

        while (j >= 0 && lista[j] > chave) {
            lista[j + 1] = lista[j];
            j--;
        }

        lista[j + 1] = chave;
    }
}`
    },

    javascript: {
        name: "Exemplo em JavaScript",
        icon: "fa-brands fa-js",
        code: `function insertionSort(lista) {
    for (let i = 1; i < lista.length; i++) {
        let chave = lista[i];
        let j = i - 1;

        while (j >= 0 && lista[j] > chave) {
            lista[j + 1] = lista[j];
            j--;
        }

        lista[j + 1] = chave;
    }

    return lista;
}`
    },

    java: {
        name: "Exemplo em Java",
        icon: "fa-brands fa-java",
        code: `public class InsertionSort {

    public static void insertionSort(int[] lista) {
        for (int i = 1; i < lista.length; i++) {
            int chave = lista[i];
            int j = i - 1;

            while (j >= 0 && lista[j] > chave) {
                lista[j + 1] = lista[j];
                j--;
            }

            lista[j + 1] = chave;
        }
    }
}`
    }
};


// ==========================================
// 1. ELEMENTOS DA INTERFACE
// ==========================================

const insertionLanguageToggle =
    document.getElementById("insertion-language-toggle");

const insertionLanguageOptions =
    document.getElementById("insertion-language-options");

const insertionLanguageName =
    document.getElementById("insertion-language-name");

const insertionCodeElement =
    document.getElementById("insertion-python-code");


// ==========================================
// 2. ABRIR E FECHAR SELETOR
// ==========================================

if (insertionLanguageToggle && insertionLanguageOptions) {

    insertionLanguageToggle.addEventListener("click", () => {

        const isExpanded =
            insertionLanguageToggle.getAttribute("aria-expanded") === "true";

        insertionLanguageToggle.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        insertionLanguageOptions.hidden = isExpanded;

    });


    // Fechar ao clicar fora

    document.addEventListener("click", (event) => {

        const clickedInside =
            insertionLanguageToggle.contains(event.target) ||
            insertionLanguageOptions.contains(event.target);

        if (!clickedInside) {
            insertionLanguageOptions.hidden = true;

            insertionLanguageToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });


    // Fechar com ESC

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            insertionLanguageOptions.hidden = true;

            insertionLanguageToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

}


// ==========================================
// 3. TROCAR LINGUAGEM
// ==========================================

if (
    insertionLanguageOptions &&
    insertionCodeElement &&
    insertionLanguageName &&
    insertionLanguageToggle
) {

    const insertionLanguageIcon =
        insertionLanguageToggle.querySelector(".fa-brands, .fa-code");

    insertionLanguageOptions.querySelectorAll("button").forEach((button) => {

        button.addEventListener("click", () => {

            const language = button.dataset.language;
            const selectedCode = insertionCodes[language];

            if (!selectedCode) return;

            // Atualizar nome
            insertionLanguageName.textContent = selectedCode.name;

            // Atualizar ícone
            if (insertionLanguageIcon) {
                insertionLanguageIcon.className = selectedCode.icon;
            }

            // Atualizar código
            insertionCodeElement.textContent = selectedCode.code;

            // Atualizar classe
            insertionCodeElement.className = `language-${language}`;

            // Fechar menu
            insertionLanguageOptions.hidden = true;

            insertionLanguageToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


const insertionCopyButton =
    document.getElementById("insertion-copy-code");

if (insertionCopyButton && insertionCodeElement) {

    insertionCopyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                insertionCodeElement.textContent
            );

            insertionCopyButton.innerHTML =
                '<i class="fa-solid fa-check"></i> Copiado!';

            insertionCopyButton.disabled = true;

            setTimeout(() => {

                insertionCopyButton.innerHTML =
                    '<i class="fa-regular fa-copy"></i> Copiar';

                insertionCopyButton.disabled = false;

            }, 2000);

        } catch (error) {

            console.error("Erro ao copiar código:", error);

            insertionCopyButton.textContent = "Erro ao copiar";

            setTimeout(() => {

                insertionCopyButton.innerHTML =
                    '<i class="fa-regular fa-copy"></i> Copiar';

            }, 2000);

        }

    });

}

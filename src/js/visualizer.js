(() => {
    const algorithmOptions = document.querySelectorAll('input[name="algoritmo"]');

    function updateSelectedAlgorithm() {
        algorithmOptions.forEach((option) => {
            document.getElementById(`${option.value}-info`).hidden = !option.checked;
            document.getElementById(`${option.value}-display`).hidden = !option.checked;
        });
    }

    algorithmOptions.forEach((option) => {
        option.addEventListener('change', updateSelectedAlgorithm);
    });

    updateSelectedAlgorithm();
})();

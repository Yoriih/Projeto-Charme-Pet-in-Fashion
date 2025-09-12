document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA ANIMAÇÃO AO ROLAR A PÁGINA ---

    // Seleciona todos os elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Configurações do Intersection Observer
    // 'threshold: 0.1' significa que a animação começa quando 10% do elemento está visível
    const observerOptions = {
        root: null, // observa a viewport
        rootMargin: '0px',
        threshold: 0.1
    };

    // Cria o observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está na tela (intersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe que torna o elemento visível
                entry.target.classList.add('is-visible');
                // Para a observação para que a animação não se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Manda o observador "observar" cada um dos elementos selecionados
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});
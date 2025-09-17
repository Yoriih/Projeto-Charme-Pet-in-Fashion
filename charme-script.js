// Substitua todo o conteúdo do seu charme-script.js por este código

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA ANIMAÇÃO AO ROLAR A PÁGINA ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });


    // --- LÓGICA PARA FILTRO DA VITRINE DE PRODUTOS ---
    const containerFiltros = document.querySelector('.filtros');
    if (containerFiltros) {
        
        const botoesFiltro = containerFiltros.querySelectorAll('.btn-filtro');
        const cardsProduto = document.querySelectorAll('.card-produto');

        botoesFiltro.forEach(botao => {
            botao.addEventListener('click', () => {
                botoesFiltro.forEach(btn => btn.classList.remove('active'));
                botao.classList.add('active');

                const filtro = botao.getAttribute('data-filter');

                cardsProduto.forEach(card => {
                    if (filtro === 'all' || card.classList.contains(filtro)) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

});

// --- LÓGICA PARA FORMULÁRIO SOB MEDIDA ---

document.addEventListener('DOMContentLoaded', () => {
    const formWizard = document.querySelector('.form-wizard');
    if (formWizard) {
        const etapas = formWizard.querySelectorAll('.etapa-form');
        const botoesProximo = formWizard.querySelectorAll('.btn-proximo');
        const botoesAnterior = formWizard.querySelectorAll('.btn-anterior');
        const passosProgresso = document.querySelectorAll('.barra-progresso .passo');
        let etapaAtual = 0;

        const atualizarEtapas = () => {
            etapas.forEach((etapa, index) => {
                etapa.classList.toggle('active', index === etapaAtual);
            });
            passosProgresso.forEach((passo, index) => {
                passo.classList.toggle('active', index <= etapaAtual);
            });
        };

        botoesProximo.forEach(botao => {
            botao.addEventListener('click', () => {
                if (etapaAtual < etapas.length - 1) {
                    etapaAtual++;
                    atualizarEtapas();
                }
            });
        });

        botoesAnterior.forEach(botao => {
            botao.addEventListener('click', () => {
                if (etapaAtual > 0) {
                    etapaAtual--;
                    atualizarEtapas();
                }
            });
        });

        // Interatividade do Diagrama de Medidas
        const inputsMedida = formWizard.querySelectorAll('.input-medida');
        const pontosMedida = formWizard.querySelectorAll('.ponto-medida');
        
        inputsMedida.forEach(input => {
            input.addEventListener('focus', () => {
                const targetId = input.getAttribute('data-target');
                pontosMedida.forEach(ponto => {
                    ponto.classList.remove('active');
                    if (ponto.id === targetId) {
                        ponto.classList.add('active');
                    }
                });
            });
        });

        // Interatividade dos Cards de Estilo
        const cardsEstilo = formWizard.querySelectorAll('.card-estilo');
        cardsEstilo.forEach(card => {
            card.addEventListener('click', () => {
                cardsEstilo.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });

        // Inicializa o formulário
        atualizarEtapas();
    }
});

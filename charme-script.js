// Substitua todo o conteúdo do seu charme-script.js por este código

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE AUTENTICAÇÃO DE USUÁRIO ---

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const userIconLink = document.querySelector('.nav-icons a[href="login.html"]');

    // Alternar entre formulário de login e cadastro
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }
    
    // Processar formulário de CADASTRO
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('register-nome').value;
            const email = document.getElementById('register-email').value;
            const senha = document.getElementById('register-senha').value;

            // Pega os usuários existentes do localStorage ou cria um array vazio
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Verifica se o email já existe
            if (users.find(user => user.email === email)) {
                alert('Este e-mail já está cadastrado!');
                return;
            }

            // Adiciona o novo usuário
            users.push({ nome, email, senha });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Cadastro realizado com sucesso! Faça o login.');
            showLoginLink.click(); // Mostra o formulário de login
        });
    }

    // Processar formulário de LOGIN
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.senha === senha);

            if (user) {
                // Salva o usuário logado na sessão (sessionStorage)
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                alert(`Bem-vindo(a) de volta, ${user.nome}!`);
                window.location.href = 'index.html'; // Redireciona para a página inicial
            } else {
                alert('E-mail ou senha incorretos.');
            }
        });
    }

    // Verificar status do login e atualizar a UI (ícone de usuário)
    function checkLoginStatus() {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            // Se estiver logado, muda o ícone para um de 'logout'

            // falta criar uma página "minha-conta.html"

            userIconLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>'; 
            userIconLink.href = "#"; // Evita que vá para a página de login
            userIconLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Deseja realmente sair?')) {
                    sessionStorage.removeItem('loggedInUser');
                    alert('Você saiu da sua conta.');
                    window.location.href = 'index.html';
                }
            });
        }
    }


    // --- LÓGICA DO CARRINHO DE COMPRAS ---
    
    const cartIcon = document.querySelector('.nav-icons a[href="carrinho.html"] i');

    // Função para atualizar o número no ícone do carrinho
    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItems > 0 && cartIcon) {
            // Contador visual no ícone
            if (!cartIcon.querySelector('span')) {
                const counter = document.createElement('span');
                counter.style.cssText = `
                    position: absolute; 
                    top: -5px; 
                    right: -10px; 
                    background: var(--primary-pink); 
                    color: white; 
                    border-radius: 50%; 
                    padding: 2px 6px; 
                    font-size: 10px;
                    font-weight: bold;
                `;
                cartIcon.style.position = 'relative';
                cartIcon.appendChild(counter);
            }
            cartIcon.querySelector('span').textContent = totalItems;
        } else if (cartIcon && cartIcon.querySelector('span')) {
            cartIcon.querySelector('span').remove();
        }
    }


    // Adicionar item das COLEÇÕES ao carrinho
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const nome = e.target.dataset.nome;
        const preco = parseFloat(e.target.dataset.preco);
        const imagem = e.target.dataset.imagem; // 

        addItemToCart({ id, nome, preco, imagem, quantity: 1 }); 
        alert(`${nome} foi adicionado ao carrinho!`);
        });
    });

    // Adicionar item SOB MEDIDA ao carrinho
    const sobMedidaForm = document.getElementById('sob-medida-form');
    if (sobMedidaForm) {
        sobMedidaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const petName = document.getElementById('nome-pet').value;
            const estilo = document.querySelector('.card-estilo.active')?.dataset.value || 'Não selecionado';

            if (!petName || estilo === 'Não selecionado') {
                alert('Por favor, preencha o nome do pet e selecione um estilo.');
                return;
            }

            const item = {
            id: `sm-${Date.now()}`,
            nome: `Peça Sob Medida para ${petName} (${estilo})`,
            preco: 120.00,
            
            imagem: 'https://raw.githubusercontent.com/Yoriih/Projeto-Charme-Pet-in-Fashion/main/images/linha.png',
            quantity: 1
            };
            addItemToCart(item);
            alert(`Sua peça sob medida para ${petName} foi adicionada ao carrinho!`);
            window.location.href = 'carrinho.html';
        });
    }

    // Função principal para adicionar item ao carrinho
    function addItemToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
    }

    // --- LÓGICA DA PÁGINA DO CARRINHO ---

    const carrinhoContainer = document.getElementById('carrinho-container');
    const carrinhoVazioMsg = document.getElementById('carrinho-vazio');

    function displayCart() {
        if (!carrinhoContainer) return; // Só e executado se estiver na página do carrinho

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        carrinhoContainer.innerHTML = ''; 

        if (cart.length === 0) {
            carrinhoVazioMsg.style.display = 'block';
        } else {
            carrinhoVazioMsg.style.display = 'none';
            let total = 0;

            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('carrinho-item');

                
                itemElement.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img">
                    <div class="carrinho-item-info">
                        <h4>${item.nome}</h4>
                        <p>Quantidade: ${item.quantity}</p>
                    </div>
                    <div class="carrinho-item-preco">
                        R$ ${(item.preco * item.quantity).toFixed(2)}
                    </div>
                    <button class="btn-remover" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
                `;
                carrinhoContainer.appendChild(itemElement);
                total += item.preco * item.quantity;
            });

            // Resumo e total
            const resumoElement = document.createElement('div');
            resumoElement.classList.add('carrinho-resumo');
            resumoElement.innerHTML = `
                <h3>Total: <span id="carrinho-total">R$ ${total.toFixed(2)}</span></h3>
                <button class="btn">Finalizar Compra</button>
                <button class="btn btn-limpar-carrinho">Limpar Carrinho</button>
            `;
            carrinhoContainer.appendChild(resumoElement);

            // Funcionalidade aos botões de remover e limpar
            document.querySelectorAll('.btn-remover').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = e.currentTarget.dataset.index;
                    removeItemFromCart(index);
                });
            });

            document.querySelector('.btn-limpar-carrinho').addEventListener('click', () => {
                if(confirm('Tem certeza que deseja esvaziar o carrinho?')) {
                    localStorage.removeItem('cart');
                    displayCart(); // Re-renderiza o carrinho
                    updateCartIcon();
                }
            });
        }
    }

    function removeItemFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1); // Remove o item pelo seu índice
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); // Re-renderiza o carrinho
        updateCartIcon();
    }

    // --- ANIMAÇÃO AO ROLAR A PÁGINA ---
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

    // --- FUNÇÕES QUE RODAM EM TODAS AS PÁGINAS ---
    checkLoginStatus();
    updateCartIcon();
    displayCart(); // Chama para renderizar o carrinho se estiver na página correta

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

// CHAVE
const firebaseConfig = {
    apiKey: "AIzaSyAGRijnq0geuxSKj9isCiMu1-w74godFAs",
    authDomain: "projetocharme-ea186.firebaseapp.com",
    projectId: "projetocharme-ea186",
    storageBucket: "projetocharme-ea186.firebasestorage.app",
    messagingSenderId: "944410308764",
    appId: "1:944410308764:web:d9c4540d97c0013b6abd59"
};

// inicialização
const app = initializeApp(firebaseConfig);

// variavel para que eu possar usar em outros scripts
const db = firebase.firestore();

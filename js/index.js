const botao = document.getElementById('btn-tema');
const corpo = document.body;

botao.addEventListener('click', () => {

    corpo.classList.toggle('dark-mode');

    if (corpo.classList.contains('dark-mode')) {
        botao.innerHTML = '<i class= "fa-solid fa-sun"></i> Modo Claro';
    } else {
        botao.innerHTML = '<i class= "fa-solid fa-moon"></i> Modo Escuro';

    }
 });

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

//puxa todos os repositorios do github que estão visivel, inclusivel os fork.
 //async function carregarProjetos() {
   // try {
       // const resposta = await fetch('https://api.github.com/users/wandersonstt/repos');

       // const repositorios = await resposta.json();

       // const container = document.getElementById('lista-projetos');

       // repositorios.forEach(repo => {

         //   const card = `
              //  <article>
                 //   <h3>${repo.name}</h3>
                 //   <p>${repo.description || 'Projeto sem descrição no momento.'}</p>
                 //   <a href="${repo.html_url}" target="_blank" style="color: var(--cor-texto); text-decoration: underline; font-weight: bold; margin-top: 10px; display: inline-block;">Ver código no GitHub</a>
             //   </article>
          //  `;

          //      container.innerHTML += card;
       // });
 //   } catch (erro) {
     //  console.error('Erro ao carregar os projetos:', erro);
 //   }   
// }

// carregarProjetos();

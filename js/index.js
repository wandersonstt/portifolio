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



// Função assíncrona para buscar os dados de rede do visitante
async function rastrearVisitante() {
    const painel = document.getElementById('dados-rede');

    try {
        // 1. Faz a requisição para a API pública
        const resposta = await fetch('https://ipapi.co/json/');
        
        // 2. Converte a resposta para um objeto que o JavaScript entende
        const dados = await resposta.json();

        // 3. Monta o texto que vai aparecer no terminal
        painel.innerHTML = `
            <p>> Acesso detectado!</p>
            <p>> <strong>IP:</strong> ${dados.ip}</p>
            <p>> <strong>Cidade:</strong> ${dados.city} - ${dados.region}</p>
            <p>> <strong>Provedor (ISP):</strong> ${dados.org}</p>
            <p>> Aguardando novos comandos<span class="cursor-pisca">_</span></p>
        `;

    } catch (erro) {
        // Se der algum erro (ex: pessoa com bloqueador de anúncios), mostramos isso:
        painel.innerHTML = `
            <p style="color: #ff5f56;">> Erro ao rastrear conexão. Firewall ou AdBlocker detectado.</p>
            <p>> Tente novamente mais tarde<span class="cursor-pisca">_</span></p>
        `;
        console.error('Erro na API:', erro);
    }
}

// Executa a função na hora que o site abre
rastrearVisitante();
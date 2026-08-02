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


/* =========================
   PROJETO: WEB RECON SCANNER
   ========================= */

async function iniciarScan() {
    const alvo = document.getElementById('alvo').value.trim();
    const terminal = document.getElementById('resultado-scan');

    if(!alvo) {
        terminal.innerHTML = "> ERRO: Nenhum alvo especificado. Digite um domínio.";
        return;
    }

    // 1. FILTRO: Limpa o texto digitado
    let alvoLimpo = alvo.replace("https://", "")
                        .replace("http://", "")
                        .replace("www.", "")
                        .split("/")[0];

    terminal.innerHTML = `> Mapeando alvo: ${alvoLimpo}...\n> Resolvendo DNS...`;

    try {
        // ==========================================
        // PASSO 1: RESOLUÇÃO DNS (Domínio -> IP)
        // ==========================================
        const dnsResponse = await fetch(`https://dns.google/resolve?name=${alvoLimpo}`);
        const dnsData = await dnsResponse.json();

        // Se o DNS não achar nada
        if (!dnsData.Answer) {
            terminal.innerHTML += `\n> FALHA: Servidor DNS não encontrou o domínio apontado.`;
            return;
        }

        // Pega o IPv4 (Registro Tipo 1)
        const registroIPv4 = dnsData.Answer.find(linha => linha.type === 1);
        const ipAlvo = registroIPv4 ? registroIPv4.data : dnsData.Answer[0].data;

        terminal.innerHTML += `\n> IP Localizado: [ ${ipAlvo} ]\n> Mapeando infraestrutura da rede...`;

        // ==========================================
        // PASSO 2: RASTREIO GEOJS (Nova API sem limites chatos)
        // ==========================================
       const urlApi = `https://get.geojs.io/v1/ip/geo/${ipAlvo}.json`;
        const proxyUrl = `https://corsproxy.io/?` + encodeURIComponent(urlApi);

        const ipResponse = await fetch(proxyUrl);
        const dados = await ipResponse.json();
        
        // Se a API retornar vazio
        if(!dados.ip) {
            terminal.innerHTML += `\n> FALHA DA API: Não foi possível rastrear os dados deste IP.`;
            return;
        }

        // Monta a tela final com as variáveis do GeoJS
        terminal.innerHTML = `
> ALVO LOCALIZADO
--------------------------------
> IP DO SERVIDOR : ${dados.ip}
> TIPO DE ROTA   : IPv4
> PAÍS           : ${dados.country} (${dados.country_code})
> REGIÃO         : ${dados.city}, ${dados.region}
> PROVEDOR (ISP) : ${dados.organization_name}
> ASN            : AS${dados.asn}
--------------------------------
> Scan finalizado com sucesso.`;

    } catch (erro) {
        terminal.innerHTML += `\n> ERRO CRÍTICO: Conexão recusada pelo servidor de rastreio.`;
        console.error(erro); 
    }
}



const listaSkills = document.querySelector('.lista-skills');
let intervaloSkills;
let indiceAtual = 0;

function iniciarCarrosselSkills() {
    clearInterval(intervaloSkills);
    
    // Só roda se a tela for de celular
    if (listaSkills && window.innerWidth <= 768) {
        const itens = listaSkills.querySelectorAll('.skill-item');
        const totalItens = itens.length;

        if (totalItens === 0) return;

        intervaloSkills = setInterval(() => {
            // Avança para o próximo item
            indiceAtual++;

            // Se passar do último item, volta pro primeiro (índice 0)
            if (indiceAtual >= totalItens) {
                indiceAtual = 0;
            }

            // Calcula a posição exata do card atual e rola suavemente
            const posicaoScroll = itens[indiceAtual].offsetLeft;
            listaSkills.scrollTo({
                left: posicaoScroll,
                behavior: 'smooth'
            });

        }, 2500); // Passa a cada 2.5 segundos
    }
}

// Inicia o carrossel
iniciarCarrosselSkills();

// Recalcula se a janela for redimensionada
window.addEventListener('resize', iniciarCarrosselSkills);
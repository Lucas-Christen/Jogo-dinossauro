✅ Próximas Tarefas (Prioridade Alta)
[x] 1. Implementar a Regra de Empate "Monte"

Descrição: Alterar a lógica de empate. Em vez de devolver as cartas, elas devem ser adicionadas a um "monte" temporário. O vencedor da rodada seguinte leva as cartas da rodada mais todas as cartas acumuladas no monte.

Arquivos Afetados: src/components/Game.tsx.

[x] 2. Expandir o Baralho para 30+ Dinossauros

Descrição: Pesquisar e adicionar mais dinossauros para atingir um total de pelo menos 30 cartas. O foco deve ser nos dinossauros que aparecem na saga Jurassic Park/World.

Arquivos Afetados: src/data/dinosaurs.ts.

[x] 3. Atualizar os Atributos das Cartas

Descrição:

Remover o atributo periculosidade.

Adicionar um novo atributo: defesa.

Adicionar um novo atributo: anos (em milhões, onde um valor menor pode ser melhor, criando uma nova dinâmica de jogo).

Arquivos Afetados: src/types/dinosaur.ts, src/data/dinosaurs.ts, src/components/Card.tsx, src/components/Game.tsx.

[x] 4. Criar "Personalidades" para a CPU

Descrição: Melhorar a IA da CPU. A lógica de escolha de atributo deve mudar com base em "personalidades". Uma ideia é que a personalidade mude de acordo com a quantidade de cartas que a CPU possui (ex: mais defensiva quando tem poucas cartas, mais agressiva quando tem muitas).

Arquivos Afetados: src/components/Game.tsx (especificamente a função getCpuChoice).

[x] 5. Adicionar Histórico de Rodadas

Descrição: Criar um componente na UI que mostre o resultado das últimas rodadas (ex: "Você ganhou com Velocidade: 60 > 30"). Isso ajuda o jogador a se situar na partida.

[x] 6. Destacar Atributo Escolhido pelo Oponente

Descrição: Quando for a vez da CPU, após a revelação da carta, destacar visualmente qual atributo ela escolheu para a batalha. Isso melhora o feedback para o jogador.

Arquivos Afetados: src/components/Card.tsx, src/components/Game.tsx.

[x] 7. Tornar a Interface Responsiva

Descrição: Ajustar o layout e os estilos com TailwindCSS para garantir que o jogo seja perfeitamente jogável em telas de dispositivos móveis (smartphones e tablets).

💡 Ideias para o Futuro (Prioridade Média/Baixa)
[ ] Adicionar uma carta "Super Trunfo": Uma carta especial com regras próprias.

[ ] Criar diferentes Modos de Jogo: Como "Batalha Rápida" ou "Torneio".

[ ] Permitir Personalização: Deixar o jogador escolher um avatar ou o verso das cartas.

[ ] Criar Baralhos Temáticos: Expandir o jogo com outros temas além dos dinossauros.

[ ] Implementar Habilidades Especiais: Dar a cada carta uma habilidade passiva única.

[ ] Construir um modo Multiplayer Online: A melhoria mais complexa, mas com grande potencial.

🎨 Brainstorm: Mais Opções de Animações (Item #6)
Aqui estão algumas ideias para tornar a revelação das cartas e a resolução da rodada mais impactantes:

Destaque do Vencedor:

Borda Iluminada: A carta vencedora recebe uma borda que brilha (verde para o jogador, vermelha para a CPU) por um instante.

Zoom Sutil: A carta vencedora dá um leve "pulo" ou aumenta de tamanho por um momento antes de recolher as cartas.

Animação de Atributos:

Contagem Rápida: Ao invés de mostrar o número do atributo da CPU instantaneamente, os números "rolam" rapidamente até o valor final.

Ícone de Batalha: Um pequeno ícone (como espadas cruzadas ou um escudo) aparece brevemente entre os dois atributos que estão sendo comparados.

Movimento das Cartas:

Transferência Animada: Em vez de as cartas simplesmente desaparecerem e o placar atualizar, a carta perdedora pode ser vista deslizando pela tela até o monte do vencedor.

Efeito de "Sucção": As cartas do centro da mesa são "sugadas" para o contador de cartas do vencedor.

Feedback de Tela Cheia:

Flash de Cor: Um flash de cor muito rápido e semitransparente preenche a tela (verde para vitória na rodada, vermelho para derrota), dando um feedback imediato e visceral.
# Inscrições de Eventos — como colocar no ar

São dois arquivos no mesmo repositório:

- **index.html** → app de CONTROLE (seu, com login): cadastra eventos, lê os QR codes e mostra os inscritos.
- **inscricao.html** → página PÚBLICA de inscrição: cada evento tem seu próprio link (`inscricao.html?e=...`) e gera o voucher com QR code.

## 1. Criar o projeto no Firebase
1. Acesse console.firebase.google.com → **Adicionar projeto** (ex.: `inscricoes-eventos`).
2. **Firestore Database** → Criar banco de dados → modo de produção → região `southamerica-east1` (São Paulo).
3. **Authentication** → Começar → ative **E-mail/senha**.
4. Authentication → **Usuários** → Adicionar usuário (seu e-mail e uma senha). Esse será o login do app de controle.
5. Authentication → **Configurações → Domínios autorizados** → adicione `gp-apps-netizen.github.io`.

## 2. Regras de segurança
Firestore → **Regras** → apague tudo, cole o conteúdo de `regras-firestore.txt`,
o e-mail godoygpx@gmail.com já está configurado; clique em **Publicar**.

## 3. Colar a configuração
Configurações do projeto (engrenagem) → **Seus apps** → ícone Web `</>` → registre o app →
copie o bloco `firebaseConfig` e cole no início do **index.html** e do **inscricao.html** (o mesmo nos dois).

## 4. Publicar no GitHub Pages
1. Crie o repositório (ex.: `Inscricoes-Eventos`) na conta gp-apps-netizen.
2. Envie `index.html` e `inscricao.html`.
3. Settings → Pages → Branch `main` / root → Save.
4. Controle: `https://gp-apps-netizen.github.io/Inscricoes-Eventos/`
   (abra no Chrome do celular → menu → **Instalar app**).

## Uso
1. No controle, **+ Novo evento**: nome, data, local, descrição e quais dados pedir (CPF, telefone, e-mail, campo extra).
2. **🔗 Link / QR** → envie o link pelo WhatsApp ou baixe o QR para imprimir em cartaz.
3. A pessoa se inscreve e recebe o voucher (pode baixar a imagem ou compartilhar).
4. No dia, aba **Leitor** → Abrir câmera → aponte para o voucher.
   Verde = válido, vermelho = já usado ou inválido, amarelo = voucher de outro evento.
   Também dá para digitar o código de 6 letras.
5. Aba **Inscritos**: busca, presença, excluir e **Exportar planilha** (abre no Excel).

Para encerrar as inscrições de um evento: Editar → desmarque **Inscrições abertas**.

## Novidades da v2
- **Imagem do evento:** em Editar evento → "Imagem do evento". Aparece no formulário, no voucher e na imagem do voucher.
- **Pix:** em Editar evento → "Cobrar inscrição via Pix" (valor, tipo e chave, nome e cidade de quem recebe, WhatsApp para comprovantes).
  O participante recebe o QR Pix e o "copia e cola" com o valor. Você confirma o pagamento na lista de inscritos
  ou na leitura do voucher (tela amarela "Pagamento pendente").
- **Equipe de check-in:** aba "Equipe" (só o dono vê). Cadastre nome, e-mail e senha; marque se a pessoa pode
  confirmar pagamentos. A pessoa entra no mesmo link do controle e vê só Eventos, Leitor e Inscritos.
- **Importante:** publique de novo as regras do arquivo `regras-firestore.txt` .

## Novidades da v2.1
- **Campos personalizados:** em Editar evento → "+ Adicionar campo". Tipos: texto curto, texto longo, número, data,
  lista de opções (uma por linha) e Sim/Não. Cada campo pode ser obrigatório e ter a ordem trocada (▲ ▼).
  As respostas aparecem nos dados do inscrito, na leitura do voucher e na planilha exportada.
- Publique de novo o `regras-firestore.txt`.

## Novidades da v2.3
- **Inscrição em grupo:** no formulário, "+ Inscrever mais uma pessoa" (até 10 de uma vez). Cada pessoa ganha o seu
  voucher; telefone e e-mail das demais podem ficar em branco (usa os da pessoa 1). Com Pix, sai um único Pix com o total.
- No controle, o inscrito mostra "Grupo: N pessoas · inscrito por …", há o botão "Confirmar pagamento do grupo"
  e, no Leitor, "Recebi o Pix do grupo — confirmar entrada". A planilha ganhou a coluna "Grupo (inscrito por)".
- Publique de novo o `regras-firestore.txt`.

## Novidades da v2.4
- **Crianças grátis:** em Editar evento → Pix → "Crianças não pagam" e a idade máxima. No formulário, cada pessoa
  tem a opção "Criança de até X anos — inscrição gratuita" (pede data de nascimento; CPF fica opcional).
  A idade é calculada na data do evento. O Pix cobra só os pagantes; a criança recebe voucher marcado como gratuito.
- Publique de novo o `regras-firestore.txt`.

## Novidades da v2.5
- **Meia-entrada:** em Editar evento → Pix → "Aceitar meia-entrada" (valor da meia, sugerido como metade, e quem tem direito).
  No formulário, cada pessoa pode marcar "Pagar meia-entrada" e informar o motivo. O Pix soma inteiras + meias.
  No controle aparece a marca "Meia" e, na leitura, o aviso "MEIA-ENTRADA — conferir comprovante".
- Publique de novo o `regras-firestore.txt`.

## Novidades da v2.6
- **Equipe por evento:** ao cadastrar ou editar um usuário de check-in, escolha "Todos os eventos" ou marque
  só os eventos que ele pode controlar. Ele vê apenas esses eventos, e as regras do Firestore bloqueiam os demais.
  Usuários cadastrados antes continuam com acesso a todos até você mudar.
- Publique de novo o `regras-firestore.txt`.

## Novidades da v2.7
- **Permissões da equipe:** "Pode ver valores" e "Pode confirmar pagamentos". Sem "ver valores", o usuário faz
  check-in, vê a lista e inscreve pessoas, mas não vê preços, total arrecadado nem valores na planilha.
  Ele continua vendo se a pessoa está "Pago" ou "A pagar", para saber se libera a entrada.
- Leitor ganhou o botão "+ Inscrever pessoa no local".

## Novidades da v2.8
- **Quem fez o check-in:** cada entrada guarda o nome de quem confirmou. Aparece na lista de inscritos (✓ Nome),
  nos detalhes, no aviso de "voucher já utilizado", na planilha (coluna "Check-in por") e no filtro
  "Check-in feito por". Na aba Equipe, cada usuário mostra quantos check-ins fez no evento selecionado.
- Publique de novo o `regras-firestore.txt`.

## Novidades da v2.9
- **Compartilhar imagem + link:** em "🔗 Link / QR", o botão "Compartilhar imagem + link (WhatsApp)" envia a imagem
  do evento com o convite e o link de inscrição na legenda (o texto também fica copiado, caso precise colar).
- O cartaz "Baixar QR" agora usa a imagem do evento no topo.

## Novidades da v3.0
- **Termo de responsabilidade (opcional):** em Editar evento → "Exigir aceite de termo na inscrição". Título e texto
  editáveis (há um texto modelo; use {evento} para o nome do evento). O participante vê o termo e precisa marcar
  "Li e aceito" para se inscrever (em grupo, o aceite vale para todos). Cada inscrição guarda data, versão do termo
  e quem aceitou; aparece nos detalhes, no leitor e na planilha.
- Publique de novo o `regras-firestore.txt`.

## Versão 4.0 — vários organizadores (como o bar e o salão)
Agora cada cliente é um **organizador**, com login próprio, eventos, inscrições e equipe separados.
Você administra tudo no **painel** `admin/` (só o login godoygpx@gmail.com entra).

Arquivos: `index.html` (controle do organizador), `inscricao.html` (página pública), `admin/index.html` (painel).
Links novos de inscrição levam o organizador: `inscricao.html?o=IDENTIFICADOR&e=...`.

### Passo a passo da atualização (faça tudo de uma vez, leva uns 10 minutos)
Durante a atualização, os links antigos param de funcionar por alguns minutos.
1. No repositório **Inscricoes-Eventos**: substitua `index.html` e `inscricao.html` e crie a pasta
   **admin/** com o arquivo `index.html` do painel (como no Atendimento-Bar).
2. Firestore → **Regras**: apague tudo, cole o novo `regras-firestore.txt` e toque em **Publicar**.
3. Abra `https://gp-apps-netizen.github.io/Inscricoes-Eventos/admin/` e entre com godoygpx@gmail.com.
4. Toque em **⭐ Meu organizador (sem cobrança)** → identificador `gpx` → **Criar**.
5. Toque em **⇪ Migrar dados da versão antiga** → destino: o seu organizador → **Copiar para o organizador**.
   Os IDs são mantidos: links e vouchers já enviados (Capela, MTBGPX) continuam funcionando,
   e a equipe já cadastrada continua entrando com o mesmo login.
6. Abra o controle (`.../Inscricoes-Eventos/`) e confira eventos, inscritos e equipe. Teste o link antigo da Capela.
7. Volte ao painel → Migrar → **Apagar dados antigos**.

### Clientes
- **+ Novo organizador**: nome, identificador (vai no link), responsável, e-mail/senha (login), plano
  (Mensal, Por evento ou Próprio), valor e vencimento. No fim sai uma mensagem pronta para enviar pelo WhatsApp.
- No cliente: **Registrar pagamento** (+1 mês no mensal), **Editar**, **Suspender/Reativar** (suspenso: o dono e a
  equipe perdem o acesso e o link de inscrição mostra "indisponível"; os dados ficam guardados),
  **Entrar como suporte** (abre o controle daquele cliente), **Redefinir senha** e **Excluir**.
- O responsável cadastra a própria equipe de check-in na aba **Equipe** do controle, como você fazia.

## Novidades da v4.1
- **🎨 Cores e estilo** (aba Eventos, só o responsável): cor principal, cor do topo, fonte, cantos e modo claro/escuro,
  com prévia na hora. Vale para o controle, a página de inscrição, os vouchers e o cartaz com QR.
- **Cor do evento** (Editar evento): opcional, para um evento ter a própria cor na página e no voucher.
- Publique de novo o `regras-firestore.txt`.

## Novidades da v4.2 (painel admin)
- **Cobrança combinada** ao criar/editar organizador: Por inscrito pago (valor + mínimo), Taxa paga pelo atleta,
  Valor fixo por evento, Mensal ou Próprio; "Referente a", inscritos previstos, forma de pagamento (50/50, à vista,
  após o evento) e adicionais (check-in presencial pessoas × turnos × valor, conferência de pagamentos, outro),
  com estimativa na hora.
- No organizador: **🧮 Calcular pelos inscritos pagos** (conta os pagos de cada evento; isentos não contam),
  **Registrar recebimento** com valor e data (mostra recebido e saldo) e **💬 Enviar resumo** do acordo pelo WhatsApp.
- Só o `admin/index.html` mudou; não precisa mexer nas regras.

## Novidades da v4.3
- **Histórico** (nova aba, só o responsável vê): registra quem entrou no app (1 registro a cada 30 min por aparelho)
  e as ações — check-ins, pagamentos, eventos criados/editados/excluídos, inscrições excluídas, planilhas exportadas,
  mudanças na equipe, cores e estilo, e as ações do painel admin (cobrança, recebimentos, suspensão).
  Filtros por tipo, pessoa e evento; "Carregar mais" e exportar para planilha. Ninguém consegue apagar ou alterar.
- Publique de novo o `regras-firestore.txt`.

## Novidades da v4.4
- **Permissão "Pode criar e excluir eventos"** por organizador (painel → Novo/Editar → Permissões).
  Desmarcada: você cria o evento pelo botão "📅 Criar/gerenciar eventos (suporte)" e o organizador só edita
  e configura (Pix, campos, termo, imagem, cores, equipe, check-in). A trava também está nas regras do Firestore.
  Organizadores já existentes continuam podendo criar até você desmarcar.
- Publique de novo o `regras-firestore.txt`.

## v4.4.1
- **Histórico só para o administrador:** a aba Histórico aparece só no login godoygpx@gmail.com (no seu organizador e
  no modo suporte). No painel, cada organizador tem o botão "📜 Ver histórico de acessos e ações".
  Organizador e equipe continuam gerando os registros, mas não conseguem ler (regra do Firestore).
- Publique de novo o `regras-firestore.txt`.

## v4.5 — check-in sem internet e filas de A a Z
**Arquivos para subir:** `index.html`, **`sw.js` (novo, na mesma pasta do index.html)** e as regras novas (`regras-firestore.txt` → Firestore → Regras → Publicar).

### Sem internet
- O app abre mesmo sem internet (o `sw.js` guarda o app e o leitor de QR no celular).
- Aba **Leitor → 📥 Preparar este celular para o evento**: faça com internet, antes de ir para o local. Guarda todos os inscritos do evento no celular.
- Sem sinal, o leitor confere pelos dados guardados e confirma a entrada. Aparece a barra **📴 Sem internet · N aguardando envio**; quando a internet volta, tudo é enviado sozinho (**✅ Tudo enviado**).
- A hora do check-in é a hora real em que foi feito (campo novo `checkinLocal`), e o histórico marca "feito sem internet".
- Não toque em **Sair** sem internet: para entrar de novo é preciso conexão.
- Atenção: celulares sem internet não se enxergam. Se a mesma pessoa passar em dois pontos, os dois aceitam — por isso use as filas abaixo.
- **🖨 Lista em papel** (aba Inscritos): lista de A a Z (da fila escolhida) para imprimir ou salvar em PDF, como reserva.

### Filas de check-in
- No evento (Editar → **Filas de check-in**): escolha quantas filas de adultos e toque **↻ Dividir A–Z** — a divisão equilibra pela quantidade de inscritos em cada letra. Dá para ajustar letras e nomes.
- **🎈 Crianças em uma fila separada** (crianças inscritas como "Criança não paga").
- **👥 Grupos entram juntos** (opcional): o grupo inteiro vai para a fila de quem fez a inscrição.
- Na aba **Equipe**, abra a pessoa e escolha a **Fila no check-in** de cada evento. Ela passa a ver só a lista da fila dela; o leitor avisa **"Outra fila"** se aparecer alguém de outra fila.
- A aba Inscritos mostra o resumo das filas (inscritos, presentes e quem da equipe está em cada uma) e a lista separada por letra.

## v4.6 — QR code liberado após o pagamento
**Arquivos para subir:** `index.html` e `inscricao.html` (as regras não mudaram).
- Nova opção no evento (Pagamento via Pix): **Liberar o QR code do voucher só depois do pagamento confirmado** — ligada por padrão nos eventos pagos.
- Enquanto o Pix não é confirmado, o voucher mostra o QR **embaçado com a tarja "⏳ Aguardando pagamento"** (inclusive na imagem baixada/compartilhada). Crianças isentas recebem o QR na hora.
- A página do voucher **se atualiza sozinha**: quando a organização confirma o pagamento, a tarja sai da frente do QR com uma animação e aparece "✅ Pagamento confirmado!".
- No controle, ao confirmar um pagamento (individual ou do grupo), aparece **💬 Avisar pelo WhatsApp** com a mensagem pronta e o link do voucher.

## v5.0 — Pix automático com Mercado Pago (split com comissão)
Veja o passo a passo completo em **GUIA-MERCADO-PAGO.md**.
- Novas Cloud Functions (pasta `functions`): conectar conta Mercado Pago do organizador (OAuth), criar Pix com `application_fee` (comissão da plataforma em %), receber o aviso de pagamento (webhook) e marcar as inscrições como pagas.
- Painel admin: liberar o Pix automático por organizador e definir a comissão (%); o cálculo mostra as comissões já recebidas.
- App de controle: card **💳 Conectar Mercado Pago** (aba Eventos) e, no evento, **Como receber → Pix automático — Mercado Pago**.
- Página de inscrição/voucher: Pix gerado pelo Mercado Pago, confirmação automática, sem enviar comprovante; o Pix manual continua disponível.
- Regras: nova coleção `cobrancas` (só o servidor grava).
- Taxa de serviço (como no Sympla): no evento com Pix automático, escolha se a comissão da plataforma fica **embutida** (o organizador paga) ou é **somada ao valor** (o participante paga; ex.: R$ 60,00 + 10% = R$ 66,00). O formulário e o voucher mostram o valor com a taxa; o servidor sempre calcula o valor final.

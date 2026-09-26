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
troque `SEU_EMAIL_AQUI@gmail.com` pelo e-mail do passo 1.4 e clique em **Publicar**.

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
- **Importante:** publique de novo as regras do arquivo `regras-firestore.txt` (mantendo o seu e-mail no lugar indicado).

## Novidades da v2.1
- **Campos personalizados:** em Editar evento → "+ Adicionar campo". Tipos: texto curto, texto longo, número, data,
  lista de opções (uma por linha) e Sim/Não. Cada campo pode ser obrigatório e ter a ordem trocada (▲ ▼).
  As respostas aparecem nos dados do inscrito, na leitura do voucher e na planilha exportada.
- Publique de novo o `regras-firestore.txt` (mantendo o seu e-mail).

## Novidades da v2.3
- **Inscrição em grupo:** no formulário, "+ Inscrever mais uma pessoa" (até 10 de uma vez). Cada pessoa ganha o seu
  voucher; telefone e e-mail das demais podem ficar em branco (usa os da pessoa 1). Com Pix, sai um único Pix com o total.
- No controle, o inscrito mostra "Grupo: N pessoas · inscrito por …", há o botão "Confirmar pagamento do grupo"
  e, no Leitor, "Recebi o Pix do grupo — confirmar entrada". A planilha ganhou a coluna "Grupo (inscrito por)".
- Publique de novo o `regras-firestore.txt` (mantendo o seu e-mail).

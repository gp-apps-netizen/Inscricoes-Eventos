# Pix automático com Mercado Pago — guia de instalação (v5.0)

Como fica depois de instalado:
- o organizador conecta a conta Mercado Pago dele **uma vez**;
- o participante paga o Pix e a inscrição é **confirmada sozinha** (o QR code do voucher é liberado na hora);
- o dinheiro cai **direto na conta do organizador**; a **sua comissão (%)** cai **na sua conta** Mercado Pago, separada, na mesma hora.

Tempo estimado: 40 a 60 minutos. As partes **A** e **B** dá para fazer pelo celular; a parte **C** precisa do computador.

---

## A. Mercado Pago (sua conta — a "plataforma")

1. Use a conta Mercado Pago onde quer receber as comissões (o ideal é uma conta com CNPJ/MEI).
2. Acesse **mercadopago.com.br/developers** → **Suas integrações** → **Criar aplicação**.
   - Nome: `Inscrições de Eventos`
   - Tipo de solução: **Pagamentos online**
   - Produto: **Checkout Transparente / Checkout API** (pagamento pela API)
   - Se perguntar sobre o modelo de negócio, informe que é um **marketplace** (você cobra uma comissão das vendas de outras contas).
3. Dentro da aplicação, procure **URLs de redirecionamento** (configurações de OAuth / editar aplicação) e cadastre exatamente:
   ```
   https://gp-apps-netizen.github.io/mp/
   ```
   (o campo aceita no máximo 50 caracteres; essa página, num repositório "mp" do GitHub, repassa a autorização para o servidor — veja o passo A5)
4. Em **Credenciais de produção**, anote o **Client ID** e o **Client Secret**.
   - O Client Secret é uma senha: não mande por mensagem nem coloque no GitHub.

5. No GitHub, crie um repositório público chamado **mp**, envie o arquivo **mp/index.html** do pacote e ative o GitHub Pages (Settings → Pages → Branch **main** → Save). Teste abrindo `https://gp-apps-netizen.github.io/mp/`: deve aparecer "Conectando ao Mercado Pago…".

> Não precisa configurar "Webhooks" no painel: o sistema informa o endereço de aviso em cada Pix criado.

## B. Firebase

1. Confirme que o projeto **inscricoes-eventos** está no plano **Blaze** (Firebase → engrenagem → Uso e faturamento → Detalhes e configurações do plano).
2. Recomendado: em Google Cloud → Faturamento → **Orçamentos e alertas**, crie um alerta de R$ 10/mês. Para este uso, o custo esperado é praticamente zero.

## C. Publicar as funções (no computador)

1. Instale o **Node.js 20 (LTS)** em nodejs.org.
2. Abra o **Prompt de Comando** (Windows) ou o **Terminal** (Mac) e rode:
   ```
   npm install -g firebase-tools
   firebase login
   ```
   (vai abrir o navegador para você entrar com godoygpx@gmail.com)
3. Descompacte o arquivo **Inscricoes-Eventos-v5.0.zip** numa pasta e entre nela pelo terminal, por exemplo:
   ```
   cd Downloads/Inscricoes-Eventos-v5.0
   ```
4. Na pasta `functions`, copie o arquivo **.env.example** para **.env** e preencha:
   ```
   MP_CLIENT_ID=o Client ID do passo A4
   APP_URL=https://gp-apps-netizen.github.io/Inscricoes-Eventos/
   MP_TESTE=false
   ```
5. Guarde o Client Secret no cofre do Firebase (ele pede para colar o valor):
   ```
   firebase functions:secrets:set MP_CLIENT_SECRET
   ```
6. Instale e publique:
   ```
   cd functions
   npm install
   cd ..
   firebase deploy --only functions
   ```
   - Se perguntar sobre "cleanup policy" (limpeza de imagens antigas), responda **Y** e **1** dia.
   - No fim aparecem 5 funções: mpIniciarConexao, mpCallback, mpDesconectar, mpCriarPix, mpWebhook.

## D. Publicar o app

1. No GitHub (repositório Inscricoes-Eventos), substitua **index.html**, **inscricao.html**, **sw.js** e **admin/index.html**.
   - **Não** envie a pasta `functions` nem o arquivo `.env` para o GitHub.
2. Firebase → Firestore → **Regras**: cole o conteúdo de **regras-firestore.txt** e publique.

## E. Ligar para um organizador

1. No **painel admin** → abra o organizador → **Editar / cobrança** → marque **Liberar o Pix automático** e informe a **comissão (%)**. Salve.
2. O organizador entra no app → aba **Eventos** → **💳 Conectar Mercado Pago** → entra na conta Mercado Pago dele e autoriza.
3. Em **Editar evento → Pagamento via Pix → Como receber**, ele escolhe **Pix automático — Mercado Pago**. O e-mail vira obrigatório na inscrição (o Mercado Pago exige).
4. Logo abaixo, em **Taxa de serviço da plataforma**, escolha **Embutida no valor** (o organizador paga) ou **Somada ao valor** (o participante paga, como no Sympla).

## F. Primeiro teste (com dinheiro de verdade, R$ 1,00)

O Pix de teste do Mercado Pago não permite simular o pagamento, então o teste mais confiável é real e com valor baixo:
1. Use como **organizador** uma conta Mercado Pago **diferente** da sua (a conta da plataforma não pode cobrar comissão de si mesma).
2. Crie um evento de teste com valor **R$ 1,00** e Pix automático.
3. Faça uma inscrição e pague o Pix com um banco **diferente** da conta do organizador.
4. Em poucos segundos a página do voucher deve mostrar **Pagamento confirmado** e liberar o QR. No app, a inscrição aparece paga por **Mercado Pago (automático)**.
5. Confira: o organizador recebe R$ 1,00 menos a taxa do Mercado Pago e a comissão; você recebe a comissão.
6. Se quiser, estorne o pagamento pelo Mercado Pago; a inscrição volta para "A pagar".

## Dúvidas comuns

- **O Pix vence?** Sim, em 24 horas. Se o participante abrir o voucher depois disso, a página gera outro sozinha.
- **Posso continuar confirmando pagamentos em dinheiro?** Sim, o botão "Confirmar pagamento" continua funcionando.
- **E se o organizador desconectar a conta?** Os eventos com Pix automático param de gerar novos Pix até ele conectar de novo.
- **Onde vejo minhas comissões?** No painel admin, botão **🧮 Calcular** do organizador, e no seu extrato do Mercado Pago.
- **Erro "MP_CLIENT_ID não configurado"**: falta o arquivo `functions/.env` (passo C4) — corrija e rode `firebase deploy --only functions` de novo.
- **Ver erros das funções**: Firebase → Functions → Registros (logs).

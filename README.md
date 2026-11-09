# Diagnóstico Liderança Z

Página de vendas + quiz do livro **Liderança Z**, de Tiago Favaro, com painel admin de leads.
Lançamento: 23/11, 19h, Livraria da Vila.

| Arquivo | O que é |
|---|---|
| `index.html` | Site com duas abas: **O livro** (quiz e reserva) e **Para empresas** (calculadora e pedido de proposta). Link direto da aba: `index.html#empresas` |
| `admin.html` | Painel de leads (login, gráficos, lista, WhatsApp, CSV) |
| `config.js` | **Único arquivo para editar**: banco, preço, data |
| `google-sheets/Code.gs` | Banco na planilha do Google (opção A) |
| `supabase/schema.sql` | Banco no Supabase (opção B) |

## 1. Onde os leads ficam (escolha uma opção)

### Opção A: Google Planilhas (não precisa de Supabase)
1. Crie uma planilha nova no Google Planilhas.
2. Menu **Extensões → Apps Script**. Apague o que estiver lá e cole todo o arquivo `google-sheets/Code.gs`.
3. Na linha `const SENHA = "troque-esta-senha";`, troque pela senha que você vai usar no painel.
4. **Implantar → Nova implantação →** engrenagem → **App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Clique em **Implantar**, autorize com sua conta Google e copie a **URL do app da Web**.
6. Cole essa URL no `config.js`, no campo `sheetsUrl`.

Os leads aparecem na aba **Leads** da planilha e no painel, que atualiza a cada 20 segundos.

### Opção B: Supabase (pode ser um projeto que você já tem)
As tabelas começam com `lz_`, então não mexem em nada que já existe no projeto.
1. **SQL Editor** → cole todo o `supabase/schema.sql` → **Run**.
2. **Authentication → Users → Add user**: crie o e-mail e a senha de quem vai usar o painel.
3. No SQL Editor, rode (com o e-mail criado):
   ```sql
   insert into public.lz_admins (email) values ('voce@exemplo.com');
   ```
4. **Project Settings → API**: copie a *Project URL* e a chave *anon public* para o `config.js`.

Com o Supabase, os leads chegam no painel na hora, sem esperar.

Sem nenhuma das duas, o painel abre com **dados de exemplo** (faixa amarela no topo).

## 2. Segurança
- O site só consegue **inserir** leads. Ninguém lê a lista pelo site.
- Planilha: só quem sabe a senha do painel lê, edita ou apaga leads.
- Supabase: só e-mails da tabela `lz_admins`.
- Se a internet cair no evento, o lead fica guardado no aparelho e é reenviado quando a conexão voltar.

## 3. Painel (`/admin.html`)
- Leads novos aparecem sozinhos, sem recarregar a página.
- Números do topo, gráfico por dia (digital × evento), acampamentos e trechos mais fracos.
- Busca e filtros, status (novo, contatado, comprou, descartado), anotações.
- Botão de WhatsApp com a mensagem já escrita: para quem fez o diagnóstico e para quem reservou o livro.
- Reservas aparecem com o tipo **reserva**. A equipe chama a pessoa no WhatsApp para combinar pagamento e retirada.
- Exportar CSV (abre no Excel e no Google Planilhas).

## 4. Modo evento (tablet no estande)
Abra o site com `#evento` no final do link. Os leads chegam marcados como **evento** e,
depois do resultado, a tela volta sozinha para o início, pronta para a próxima pessoa.

## 5. Banner
Suba a foto do banner como `assets/banner.jpg` e ela aparece no fundo do topo.

## 6. Publicar
Settings → Pages → Branch `main` / pasta raiz.
Site: `https://suportegabibmp-a11y.github.io/quiz---hope/`
Painel: `https://suportegabibmp-a11y.github.io/quiz---hope/admin.html`

# Diagnóstico Liderança Z

Página de vendas + quiz do livro **Liderança Z**, de Tiago Favaro, com painel admin de leads.
Lançamento: 23/11, 19h, Livraria da Vila.

| Arquivo | O que é |
|---|---|
| `index.html` | Página pública com o quiz e a pré-venda |
| `admin.html` | Painel de leads (login, gráficos, lista, WhatsApp, CSV) |
| `config.js` | **Único arquivo para editar**: Supabase, links, preço, data |
| `supabase/schema.sql` | Banco de dados (cole no Supabase) |

## 1. Ligar o Supabase (uns 5 minutos)
1. Crie um projeto em supabase.com.
2. **SQL Editor** → cole todo o `supabase/schema.sql` → **Run**.
3. **Authentication → Users → Add user**: crie o e-mail e a senha de quem vai usar o painel.
4. No SQL Editor, rode (com o e-mail que você criou):
   ```sql
   insert into public.admins (email) values ('voce@exemplo.com');
   ```
5. **Authentication → Sign In / Providers**: desligue "Allow new users to sign up".
6. **Project Settings → API**: copie a *Project URL* e a chave *anon public* para o `config.js`.

Sem Supabase configurado, o painel abre com **dados de exemplo** (faixa amarela no topo).

## 2. Segurança
- O site só consegue **inserir** leads. Ninguém consegue ler a lista pelo site.
- Só e-mails da tabela `admins` conseguem ler, editar ou apagar leads no painel.
- Se a internet cair no evento, o lead fica guardado no aparelho e é reenviado sozinho quando a conexão voltar.

## 3. Painel (`/admin.html`)
- Leads chegam **ao vivo**, sem recarregar a página.
- Números do topo, gráfico por dia (digital × evento), acampamentos e trechos mais fracos.
- Busca e filtros, status (novo, contatado, comprou, descartado), anotações.
- Botão de WhatsApp com a mensagem já escrita, de acordo com o resultado da pessoa.
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

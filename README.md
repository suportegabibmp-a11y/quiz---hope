# Diagnóstico Liderança Z

Página de vendas com quiz (diagnóstico de liderança para a Geração Z) do livro **Liderança Z**, de Tiago Favaro.
Lançamento: 23/11, 19h, Livraria da Vila.

## Como funciona
1. A pessoa responde 8 perguntas (4 temas: propósito, autonomia, feedback, crescimento).
2. Deixa nome, e-mail e WhatsApp para ver o resultado.
3. Vê a "altitude" da liderança dela (de 800 m a 8.848 m) e os pontos fracos.
4. Recebe as chamadas para a **pré-venda** e para o **capítulo 1 grátis**.

## O que editar (no começo do `<script>` em `index.html`, bloco `CONFIG`)
| Campo | O que colocar |
|---|---|
| `checkoutUrl` | Link do checkout da pré-venda (Hotmart, Kiwify, Mercado Pago...) |
| `capitulo1Url` | Link público do PDF do capítulo 1 |
| `webhookUrl` | Para onde mandar os leads (Google Apps Script, Make, Zapier, n8n). Vazio = leads não saem do aparelho |
| `preco` / `precoCheio` | Preço da pré-venda e preço cheio |

## Banner
Envie o banner de lançamento como `assets/banner.jpg`: ele vira o fundo do topo da página automaticamente.

## Modo evento (tablet no estande)
Abra o link com `#evento` no final (ex.: `.../index.html#evento`). Os leads saem marcados como `origem: evento`
e, depois do resultado, a tela volta sozinha para o início em 90 s.

## Publicar
Settings → Pages → Branch `main` / pasta raiz. O site fica em `https://suportegabibmp-a11y.github.io/quiz---hope/`.

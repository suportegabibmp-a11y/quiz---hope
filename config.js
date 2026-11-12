// ================================================================
//  CONFIGURAÇÃO — é o único arquivo que você precisa editar
// ================================================================
window.LZ_CONFIG = {
  // ---- Onde guardar os leads: preencha UMA das opções ----

  // Opção A — Google Planilhas (veja google-sheets/Code.gs)
  sheetsUrl: "https://script.google.com/macros/s/AKfycbxyTQfeB6ihF7VxxLxj-_B0fdNA_fF1kzTNFMszs38PwwB0-ajBjSoCl-uRju-oq-Y/exec",

  // Opção B — Supabase (pode ser um projeto que você já tem; veja supabase/schema.sql)
  supabaseUrl: "",       // ex.: "https://abcdxyz.supabase.co"
  supabaseAnonKey: "",   // a chave "anon public"

  // Preço mostrado na pré-venda (a reserva não cobra nada; a equipe chama a pessoa no WhatsApp)
  preco: "R$ 59,90",
  precoCheio: "R$ 69,90",

  // PDF do 1º capítulo, liberado no fim do diagnóstico
  capitulo1Url: "assets/Lideranca-Z-1o-capitulo.pdf",

  // Data e hora do lançamento (horário de Brasília)
  lancamento: "2026-11-23T19:00:00-03:00",

  // Modo evento (abra o site com #evento no final): segundos até voltar ao início
  reinicioEventoSeg: 90,

  // ---- Hope: para onde vai o lucro do livro ----
  // Os botões de Instagram e site só aparecem quando o link estiver preenchido.
  hope: {
    nome: "Hope House",
    // Cada item vira um parágrafo
    descricao: [
      "Este livro nasceu com o propósito de contribuir para a formação da nova geração. E esse propósito também se transforma em ação.",
      "100% do lucro das vendas deste livro será destinado ao Hope House, instituição que atua na transformação de crianças e adolescentes por meio da educação, do esporte e da cultura.",
      "Ao adquirir este livro, você não está apenas investindo em conhecimento. Está contribuindo para construir oportunidades e fortalecer o futuro de uma nova geração."
    ],
    instagram: "https://www.instagram.com/hopehouse.sp",
    site: ""         // ex.: "https://hopehouse.org.br"
  }
};

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
  precoCheio: "R$ 79,90",

  // Data e hora do lançamento (horário de Brasília)
  lancamento: "2026-11-23T19:00:00-03:00",

  // Modo evento (abra o site com #evento no final): segundos até voltar ao início
  reinicioEventoSeg: 90,

  // ---- Hope: para onde vai o lucro do livro ----
  // Os botões de Instagram e site só aparecem quando o link estiver preenchido.
  hope: {
    nome: "Hope",
    descricao: "Todo o lucro da venda de Liderança Z vai para o Hope, que investe na educação e no futuro de jovens. Cada exemplar comprado e cada palestra contratada viram oportunidade para quem está começando.",
    instagram: "",   // ex.: "https://instagram.com/hope"
    site: ""         // ex.: "https://hope.org.br"
  }
};

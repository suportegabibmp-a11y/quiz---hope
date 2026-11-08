// ================================================================
//  CONFIGURAÇÃO — é o único arquivo que você precisa editar
// ================================================================
window.LZ_CONFIG = {
  // ---- Onde guardar os leads: preencha UMA das opções ----

  // Opção A — Google Planilhas (veja google-sheets/Code.gs)
  sheetsUrl: "",         // ex.: "https://script.google.com/macros/s/AKfy.../exec"

  // Opção B — Supabase (pode ser um projeto que você já tem; veja supabase/schema.sql)
  supabaseUrl: "",       // ex.: "https://abcdxyz.supabase.co"
  supabaseAnonKey: "",   // a chave "anon public"

  // Link do checkout da pré-venda (Hotmart, Kiwify, Mercado Pago, editora...)
  checkoutUrl: "https://exemplo.com/checkout-lideranca-z",
  // Link público do PDF do capítulo 1
  capitulo1Url: "https://exemplo.com/capitulo-1-lideranca-z.pdf",

  preco: "R$ 59,90",
  precoCheio: "R$ 79,90",

  // Data e hora do lançamento (horário de Brasília)
  lancamento: "2026-11-23T19:00:00-03:00",

  // Modo evento (abra o site com #evento no final): segundos até voltar ao início
  reinicioEventoSeg: 90
};

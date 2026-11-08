// ================================================================
//  CONFIGURAÇÃO — é o único arquivo que você precisa editar
// ================================================================
window.LZ_CONFIG = {
  // Supabase → Project Settings → API
  supabaseUrl: "",       // ex.: "https://abcdxyz.supabase.co"
  supabaseAnonKey: "",   // a chave "anon public" (pode ficar no site, é pública)

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

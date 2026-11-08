/**
 * Liderança Z — banco de leads no Google Planilhas
 *
 * COMO INSTALAR (uns 3 minutos):
 * 1. Crie uma planilha nova no Google Planilhas (pode chamar de "Leads Liderança Z").
 * 2. Menu Extensões → Apps Script. Apague o que estiver lá e cole TODO este arquivo.
 * 3. Troque a SENHA abaixo pela senha que você vai usar no painel admin.
 * 4. Clique em Implantar → Nova implantação → engrenagem → "App da Web".
 *      Executar como: Eu
 *      Quem pode acessar: Qualquer pessoa
 *    Clique em Implantar, autorize com sua conta Google e copie a "URL do app da Web".
 * 5. Cole essa URL no config.js, no campo sheetsUrl.
 *
 * Se mudar este código depois: Implantar → Gerenciar implantações → lápis → Versão: Nova → Implantar.
 */

const SENHA = "troque-esta-senha";
const ABA = "Leads";

const COLS = ["id","created_at","tipo","nome","email","whatsapp","lidera","equipe","altitude","acampamento","pontuacao",
  "dim_rota","dim_cordada","dim_radio","dim_acli","respostas","origem","utm_source","utm_medium","utm_campaign","status","notas"];
const NUMS = ["altitude","pontuacao","dim_rota","dim_cordada","dim_radio","dim_acli"];
const STATUS = ["novo","contatado","comprou","descartado"];

function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.appendRow(COLS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLS.length).setFontWeight("bold");
  }
  return sh;
}

function resp_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Texto limpo, curto e sem virar fórmula na planilha
function txt_(v, max) {
  if (v === null || v === undefined) return "";
  let s = String(v).trim().slice(0, max || 200);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function linhaDoId_(sh, id) {
  const ids = sh.getRange(2, 1, Math.max(0, sh.getLastRow() - 1), 1).getValues();
  for (let i = 0; i < ids.length; i++) if (ids[i][0] === id) return i + 2;
  return -1;
}

function doGet() {
  return resp_({ ok: true, app: "Liderança Z" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const sh = aba_();

    // ---- público: só insere ----
    if (body.action === "insert") {
      const rows = (body.rows || []).slice(0, 50)
        .filter(r => r && (r.tipo === "diagnostico" || r.tipo === "pre-venda") && r.nome && r.email)
        .map(r => COLS.map(c => {
          if (c === "id") return Utilities.getUuid();
          if (c === "created_at") return new Date();
          if (c === "status") return "novo";
          if (c === "notas") return "";
          if (NUMS.indexOf(c) > -1) { const n = Number(r[c]); return (r[c] === null || r[c] === undefined || r[c] === "" || isNaN(n)) ? "" : Math.max(0, Math.min(9000, Math.round(n))); }
          if (c === "origem") return r[c] === "evento" ? "evento" : "digital";
          return txt_(r[c], c === "utm_campaign" ? 300 : 160);
        }));
      if (rows.length) {
        lock.waitLock(10000);
        sh.getRange(sh.getLastRow() + 1, 1, rows.length, COLS.length).setValues(rows);
      }
      return resp_({ ok: true, n: rows.length });
    }

    // ---- painel: precisa da senha ----
    if (body.senha !== SENHA) {
      Utilities.sleep(1000);
      return resp_({ ok: false, error: "senha" });
    }

    if (body.action === "login") return resp_({ ok: true });

    if (body.action === "list") {
      const v = sh.getDataRange().getValues();
      const head = v.shift();
      const rows = v.map(r => {
        const o = {};
        head.forEach((k, i) => {
          let x = r[i];
          if (x instanceof Date) x = x.toISOString();
          if (x === "") x = null;
          o[k] = x;
        });
        return o;
      });
      return resp_({ ok: true, rows: rows });
    }

    if (body.action === "update") {
      lock.waitLock(10000);
      const row = linhaDoId_(sh, body.id);
      if (row < 0) return resp_({ ok: false, error: "não encontrado" });
      const f = body.fields || {};
      if ("status" in f && STATUS.indexOf(f.status) > -1) sh.getRange(row, COLS.indexOf("status") + 1).setValue(f.status);
      if ("notas" in f) sh.getRange(row, COLS.indexOf("notas") + 1).setValue(txt_(f.notas, 2000));
      return resp_({ ok: true });
    }

    if (body.action === "delete") {
      lock.waitLock(10000);
      const row = linhaDoId_(sh, body.id);
      if (row > 0) sh.deleteRow(row);
      return resp_({ ok: true });
    }

    return resp_({ ok: false, error: "ação desconhecida" });
  } catch (err) {
    return resp_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

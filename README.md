
# Abastece+ — Sistema de Pedidos de Combustível (Frontend)

Design **clean e minimalista**, com fluxo otimizado para clientes e administradores.
Pronto para **Vercel** (Vite + React + Tailwind).

## ✨ Funcionalidades
- Cliente: **novo pedido** (gera código e senha, envia e-mail) e **consultar pedido**
- Administrador: login (fixo), **tabela** com status/observação/custo/lucro/entregue, **painel** e **orçamentos com gráficos**
- Visual moderno, responsivo, com animações discretas

## 🚀 Como rodar (Vercel)
1. Crie um repositório no GitHub e faça upload destes arquivos.
2. No Vercel, **Import Git Repository** e selecione o repositório.
3. Em *Settings → Environment Variables*, adicione:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Deploy. Pronto.

## 🔧 Ajustes rápidos
- Logo: substitua `public/logo.png` pela sua versão (já incluí a logo enviada).
- Cores: `tailwind.config.js` (primary, primaryDark, accent, background).
- Textos: altere em `src/components/*` conforme sua comunicação.

## 🔐 Observações
- Login admin: `loginadministrador` / `159753` (somente no frontend). Para produção, use autenticação real no Firebase Auth.
- Firestore: coleção `orders`, documentos com ID = código do pedido.

---

Feito para o Vinicius — Abastece+ 🚀

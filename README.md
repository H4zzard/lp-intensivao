# CPPEM — Mentoria Intensiva PMPE 2026

Landing page de vendas da Mentoria Intensiva PMPE 2026 — Prof. Everton Mota / CPPEM Concursos.

## Stack

HTML, CSS e JavaScript puros. Sem frameworks, sem build. Pronta para subir direto.

## Estrutura

```
.
├── index.html              # Página única
├── .htaccess               # Configuração Apache (cache + HTTPS + compressão)
├── vercel.json             # Configuração Vercel
├── README.md
└── assets/
    ├── css/
    │   └── style.css       # Estilos completos (mobile-first)
    ├── js/
    │   └── main.js         # Countdown, fade-up, FAQ, etc.
    └── img/
        ├── pmpe.png            # Brasão PMPE (PNG transparente)
        ├── cppem-logo.png      # Logo CPPEM (PNG transparente)
        ├── everton-mota.jpg    # Foto do professor
        ├── policiais-bg.jpg    # Fundo (desktop)
        ├── policiais-bg-mobile.jpg
        ├── favicon.ico
        ├── favicon-16.png ... favicon-512.png
```

## Configurações importantes

### 1. Datas da oferta (countdown)

O countdown encerra em **15/05/2026 às 23:59:59 (horário de Brasília)**.

Para alterar, edite `assets/js/main.js`, linha:
```js
const target = new Date("2026-05-15T23:59:59-03:00");
```

### 2. Link de checkout

O CTA aponta para:
```
https://checkout.cppem.com.br/pay/mentoria-intensiva-pmpe-2026
```

Está em três pontos do `index.html`. Faça find/replace caso mude.

### 3. WhatsApp de suporte

Atualmente: `5581996246763`. Edite no `index.html` (footer e botão flutuante).

## Deploy

### Vercel (mais simples)

```bash
npx vercel --prod
```

Ou conecte o repositório GitHub à Vercel — ela detecta tudo automaticamente. O arquivo `vercel.json` já configura cache de assets.

### GitHub Pages

1. Suba o conteúdo para um repositório.
2. Em Settings → Pages, aponte para a branch `main` e a raiz `/`.
3. Pronto.

### Hospedagem tradicional (cPanel / Apache)

Suba todos os arquivos para `public_html`. O `.htaccess` cuida do resto (HTTPS forçado, cache, GZIP).

## Pontos de copy / conversão

- **Hero**: promessa direta + selo PMPE + countdown geral.
- **Dor**: 4 cards quebrando objeções típicas (não sabe por onde começar, sem cronograma, estuda sozinho, tempo apertando).
- **Autoridade**: foto do Prof. Everton + 15 concursos + 14k aprovados.
- **Benefícios**: 6 cards cobrindo os pilares da mentoria.
- **Bônus**: 3 bônus exclusivos para os 15 primeiros (com aviso de limite).
- **Oferta**: card destacado com countdown, lista completa, preço cortado de R$ 1.654 → 12x R$ 61,04 ou R$ 597 à vista.
- **Garantia**: selo de 7 dias com aviso explícito do prazo.
- **Depoimentos**: 3 placeholders de aprovados (substituir por reais).
- **CTA final**: pergunta de decisão + 7 dias de garantia + valor.
- **FAQ**: 8 perguntas cobrindo as objeções residuais.

## Acessibilidade / Performance

- Mobile-first (testado em 320px, 360px, 390px, 768px, 1440px).
- Sem overflow horizontal em nenhuma largura.
- Animações respeitam `prefers-reduced-motion`.
- Failsafe CSS: se o JS de fade-up falhar, conteúdo aparece em até 3.5s.
- Imagens otimizadas (foto BG mobile reduzida para 900px).

## Substituir depoimentos

Os depoimentos atuais são placeholders com avatares de letra. Para colocar fotos reais:

1. Salve a imagem em `assets/img/depoimentos/aluno-X.jpg`.
2. No `index.html`, substitua a `<div class="depo-avatar">F</div>` por:
   ```html
   <div class="depo-avatar"><img src="assets/img/depoimentos/aluno-1.jpg" alt="Fabrício S."></div>
   ```
3. Adicione no CSS:
   ```css
   .depo-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
   ```

---

© 2026 CPPEM Concursos · Caruaru, Pernambuco.

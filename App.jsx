import { useState, useEffect, useCallback } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const LANGS = { en:"🇬🇧 EN", es:"🇪🇸 ES", ja:"🇯🇵 JA", fr:"🇫🇷 FR", pt:"🇧🇷 PT", it:"🇮🇹 IT", de:"🇩🇪 DE" };
const LANGNAMES = { en:"English", es:"Español", ja:"日本語", fr:"Français", pt:"Português", it:"Italiano", de:"Deutsch" };

const TR = {
  en:{
    start:"Begin Journey", continue_session:"Continue Where I Left Off", new_session:"Start Fresh",
    saved_session:"You have a saved session", saved_ago:"min ago",
    next:"Continue →", back:"← Return", done:"Reveal My IKIGAI →",
    of:"of", saved:"✦ Saved",
    gate_title:"Your IKIGAI is ready", gate_sub:"Enter your email to receive your personalized PDF report",
    gate_btn:"Generate My Report →", gate_legal:"No spam. You'll only receive your IKIGAI PDF.",
    generating:"Crafting your report…", gen_sub:"This takes about 30 seconds",
    download:"⬇ Download PDF", download_again:"⬇ Download PDF Again",
    restart:"Begin Again", powered:"Crafted by",
    tagline:"Your reason for being",
    passion:"PASSION",mission:"MISSION",profession:"PROFESSION",vocation:"VOCATION",
    ql:[
      {label:"What You Love",tag:"LOVE",kanji:"愛",sub:"What energizes you beyond money"},
      {label:"What You're Good At",tag:"SKILL",kanji:"技",sub:"Your edge and natural gifts"},
      {label:"What the World Needs",tag:"WORLD",kanji:"世",sub:"The problem you're built to solve"},
      {label:"What You're Paid For",tag:"VALUE",kanji:"価",sub:"Where your value meets the market"},
    ],
    q:[
      ["If financial security was guaranteed for life, what work would you still choose every day?",
       "What topic, activity, or problem makes you lose track of time completely?",
       "Describe a moment when you felt completely in your element. What were you doing?",
       "What kinds of challenges genuinely excite you, even when they're difficult?"],
      ["What are you consistently better at than most people around you? List 3–5 things.",
       "What do people come to you for — advice, help, expertise, or perspective?",
       "What have you invested the most years or effort into learning or developing?",
       "What do you do well that feels effortless, but others find difficult or impressive?"],
      ["What's a real, painful problem you feel compelled to help solve — in the world or your market?",
       "Who needs your combination of skills the most? Describe them specifically.",
       "What could you offer that creates a meaningful, measurable difference in someone's life or business?"],
      ["What are you currently paid for, or consistently paid for in your career?",
       "What would people willingly pay you for if you packaged it as a clear service or product?",
       "What's a premium version of your skills that solves a specific, costly problem for a specific customer?",
       "What service or product could generate income while you sleep, without trading time for money?"],
    ]
  },
  es:{
    start:"Comenzar", continue_session:"Continuar donde lo dejé", new_session:"Empezar de nuevo",
    saved_session:"Tienes una sesión guardada", saved_ago:"min atrás",
    next:"Continuar →", back:"← Volver", done:"Revelar Mi IKIGAI →",
    of:"de", saved:"✦ Guardado",
    gate_title:"¡Tu IKIGAI está listo!", gate_sub:"Agrega tu email para recibir tu reporte personalizado en PDF",
    gate_btn:"Generar Mi Reporte →", gate_legal:"Sin spam. Solo recibirás tu reporte IKIGAI.",
    generating:"Creando tu reporte…", gen_sub:"Esto tarda unos 30 segundos",
    download:"⬇ Descargar PDF", download_again:"⬇ Descargar PDF otra vez",
    restart:"Volver a Empezar", powered:"Desarrollado por",
    tagline:"Tu razón de ser",
    passion:"PASIÓN",mission:"MISIÓN",profession:"PROFESIÓN",vocation:"VOCACIÓN",
    ql:[
      {label:"Lo que Amas",tag:"AMOR",kanji:"愛",sub:"Lo que te energiza más allá del dinero"},
      {label:"En lo que Eres Bueno",tag:"TALENTO",kanji:"技",sub:"Tu ventaja y dones naturales"},
      {label:"Lo que el Mundo Necesita",tag:"MISIÓN",kanji:"世",sub:"El problema para el que estás hecho"},
      {label:"Por lo que te Pagan",tag:"VALOR",kanji:"価",sub:"Donde tu valor encuentra el mercado"},
    ],
    q:[
      ["Si la seguridad financiera estuviera garantizada de por vida, ¿qué trabajo elegirías hacer cada día?",
       "¿Qué tema, actividad o problema hace que pierdas la noción del tiempo por completo?",
       "Describe un momento en que te sentiste completamente en tu elemento. ¿Qué hacías?",
       "¿Qué tipo de desafíos te entusiasman genuinamente, incluso cuando son difíciles?"],
      ["¿En qué eres consistentemente mejor que la mayoría? Lista 3 a 5 cosas honestamente.",
       "¿Para qué acuden las personas a ti — consejo, ayuda, experiencia o perspectiva?",
       "¿En qué has invertido más años o esfuerzo para aprender o desarrollar?",
       "¿Qué haces bien y que para ti es fácil, pero otros encuentran difícil o impresionante?"],
      ["¿Cuál es un problema real y doloroso que sientes el impulso de resolver en el mundo o tu mercado?",
       "¿Quién necesita más tu combinación de habilidades? Descríbelos específicamente.",
       "¿Qué podrías ofrecer que crearía una diferencia significativa y medible en la vida o negocio de alguien?"],
      ["¿Por qué te están pagando actualmente o te han pagado consistentemente en tu carrera?",
       "¿Por qué te pagarían las personas de buena gana si lo presentaras como un servicio o producto claro?",
       "¿Cuál es una versión premium de tus habilidades que resuelve un problema costoso para un cliente específico?",
       "¿Qué servicio o producto podría generar ingresos mientras duermes, sin cambiar tiempo por dinero?"],
    ]
  },
  ja:{
    start:"旅を始める", continue_session:"続きから始める", new_session:"最初からやり直す",
    saved_session:"保存されたセッションがあります", saved_ago:"分前",
    next:"次へ →", back:"← 戻る", done:"生き甲斐を見る →",
    of:"／", saved:"✦ 保存済",
    gate_title:"生き甲斐の完成！", gate_sub:"メールアドレスを入力してPDFレポートを受け取る",
    gate_btn:"レポートを生成する →", gate_legal:"スパムなし。IKIGAIレポートのみお届けします。",
    generating:"レポートを作成中…", gen_sub:"約30秒かかります",
    download:"⬇ PDFをダウンロード", download_again:"⬇ 再ダウンロード",
    restart:"最初からやり直す", powered:"制作",
    tagline:"あなたの生きる意味",
    passion:"情熱",mission:"使命",profession:"職業",vocation:"天職",
    ql:[
      {label:"愛するもの",tag:"愛",kanji:"愛",sub:"お金を超えてあなたを活かすもの"},
      {label:"得意なこと",tag:"技",kanji:"技",sub:"あなたの強みと才能"},
      {label:"世界が求めるもの",tag:"世",kanji:"世",sub:"あなたが解決すべき問題"},
      {label:"報酬を得られるもの",tag:"価",kanji:"価",sub:"価値が市場に出会う場所"},
    ],
    q:[
      ["生涯の経済的安定が保証されていたら、毎日どんな仕事を選びますか？",
       "時間を忘れるほど夢中になれるテーマ、活動、問題は何ですか？",
       "完全に自分らしいと感じた瞬間を教えてください。何をしていましたか？",
       "難しくても心から興奮するような挑戦は何ですか？"],
      ["周りの人よりも一貫して得意なことは何ですか？正直に3〜5つ挙げてください。",
       "人々はあなたに何を求めてきますか？",
       "最も多くの時間や努力を投資して身につけたものは何ですか？",
       "自分には簡単でも、他の人には難しいまたは印象的に見えることは何ですか？"],
      ["あなたが解決したいと感じる、世界や市場の本当に深刻な問題は何ですか？",
       "あなたのスキルと経験の組み合わせを最も必要としているのは誰ですか？",
       "誰かの人生やビジネスに大きな変化をもたらすために何を提供できますか？"],
      ["現在、または継続的に、何に対して報酬を得ていますか？",
       "明確なサービスや商品としてパッケージ化すれば、人々は何に喜んでお金を払いますか？",
       "特定の顧客の費用のかかる問題を解決する、スキルのプレミアム版は何ですか？",
       "眠っている間も収入を生み出す、時間をお金に換えないサービスや商品は何ですか？"],
    ]
  },
  fr:{
    start:"Commencer", continue_session:"Continuer où j'en étais", new_session:"Recommencer",
    saved_session:"Vous avez une session sauvegardée", saved_ago:"min",
    next:"Continuer →", back:"← Retour", done:"Révéler mon IKIGAI →",
    of:"sur", saved:"✦ Sauvegardé",
    gate_title:"Votre IKIGAI est prêt !", gate_sub:"Entrez votre email pour recevoir votre rapport PDF personnalisé",
    gate_btn:"Générer Mon Rapport →", gate_legal:"Sans spam. Vous recevrez uniquement votre rapport IKIGAI.",
    generating:"Création de votre rapport…", gen_sub:"Cela prend environ 30 secondes",
    download:"⬇ Télécharger le PDF", download_again:"⬇ Télécharger à nouveau",
    restart:"Recommencer", powered:"Développé par",
    tagline:"Votre raison d'être",
    passion:"PASSION",mission:"MISSION",profession:"PROFESSION",vocation:"VOCATION",
    ql:[
      {label:"Ce que vous Aimez",tag:"AMOUR",kanji:"愛",sub:"Ce qui vous donne de l'énergie"},
      {label:"Ce en quoi vous Excellez",tag:"TALENT",kanji:"技",sub:"Votre avantage naturel"},
      {label:"Ce dont le Monde a Besoin",tag:"MISSION",kanji:"世",sub:"Le problème pour lequel vous êtes fait"},
      {label:"Ce pour quoi on vous Paie",tag:"VALEUR",kanji:"価",sub:"Où votre valeur rencontre le marché"},
    ],
    q:[
      ["Si la sécurité financière était garantie à vie, quel travail choisiriez-vous chaque jour ?",
       "Quel sujet, activité ou problème vous fait perdre la notion du temps ?",
       "Décrivez un moment où vous vous sentiez dans votre élément. Que faisiez-vous ?",
       "Quels défis vous enthousiasment vraiment, même s'ils sont difficiles ?"],
      ["En quoi êtes-vous systématiquement meilleur(e) que la plupart ? Listez 3 à 5 choses.",
       "Pour quoi les gens viennent-ils vous voir — conseils, aide ou expertise ?",
       "Dans quoi avez-vous le plus investi d'années ou d'effort pour apprendre ?",
       "Qu'est-ce que vous faites bien et qui semble naturel, mais que les autres trouvent difficile ?"],
      ["Quel est un vrai problème douloureux que vous vous sentez poussé(e) à résoudre ?",
       "Qui a le plus besoin de votre combinaison de compétences ? Décrivez-les précisément.",
       "Que pourriez-vous offrir qui créerait une différence mesurable pour quelqu'un ?"],
      ["Pour quoi êtes-vous actuellement payé(e) dans votre carrière ?",
       "Pour quoi les gens vous paieraient-ils volontiers si vous le proposiez clairement ?",
       "Quelle est une version premium de vos compétences qui résout un problème coûteux ?",
       "Quel service pourrait générer des revenus pendant que vous dormez ?"],
    ]
  },
  pt:{
    start:"Começar", continue_session:"Continuar de onde parei", new_session:"Começar do zero",
    saved_session:"Você tem uma sessão salva", saved_ago:"min atrás",
    next:"Continuar →", back:"← Voltar", done:"Revelar Meu IKIGAI →",
    of:"de", saved:"✦ Salvo",
    gate_title:"Seu IKIGAI está pronto!", gate_sub:"Adicione seu email para receber seu relatório PDF personalizado",
    gate_btn:"Gerar Meu Relatório →", gate_legal:"Sem spam. Você só receberá seu relatório IKIGAI.",
    generating:"Criando seu relatório…", gen_sub:"Isso leva cerca de 30 segundos",
    download:"⬇ Baixar PDF", download_again:"⬇ Baixar PDF novamente",
    restart:"Recomeçar", powered:"Desenvolvido por",
    tagline:"Seu motivo para existir",
    passion:"PAIXÃO",mission:"MISSÃO",profession:"PROFISSÃO",vocation:"VOCAÇÃO",
    ql:[
      {label:"O que Você Ama",tag:"AMOR",kanji:"愛",sub:"O que te energiza além do dinheiro"},
      {label:"Em que Você É Bom",tag:"TALENTO",kanji:"技",sub:"Sua vantagem e dons naturais"},
      {label:"O que o Mundo Precisa",tag:"MISSÃO",kanji:"世",sub:"O problema para o qual você foi feito"},
      {label:"Pelo que te Pagam",tag:"VALOR",kanji:"価",sub:"Onde seu valor encontra o mercado"},
    ],
    q:[
      ["Se a segurança financeira fosse garantida por toda a vida, qual trabalho você escolheria cada dia?",
       "Que tema, atividade ou problema faz você perder completamente a noção do tempo?",
       "Descreva um momento em que você se sentiu completamente em seu elemento.",
       "Que tipos de desafios genuinamente te empolgam, mesmo quando são difíceis?"],
      ["Em que você é consistentemente melhor que a maioria? Liste 3 a 5 coisas honestamente.",
       "Para o que as pessoas vêm até você — conselho, ajuda ou expertise?",
       "Em que você investiu mais anos ou esforço para aprender ou desenvolver?",
       "O que você faz bem e parece sem esforço, mas outros acham difícil ou impressionante?"],
      ["Qual é um problema real e doloroso que você sente o impulso de resolver?",
       "Quem mais precisa da sua combinação de habilidades? Descreva-os especificamente.",
       "O que você poderia oferecer que criaria uma diferença significativa na vida ou negócio de alguém?"],
      ["Pelo que você é atualmente pago ou consistentemente pago na sua carreira?",
       "Pelo que as pessoas te pagariam de bom grado se você apresentasse como um serviço claro?",
       "Qual é uma versão premium das suas habilidades que resolve um problema caro para um cliente?",
       "Que serviço ou produto poderia gerar renda enquanto você dorme?"],
    ]
  },
  it:{
    start:"Inizia", continue_session:"Continua da dove ho lasciato", new_session:"Ricomincia da capo",
    saved_session:"Hai una sessione salvata", saved_ago:"min fa",
    next:"Continua →", back:"← Torna", done:"Rivela il Mio IKIGAI →",
    of:"di", saved:"✦ Salvato",
    gate_title:"Il tuo IKIGAI è pronto!", gate_sub:"Inserisci la tua email per ricevere il tuo report PDF personalizzato",
    gate_btn:"Genera il Mio Report →", gate_legal:"Niente spam. Riceverai solo il tuo report IKIGAI.",
    generating:"Creazione del report…", gen_sub:"Ci vorranno circa 30 secondi",
    download:"⬇ Scarica PDF", download_again:"⬇ Scarica PDF di nuovo",
    restart:"Ricomincia", powered:"Sviluppato da",
    tagline:"Il tuo motivo di esistere",
    passion:"PASSIONE",mission:"MISSIONE",profession:"PROFESSIONE",vocation:"VOCAZIONE",
    ql:[
      {label:"Ciò che Ami",tag:"AMORE",kanji:"愛",sub:"Ciò che ti dà energia oltre il denaro"},
      {label:"Ciò in cui Eccelli",tag:"TALENTO",kanji:"技",sub:"Il tuo vantaggio e doni naturali"},
      {label:"Ciò di cui il Mondo ha Bisogno",tag:"MISSIONE",kanji:"世",sub:"Il problema per cui sei fatto/a"},
      {label:"Ciò per cui ti Pagano",tag:"VALORE",kanji:"価",sub:"Dove il tuo valore incontra il mercato"},
    ],
    q:[
      ["Se la sicurezza finanziaria fosse garantita per tutta la vita, quale lavoro sceglieresti ogni giorno?",
       "Quale argomento, attività o problema ti fa perdere completamente il senso del tempo?",
       "Descrivi un momento in cui ti sei sentito/a completamente nel tuo elemento.",
       "Quali tipi di sfide ti entusiasmano genuinamente, anche quando sono difficili?"],
      ["In cosa sei costantemente migliore della maggior parte? Elenca onestamente 3-5 cose.",
       "Per cosa le persone vengono da te — consiglio, aiuto o competenza?",
       "In cosa hai investito più anni o sforzo per imparare o sviluppare?",
       "Cosa fai bene e che per te sembra senza sforzo, ma altri trovano difficile?"],
      ["Qual è un problema reale e doloroso che ti senti spinto/a a risolvere?",
       "Chi ha più bisogno della tua combinazione di competenze? Descrivili specificamente.",
       "Cosa potresti offrire che creerebbe una differenza significativa nella vita di qualcuno?"],
      ["Per cosa vieni attualmente pagato/a nella tua carriera?",
       "Per cosa le persone ti pagherebbero volentieri se lo proponessi come un servizio chiaro?",
       "Qual è una versione premium delle tue competenze che risolve un problema costoso?",
       "Quale servizio o prodotto potrebbe generare reddito mentre dormi?"],
    ]
  },
  de:{
    start:"Beginnen", continue_session:"Weitermachen wo ich aufgehört habe", new_session:"Neu beginnen",
    saved_session:"Du hast eine gespeicherte Sitzung", saved_ago:"Min.",
    next:"Weiter →", back:"← Zurück", done:"Mein IKIGAI enthüllen →",
    of:"von", saved:"✦ Gespeichert",
    gate_title:"Dein IKIGAI ist fertig!", gate_sub:"Gib deine E-Mail ein, um deinen personalisierten PDF-Bericht zu erhalten",
    gate_btn:"Meinen Bericht generieren →", gate_legal:"Kein Spam. Du erhältst nur deinen IKIGAI-Bericht.",
    generating:"Bericht wird erstellt…", gen_sub:"Das dauert etwa 30 Sekunden",
    download:"⬇ PDF herunterladen", download_again:"⬇ PDF erneut herunterladen",
    restart:"Neu beginnen", powered:"Entwickelt von",
    tagline:"Dein Grund zu sein",
    passion:"LEIDENSCHAFT",mission:"MISSION",profession:"BERUF",vocation:"BERUFUNG",
    ql:[
      {label:"Was du Liebst",tag:"LIEBE",kanji:"愛",sub:"Was dich über Geld hinaus antreibt"},
      {label:"Worin du Gut Bist",tag:"TALENT",kanji:"技",sub:"Dein Vorteil und natürliche Gaben"},
      {label:"Was die Welt Braucht",tag:"MISSION",kanji:"世",sub:"Das Problem, für das du gemacht bist"},
      {label:"Wofür du Bezahlt Wirst",tag:"WERT",kanji:"価",sub:"Wo dein Wert auf den Markt trifft"},
    ],
    q:[
      ["Wenn finanzielle Sicherheit fürs Leben garantiert wäre, welche Arbeit würdest du trotzdem täglich wählen?",
       "Bei welchem Thema, Aktivität oder Problem verlierst du völlig das Zeitgefühl?",
       "Beschreibe einen Moment, in dem du dich völlig in deinem Element gefühlt hast.",
       "Welche Art von Herausforderungen begeistern dich wirklich, auch wenn sie schwierig sind?"],
      ["Worin bist du durchgehend besser als die meisten? Nenne ehrlich 3–5 Dinge.",
       "Wofür kommen Menschen zu dir — Rat, Hilfe oder Fachwissen?",
       "Wofür hast du die meisten Jahre oder Mühe aufgewendet, um es zu lernen?",
       "Was machst du gut, das sich für dich mühelos anfühlt, aber andere schwierig finden?"],
      ["Was ist ein echtes, schmerzhaftes Problem, das du lösen möchtest?",
       "Wer braucht deine Kombination aus Fähigkeiten am dringendsten? Beschreibe sie konkret.",
       "Was könntest du anbieten, das einen messbaren Unterschied in jemandes Leben schafft?"],
      ["Wofür wirst du aktuell oder durchgehend in deiner Karriere bezahlt?",
       "Wofür würden Menschen dich gerne bezahlen, wenn du es klar verpackst?",
       "Was ist eine Premium-Version deiner Fähigkeiten, die ein kostspieliges Problem löst?",
       "Welcher Service könnte Einkommen generieren, während du schläfst?"],
    ]
  }
};

const TOTALS = [4,4,3,4];
const TOTAL_Q = 15;
const STORAGE_KEY = "demn_ikigai_v3";
const EXPIRY_MS = 24*60*60*1000;

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const SS = {
  save(data){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({...data, ts:Date.now()})); }catch(e){} },
  load(){ try{ const r=localStorage.getItem(STORAGE_KEY); if(!r) return null; const d=JSON.parse(r); if(Date.now()-d.ts>EXPIRY_MS){ localStorage.removeItem(STORAGE_KEY); return null; } return d; }catch(e){ return null; } },
  clear(){ try{ localStorage.removeItem(STORAGE_KEY); }catch(e){} }
};

// ─── THEMES ──────────────────────────────────────────────────────────────────
const TH = {
  dark:{ bg:"#13100D",surf:"#1C1914",card:"#231F1A",border:"#33291E",text:"#F0E8DC",muted:"#8A7860",dim:"#3D3020",love:"#C0392B",skill:"#1A4F8C",world:"#2D5E38",value:"#C08B1A",dem:"#7C5CFC" },
  light:{ bg:"#F5EFE4",surf:"#EDE5D8",card:"#E4DAC8",border:"#C5B8A0",text:"#1C1512",muted:"#7A6A58",dim:"#BFB0A0",love:"#B0302A",skill:"#164380",world:"#265230",value:"#A8780E",dem:"#5B3DE8" }
};

// ─── PDF GENERATOR ────────────────────────────────────────────────────────────
async function buildPDF(answers, analysis, email, t) {
  if(!window.jspdf){
    await new Promise((res,rej)=>{
      const s=document.createElement("script");
      s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload=res; s.onerror=rej; document.head.appendChild(s);
    });
  }
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
  const W=210,H=297,M=18;

  const qC=[[192,57,43],[26,79,140],[192,139,26],[45,94,56]];
  const qFill=[[253,232,229],[228,237,252],[250,243,215],[225,243,229]];

  const footer=(pg)=>{
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(160,145,125);
    doc.text("DemN · demn.studio",M,H-9);
    doc.text(`${pg}`,W-M,H-9,{align:"right"});
  };
  const sectionLine=(y)=>{ doc.setDrawColor(200,185,165); doc.setLineWidth(0.3); doc.line(M,y,W-M,y); };

  // ── PAGE 1: COVER ───────────────────────────────────────────────────────────
  doc.setFillColor(19,16,13); doc.rect(0,0,W,H,"F");
  doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(124,92,252);
  doc.text("DemN",M,14);
  doc.setFont("times","bold"); doc.setFontSize(56); doc.setTextColor(240,232,220);
  doc.text("IKIGAI",W/2,128,{align:"center"});
  doc.setFont("helvetica","normal"); doc.setFontSize(9.5); doc.setTextColor(138,120,96);
  doc.text("PURPOSE DISCOVERY REPORT",W/2,140,{align:"center"});
  doc.setDrawColor(55,47,36); doc.setLineWidth(0.4); doc.line(W/2-28,147,W/2+28,147);
  doc.setFontSize(9); doc.text(email,W/2,156,{align:"center"});
  doc.text(new Date().toLocaleDateString(),W/2,163,{align:"center"});
  // Quadrant color dots
  const dotY=200, dotGap=14;
  [qC[0],qC[1],qC[2],qC[3]].forEach((c,i)=>{ doc.setFillColor(...c); doc.circle(W/2-21+i*dotGap,dotY,2.5,"F"); });
  doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(100,88,70);
  doc.text("愛  ·  技  ·  価  ·  世",W/2,dotY+8,{align:"center"});
  doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(124,92,252);
  doc.text("DemN",W/2,H-12,{align:"center"});

  // ── PAGE 2: IKIGAI MAP ──────────────────────────────────────────────────────
  doc.addPage();
  doc.setFillColor(245,239,228); doc.rect(0,0,W,H,"F");
  doc.setFont("times","bold"); doc.setFontSize(13); doc.setTextColor(28,21,18);
  doc.text("YOUR IKIGAI MAP",M,21); sectionLine(25);

  const dc={x:105,y:98}; const r=27; const off=18;
  const dC=[
    {x:dc.x,     y:dc.y-off-4, ci:0},
    {x:dc.x+off+4,y:dc.y+off*0.6,ci:1},
    {x:dc.x,     y:dc.y+off*2+1,ci:2},
    {x:dc.x-off-4,y:dc.y+off*0.6,ci:3},
  ];
  dC.forEach(c=>{
    doc.setFillColor(...qFill[c.ci]); doc.circle(c.x,c.y,r,"F");
    doc.setDrawColor(...qC[c.ci]); doc.setLineWidth(0.5); doc.circle(c.x,c.y,r,"S");
    // Quadrant label
    doc.setFont("helvetica","bold"); doc.setFontSize(6.5); doc.setTextColor(...qC[c.ci]);
    doc.text(t.ql[c.ci].label.toUpperCase(),c.x,c.y-3,{align:"center"});
    // Essence phrase
    const essences=[analysis?.love_essence,analysis?.skill_essence,analysis?.value_essence,analysis?.world_essence];
    if(essences[c.ci]){
      doc.setFont("times","italic"); doc.setFontSize(6); doc.setTextColor(70,60,50);
      const el=doc.splitTextToSize(essences[c.ci],r*1.7);
      doc.text(el,c.x,c.y+4,{align:"center"});
    }
  });
  // Center label
  doc.setFont("times","bold"); doc.setFontSize(7.5); doc.setTextColor(28,21,18);
  doc.text("IKIGAI",dc.x,dc.y+off*0.9,{align:"center"});
  // Intersection micro-labels
  doc.setFont("helvetica","bold"); doc.setFontSize(5); doc.setTextColor(160,145,125);
  doc.text(t.passion,dc.x+21,dc.y-8,{align:"center"});
  doc.text(t.mission,dc.x-21,dc.y-8,{align:"center"});
  doc.text(t.profession,dc.x+21,dc.y+46,{align:"center"});
  doc.text(t.vocation,dc.x-21,dc.y+46,{align:"center"});

  // IKIGAI Statement
  if(analysis?.ikigai_statement){
    const stY=dc.y+off*2+r+14;
    sectionLine(stY-4);
    doc.setFont("times","italic"); doc.setFontSize(11.5); doc.setTextColor(50,40,30);
    const sl=doc.splitTextToSize(`"${analysis.ikigai_statement}"`,W-M*2);
    doc.text(sl,W/2,stY+2,{align:"center"});
  }
  footer(2);

  // ── PAGE 3: ANALYSIS ────────────────────────────────────────────────────────
  if(analysis){
    doc.addPage();
    doc.setFillColor(245,239,228); doc.rect(0,0,W,H,"F");
    doc.setFont("times","bold"); doc.setFontSize(13); doc.setTextColor(28,21,18);
    doc.text("BUSINESS ANALYSIS",M,21); sectionLine(25);
    let y=35;
    [
      {h:"IKIGAI STATEMENT",txt:analysis.ikigai_statement,ci:0},
      {h:"CORE BUSINESS ANGLE",txt:analysis.core_angle,ci:1},
      {h:"#1 UNTAPPED OPPORTUNITY",txt:analysis.opportunity,ci:2},
      {h:"30-DAY FIRST MOVE",txt:analysis.first_move,ci:3},
      {h:"DEVIL'S ADVOCATE",txt:analysis.warning,ci:0},
    ].forEach(item=>{
      if(!item.txt) return;
      if(y>H-30){ doc.addPage(); doc.setFillColor(245,239,228); doc.rect(0,0,W,H,"F"); y=22; }
      doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(...qC[item.ci]);
      doc.text(item.h,M,y); y+=5;
      doc.setFont("times","normal"); doc.setFontSize(10.5); doc.setTextColor(45,36,28);
      const ls=doc.splitTextToSize(item.txt,W-M*2);
      doc.text(ls,M,y); y+=ls.length*5.2+9;
    });
    footer(3);
  }

  // ── PAGES 4+: DETAILED ANSWERS ──────────────────────────────────────────────
  const essArr=[analysis?.love_essence,analysis?.skill_essence,analysis?.value_essence,analysis?.world_essence];
  let pg=analysis?4:3;
  t.ql.forEach((ql,qi)=>{
    doc.addPage();
    doc.setFillColor(245,239,228); doc.rect(0,0,W,H,"F");
    doc.setFillColor(...qC[qi]); doc.rect(0,0,W,26,"F");
    doc.setFont("times","bold"); doc.setFontSize(15); doc.setTextColor(255,252,248);
    doc.text(ql.label.toUpperCase(),M,17);
    let y=36;
    if(essArr[qi]){
      doc.setFont("times","italic"); doc.setFontSize(11); doc.setTextColor(...qC[qi]);
      const el=doc.splitTextToSize(`"${essArr[qi]}"`,W-M*2);
      doc.text(el,M,y); y+=el.length*5.5+5;
      sectionLine(y); y+=7;
    }
    t.q[qi].forEach((question,qn)=>{
      const ans=answers[qi][qn]; if(!ans) return;
      const al=doc.splitTextToSize(ans,W-M*2-6);
      const ql2=doc.splitTextToSize(question,W-M*2);
      if(y+ql2.length*4.5+al.length*5+12>H-18){
        footer(pg++); doc.addPage(); doc.setFillColor(245,239,228); doc.rect(0,0,W,H,"F"); y=22;
      }
      doc.setFont("helvetica","bold"); doc.setFontSize(8.5); doc.setTextColor(100,88,72);
      doc.text(ql2,M,y); y+=ql2.length*4.5+2;
      doc.setFont("times","normal"); doc.setFontSize(10.5); doc.setTextColor(35,28,22);
      doc.text(al,M+4,y); y+=al.length*5.2+10;
    });
    footer(pg++);
  });
  doc.save(`ikigai-demn-${Date.now()}.pdf`);
}

// ─── SVG DIAGRAM ─────────────────────────────────────────────────────────────
function IkigaiSVG({filled=[],t,th}){
  const cx=150,cy=155;
  const circles=[
    {id:0,x:cx,   y:cy-53,c:th.love, k:"愛"},
    {id:1,x:cx+51,y:cy+22,c:th.skill,k:"技"},
    {id:2,x:cx,   y:cy+66,c:th.value,k:"価"},
    {id:3,x:cx-51,y:cy+22,c:th.world,k:"世"},
  ];
  const r=68; const on=i=>filled.includes(i);
  return(
    <svg viewBox="0 0 300 292" width="100%" style={{maxWidth:268,margin:"0 auto",display:"block"}}>
      <defs><filter id="gs"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {circles.map(c=>(
        <g key={c.id}>
          <circle cx={c.x} cy={c.y} r={r} fill={c.c} fillOpacity={on(c.id)?0.14:0} stroke={c.c} strokeWidth={on(c.id)?1.6:0.8} strokeOpacity={on(c.id)?0.75:0.2} filter={on(c.id)?"url(#gs)":undefined} style={{transition:"all 0.5s ease"}}/>
          {on(c.id)&&<text x={c.x} y={c.y+7} textAnchor="middle" fill={c.c} fontSize="22" fontWeight="900" opacity="0.2" fontFamily="serif" style={{transition:"opacity 0.5s"}}>{c.k}</text>}
        </g>
      ))}
      {[{x:cx+30,y:cy-10,l:t.passion},{x:cx-30,y:cy-10,l:t.mission},{x:cx+30,y:cy+52,l:t.profession},{x:cx-30,y:cy+52,l:t.vocation}].map(l=>(
        <text key={l.l} x={l.x} y={l.y} textAnchor="middle" fill={th.muted} fontSize="5.5" fontWeight="700" letterSpacing="0.4">{l.l}</text>
      ))}
      <text x={cx}    y={22}    textAnchor="middle" fill={th.love}  fontSize="9" fontWeight="800" letterSpacing="0.8" opacity={on(0)?1:0.22} style={{transition:"opacity 0.5s"}}>愛 · {t.ql[0].tag}</text>
      <text x={cx+130} y={cy+26} textAnchor="middle" fill={th.skill} fontSize="9" fontWeight="800" letterSpacing="0.8" opacity={on(1)?1:0.22} style={{transition:"opacity 0.5s"}}>技 · {t.ql[1].tag}</text>
      <text x={cx}    y={276}   textAnchor="middle" fill={th.value} fontSize="9" fontWeight="800" letterSpacing="0.8" opacity={on(2)?1:0.22} style={{transition:"opacity 0.5s"}}>価 · {t.ql[2].tag}</text>
      <text x={cx-130} y={cy+26} textAnchor="middle" fill={th.world} fontSize="9" fontWeight="800" letterSpacing="0.8" opacity={on(3)?1:0.22} style={{transition:"opacity 0.5s"}}>世 · {t.ql[3].tag}</text>
      <circle cx={cx} cy={cy+18} r={27} fill={th.text} fillOpacity="0.06" stroke={th.text} strokeWidth="0.8" strokeOpacity="0.18"/>
      <text x={cx} y={cy+13} textAnchor="middle" fill={th.text} fontSize="8.5" fontWeight="900" letterSpacing="2" fontFamily="serif">IKIGAI</text>
      <text x={cx} y={cy+24} textAnchor="middle" fill={th.muted} fontSize="5" letterSpacing="0.8">生 き 甲 斐</text>
    </svg>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
function TopBar({lang,setLang,themeMode,setThemeMode,th}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,position:"relative"}}>
      <div style={{position:"relative"}}>
        <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:`1px solid ${th.border}`,borderRadius:0,color:th.muted,fontSize:12,padding:"5px 10px",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.05em"}}>
          {LANGS[lang]} ▾
        </button>
        {open&&(
          <div style={{position:"absolute",top:"110%",left:0,background:th.surf,border:`1px solid ${th.border}`,zIndex:200,minWidth:155}}>
            {Object.entries(LANGS).map(([code,flag])=>(
              <div key={code} onClick={()=>{setLang(code);setOpen(false);}} style={{padding:"9px 14px",cursor:"pointer",fontSize:13,color:lang===code?th.dem:th.text,background:lang===code?th.card:"transparent",display:"flex",gap:8,fontFamily:"inherit",borderBottom:`1px solid ${th.border}`,fontWeight:lang===code?700:400}}>
                {flag} {LANGNAMES[code]}
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={()=>setThemeMode(m=>m==="dark"?"light":"dark")} style={{background:"none",border:`1px solid ${th.border}`,borderRadius:0,color:th.muted,fontSize:14,padding:"5px 12px",cursor:"pointer"}}>
        {themeMode==="dark"?"☽":"☀"}
      </button>
    </div>
  );
}

const Sc=(th)=>({minHeight:"100vh",background:th.bg,color:th.text,padding:"22px 20px 18px",fontFamily:"-apple-system,'Segoe UI',sans-serif",boxSizing:"border-box",display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"});
const Bp=(th,bg)=>({width:"100%",padding:"14px",border:"none",borderRadius:0,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"0.05em",background:bg||th.love,fontFamily:"inherit"});
const Bs=(th)=>({width:"100%",padding:"13px",border:`1px solid ${th.border}`,borderRadius:0,background:"transparent",color:th.muted,fontSize:13,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.04em"});
const DemTag=(th,t)=>({textAlign:"center",fontSize:10,color:th.dim,marginTop:16,letterSpacing:"0.06em",fontFamily:"serif"});

// ─── SCREENS ─────────────────────────────────────────────────────────────────
function Welcome({t,th,lang,setLang,themeMode,setThemeMode,savedSession,onStart,onRestore}){
  const colors=[th.love,th.skill,th.value,th.world];
  return(
    <div style={Sc(th)}>
      <TopBar {...{lang,setLang,themeMode,setThemeMode,th}}/>
      <div style={{flex:1}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{fontSize:11,letterSpacing:"0.25em",color:th.muted,fontFamily:"serif",marginBottom:4}}>生き甲斐</div>
          <h1 style={{fontSize:42,fontWeight:900,margin:0,letterSpacing:"-1px",fontFamily:"Georgia,serif",color:th.text,lineHeight:1.05}}>IKIGAI</h1>
          <div style={{width:40,height:1,background:th.dim,margin:"12px auto 10px"}}/>
          <div style={{fontSize:13,color:th.muted,letterSpacing:"0.08em"}}>{t.tagline}</div>
        </div>
        <IkigaiSVG filled={[]} t={t} th={th}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,margin:"20px 0"}}>
          {t.ql.map((q,i)=>(
            <div key={i} style={{background:th.card,border:`1px solid ${th.border}`,borderLeft:`2px solid ${colors[i]}`,padding:"10px 12px",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:22,fontFamily:"serif",color:colors[i],fontWeight:900,lineHeight:1}}>{q.kanji}</span>
              <div>
                <div style={{fontSize:8,fontWeight:800,color:colors[i],letterSpacing:"0.12em"}}>{q.tag}</div>
                <div style={{fontSize:11,color:th.muted,marginTop:1,lineHeight:1.3}}>{q.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",fontSize:12,color:th.muted,marginBottom:20}}>✦ 15 questions · ✦ 10 min</div>
      </div>
      {savedSession&&(
        <div style={{background:th.card,border:`1px solid ${th.dem}`,padding:"14px 16px",marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:800,color:th.dem,letterSpacing:"0.1em",marginBottom:8}}>{t.saved_session}</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={onRestore} style={{...Bp(th,th.dem),flex:1,fontSize:13}}>{t.continue_session}</button>
            <button onClick={onStart} style={{...Bs(th),flex:"0 0 90px",fontSize:12}}>{t.new_session}</button>
          </div>
        </div>
      )}
      {!savedSession&&<button onClick={onStart} style={Bp(th)}>{t.start}</button>}
      <div style={DemTag(th,t)}>{t.powered} <span style={{color:th.dem,fontWeight:700}}>DemN</span></div>
    </div>
  );
}

function QuestionScreen({t,th,lang,setLang,themeMode,setThemeMode,qi,qnum,doneQ,input,onChange,onNext,onBack,justSaved}){
  const colors=[th.love,th.skill,th.value,th.world];
  const qC=colors[qi]; const ql=t.ql[qi];
  const prog=Math.round((doneQ/TOTAL_Q)*100);
  const isLast=qi===3&&qnum===TOTALS[3]-1;
  return(
    <div style={Sc(th)}>
      <TopBar {...{lang,setLang,themeMode,setThemeMode,th}}/>
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:th.muted,marginBottom:6}}>
          <span style={{color:qC,fontFamily:"serif",fontSize:18,fontWeight:900,lineHeight:1}}>{ql.kanji}</span>
          <span style={{display:"flex",alignItems:"center",gap:6}}>
            {justSaved&&<span style={{fontSize:10,color:th.muted,fontStyle:"italic"}}>{t.saved}</span>}
            {doneQ+1} {t.of} {TOTAL_Q}
          </span>
        </div>
        <div style={{height:1,background:th.dim}}><div style={{height:"100%",width:`${prog}%`,background:qC,transition:"width 0.4s ease"}}/></div>
        <div style={{display:"flex",gap:4,marginTop:6}}>
          {[0,1,2,3].map(i=><div key={i} style={{flex:i===2?0.75:1,height:2,background:i<qi?colors[i]:i===qi?qC:th.dim,opacity:i<=qi?1:0.28,transition:"all 0.3s"}}/>)}
        </div>
      </div>
      <div style={{marginBottom:14,opacity:0.65}}><IkigaiSVG filled={[...Array.from({length:qi},(_,i)=>i),qi]} t={t} th={th}/></div>
      <div style={{background:th.card,border:`1px solid ${th.border}`,borderLeft:`2px solid ${qC}`,padding:"16px",marginBottom:12}}>
        <div style={{fontSize:9,fontWeight:800,color:qC,letterSpacing:"0.15em",marginBottom:7}}>{ql.tag} · {qnum+1}/{TOTALS[qi]}</div>
        <div style={{fontSize:15,lineHeight:1.62,color:th.text,fontFamily:"Georgia,serif"}}>{t.q[qi][qnum]}</div>
        <div style={{fontSize:11,color:th.muted,marginTop:7,fontStyle:"italic"}}>{ql.sub}</div>
      </div>
      <textarea value={input} onChange={e=>onChange(e.target.value)} placeholder="…" rows={4}
        style={{width:"100%",background:th.card,border:`1px solid ${th.border}`,borderRadius:0,padding:"13px 15px",color:th.text,fontSize:14,resize:"none",boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.7}}
        onFocus={e=>e.target.style.borderColor=qC} onBlur={e=>e.target.style.borderColor=th.border}/>
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <button onClick={onBack} style={{...Bs(th),flex:"0 0 80px"}}>{t.back}</button>
        <button onClick={onNext} disabled={!input.trim()} style={{...Bp(th,input.trim()?qC:th.dim),flex:1,cursor:input.trim()?"pointer":"not-allowed",transition:"background 0.2s"}}>{isLast?t.done:t.next}</button>
      </div>
      <div style={DemTag(th,t)}>{t.powered} <span style={{color:th.dem,fontWeight:700}}>DemN</span></div>
    </div>
  );
}

// ── STRIPE PAYMENT LINKS — replace with real URLs from Stripe Dashboard ───────
const STRIPE_BASIC = "https://buy.stripe.com/REPLACE_WITH_BASIC_LINK";
const STRIPE_VIP   = "https://buy.stripe.com/REPLACE_WITH_VIP_LINK";
const CALENDLY_VIP = "https://calendly.com/REPLACE_WITH_YOUR_LINK";

function GateScreen({t,th,lang,setLang,themeMode,setThemeMode,onSubmit}){
  const [email,setEmail]=useState("");
  const [err,setErr]=useState(false);

  function pick(tier){
    if(!email.includes("@")){ setErr(true); return; }
    setErr(false);
    if(tier==="free"){ onSubmit(email,"free"); return; }
    // For paid tiers: open Stripe in new tab, then return user to free results
    // Full verification via webhook comes in Phase 2
    const url = tier==="basic"
      ? `${STRIPE_BASIC}?prefilled_email=${encodeURIComponent(email)}&client_reference_id=basic`
      : `${STRIPE_VIP}?prefilled_email=${encodeURIComponent(email)}&client_reference_id=vip`;
    window.open(url,"_blank");
    onSubmit(email, tier);
  }

  const tiers=[
    {
      id:"free", price:"Free", badge:null,
      title: lang==="es"?"Descubrir":lang==="ja"?"発見":"Discover",
      items: lang==="es"
        ? ["Diagrama IKIGAI en pantalla","Tu frase IKIGAI","Acceso básico"]
        : lang==="ja"
        ? ["生き甲斐の図","一言IKIGAI","基本アクセス"]
        : ["IKIGAI diagram on screen","Your IKIGAI Statement","Basic access"],
      cta: lang==="es"?"Continuar gratis →":lang==="ja"?"無料で続ける →":"Continue Free →",
      color:th.muted, border:th.border, ctaBg:"transparent", ctaColor:th.muted, ctaBorder:`1px solid ${th.border}`
    },
    {
      id:"basic", price:"$6.99", badge: lang==="es"?"MÁS POPULAR":lang==="ja"?"人気No.1":"MOST POPULAR",
      title: lang==="es"?"IKIGAI PDF":lang==="ja"?"IKIGAI PDF":"IKIGAI PDF",
      items: lang==="es"
        ? ["Todo lo de Gratis","Análisis IA completo (5 secciones)","PDF descargable de 4 páginas","Tuyo para siempre"]
        : lang==="ja"
        ? ["無料版すべて","AIビジネス分析（5項目）","4ページPDFダウンロード","永久保存"]
        : ["Everything in Free","Full AI analysis (5 sections)","4-page downloadable PDF","Yours forever"],
      cta: lang==="es"?"Obtener mi PDF →":lang==="ja"?"PDFを取得 →":"Get My PDF →",
      color:th.value, border:th.value, ctaBg:th.value, ctaColor:"#fff", ctaBorder:"none"
    },
    {
      id:"vip", price:"$39", badge: lang==="es"?"VIP":lang==="ja"?"VIP":"VIP",
      title: lang==="es"?"IKIGAI VIP":lang==="ja"?"IKIGAI VIP":"IKIGAI VIP",
      items: lang==="es"
        ? ["Todo lo del PDF","Roadmap de 90 días con IA","PDF extendido (8-10 páginas)","Sesión de consultoría de 60 min","Aplicado a tu proyecto específico"]
        : lang==="ja"
        ? ["PDF版すべて","AIによる90日ロードマップ","拡張PDF（8〜10ページ）","60分コンサルティング","特定プロジェクトへの応用"]
        : ["Everything in PDF","AI 90-day Project Roadmap","Extended PDF (8-10 pages)","60-min consulting session","Applied to your specific project"],
      cta: lang==="es"?"Reservar sesión VIP →":lang==="ja"?"VIPセッションを予約 →":"Book VIP Session →",
      color:th.love, border:th.love, ctaBg:th.love, ctaColor:"#fff", ctaBorder:"none"
    },
  ];

  return(
    <div style={Sc(th)}>
      <TopBar {...{lang,setLang,themeMode,setThemeMode,th}}/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:28,fontFamily:"serif",color:th.muted,marginBottom:4}}>生き甲斐</div>
        <h2 style={{fontSize:20,fontWeight:900,margin:"0 0 8px",fontFamily:"Georgia,serif"}}>{t.gate_title}</h2>
        <p style={{fontSize:13,color:th.muted,margin:0,lineHeight:1.6}}>{t.gate_sub}</p>
      </div>

      {/* Email input — shared for all tiers */}
      <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr(false);}}
        placeholder="your@email.com"
        style={{width:"100%",background:th.card,border:`1px solid ${err?th.love:th.border}`,borderRadius:0,padding:"13px 15px",color:th.text,fontSize:14,boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginBottom:err?4:14}}
        onFocus={e=>e.target.style.borderColor=th.dem} onBlur={e=>e.target.style.borderColor=err?th.love:th.border}
      />
      {err&&<div style={{fontSize:11,color:th.love,marginBottom:12}}>Please enter a valid email address.</div>}

      {/* Tier cards */}
      {tiers.map(tier=>(
        <div key={tier.id} style={{background:th.card,border:`1px solid ${tier.border}`,padding:"14px 16px",marginBottom:10,position:"relative"}}>
          {tier.badge&&<div style={{position:"absolute",top:-9,right:14,background:tier.color,padding:"2px 10px",fontSize:8,fontWeight:800,letterSpacing:"0.12em",color:"#fff"}}>{tier.badge}</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:800,color:tier.color,letterSpacing:"0.06em"}}>{tier.title}</div>
            <div style={{fontSize:18,fontWeight:900,color:th.text,fontFamily:"Georgia,serif"}}>{tier.price}</div>
          </div>
          <ul style={{margin:"0 0 12px",paddingLeft:16,fontSize:12,color:th.muted,lineHeight:1.8}}>
            {tier.items.map((item,i)=><li key={i}>{item}</li>)}
          </ul>
          <button onClick={()=>pick(tier.id)} style={{
            width:"100%",padding:"12px",border:tier.ctaBorder,borderRadius:0,
            background:tier.ctaBg,color:tier.ctaColor,
            fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.04em"
          }}>{tier.cta}</button>
        </div>
      ))}

      <div style={{textAlign:"center",fontSize:10,color:th.dim,marginTop:4}}>{t.gate_legal}</div>
      <div style={DemTag(th,t)}>{t.powered} <span style={{color:th.dem,fontWeight:700}}>DemN</span></div>
    </div>
  );
}

function GeneratingScreen({t,th}){
  const [dots,setDots]=useState("·");
  useEffect(()=>{const i=setInterval(()=>setDots(d=>d.length>3?"·":d+"·"),500);return()=>clearInterval(i);},[]);
  return(
    <div style={{...Sc(th),alignItems:"center",justifyContent:"center",textAlign:"center"}}>
      <div style={{fontSize:42,marginBottom:16,fontFamily:"serif",color:th.muted}}>生き甲斐</div>
      <div style={{width:48,height:1,background:th.dim,margin:"0 auto 20px"}}/>
      <div style={{fontSize:15,color:th.text,fontFamily:"Georgia,serif",marginBottom:6}}>{t.generating}</div>
      <div style={{fontSize:22,color:th.dem,letterSpacing:"0.3em",height:32}}>{dots}</div>
      <div style={{fontSize:12,color:th.muted,marginTop:8}}>{t.gen_sub}</div>
      <div style={{marginTop:48,fontSize:10,color:th.dim,fontFamily:"serif"}}>DemN</div>
    </div>
  );
}

function ResultsScreen({t,th,lang,setLang,themeMode,setThemeMode,answers,analysis,email,onRestart,onDownload,downloading}){
  const colors=[th.love,th.skill,th.value,th.world];
  const secs=analysis?[
    {h:"IKIGAI STATEMENT",txt:analysis.ikigai_statement,ci:0},
    {h:"CORE BUSINESS ANGLE",txt:analysis.core_angle,ci:1},
    {h:"#1 UNTAPPED OPPORTUNITY",txt:analysis.opportunity,ci:2},
    {h:"30-DAY FIRST MOVE",txt:analysis.first_move,ci:3},
    {h:"DEVIL'S ADVOCATE",txt:analysis.warning,ci:0},
  ]:[];
  return(
    <div style={Sc(th)}>
      <TopBar {...{lang,setLang,themeMode,setThemeMode,th}}/>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:9,letterSpacing:"0.2em",color:th.muted}}>IKIGAI COMPLETE</div>
        <h2 style={{fontSize:20,fontWeight:900,margin:"4px 0",fontFamily:"Georgia,serif"}}>{t.tagline}</h2>
      </div>
      <IkigaiSVG filled={[0,1,2,3]} t={t} th={th}/>
      <button onClick={onDownload} disabled={downloading} style={{...Bp(th,downloading?th.dim:th.dem),marginTop:16,marginBottom:16}}>
        {downloading?"⏳ Generating PDF…":t.download}
      </button>
      {secs.length>0&&(
        <div style={{background:th.card,border:`1px solid ${th.border}`,borderLeft:`2px solid ${th.dem}`,padding:"16px",marginBottom:14}}>
          <div style={{fontSize:9,fontWeight:800,color:th.dem,letterSpacing:"0.14em",marginBottom:12}}>AI BUSINESS ANALYSIS</div>
          {secs.map((s,i)=>s.txt&&(
            <div key={i} style={{marginBottom:i<secs.length-1?14:0}}>
              <div style={{fontSize:8.5,fontWeight:800,color:colors[s.ci]||th.dem,letterSpacing:"0.1em",marginBottom:3}}>{s.h}</div>
              <div style={{fontSize:13,color:th.text,lineHeight:1.68,fontFamily:"Georgia,serif"}}>{s.txt}</div>
            </div>
          ))}
        </div>
      )}
      {t.ql.map((ql,qi)=>(
        <div key={qi} style={{background:th.card,border:`1px solid ${th.border}`,borderLeft:`2px solid ${colors[qi]}`,padding:"14px 16px",marginBottom:10}}>
          <div style={{fontSize:9,fontWeight:800,color:colors[qi],letterSpacing:"0.12em",marginBottom:10}}>{ql.kanji} · {ql.label.toUpperCase()}</div>
          {t.q[qi].map((q,qn)=>{
            const a=answers[qi][qn]; if(!a) return null;
            return(
              <div key={qn} style={{marginBottom:qn<t.q[qi].length-1?10:0}}>
                <div style={{fontSize:11,color:th.muted,marginBottom:2,lineHeight:1.4}}>{q}</div>
                <div style={{fontSize:13,color:th.text,lineHeight:1.62,fontFamily:"Georgia,serif"}}>{a}</div>
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={onDownload} disabled={downloading} style={{...Bs(th),marginBottom:6}}>{t.download_again}</button>
      <button onClick={onRestart} style={{...Bs(th),marginBottom:4}}>{t.restart}</button>
      <div style={DemTag(th,t)}>{t.powered} <span style={{color:th.dem,fontWeight:700}}>DemN</span></div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [lang,setLang]=useState("en");
  const [themeMode,setThemeMode]=useState("dark");
  const [phase,setPhase]=useState("welcome"); // welcome|q|gate|generating|results
  const [qi,setQi]=useState(0); const [qnum,setQnum]=useState(0);
  const [answers,setAnswers]=useState([Array(4).fill(""),Array(4).fill(""),Array(3).fill(""),Array(4).fill("")]);
  const [input,setInput]=useState("");
  const [email,setEmail]=useState("");
  const [analysis,setAnalysis]=useState(null);
  const [savedSession,setSavedSession]=useState(null);
  const [justSaved,setJustSaved]=useState(false);
  const [downloading,setDownloading]=useState(false);

  const th=TH[themeMode]||TH.dark;
  const t=TR[lang]||TR.en;

  // System theme detection
  useEffect(()=>{
    const mq=window.matchMedia("(prefers-color-scheme: light)");
    setThemeMode(mq.matches?"light":"dark");
    const h=(e)=>setThemeMode(e.matches?"light":"dark");
    mq.addEventListener("change",h); return()=>mq.removeEventListener("change",h);
  },[]);

  // Load session on mount
  useEffect(()=>{
    const s=SS.load();
    if(s){ setSavedSession(s); if(s.lang) setLang(s.lang); }
  },[]);

  // Auto-save on every answer change
  useEffect(()=>{
    if(phase==="q"){
      SS.save({answers,qi,qnum,lang,themeMode});
      setJustSaved(true);
      const t=setTimeout(()=>setJustSaved(false),1500);
      return()=>clearTimeout(t);
    }
  },[answers,qi,qnum]);

  const doneQ=TOTALS.slice(0,qi).reduce((a,b)=>a+b,0)+qnum;

  function saveAndNext(){
    const upd=answers.map(r=>[...r]); upd[qi][qnum]=input; setAnswers(upd);
    if(qnum<TOTALS[qi]-1){ setQnum(qnum+1); setInput(upd[qi][qnum+1]); }
    else if(qi<3){ setQi(qi+1); setQnum(0); setInput(upd[qi+1][0]); }
    else{ setPhase("gate"); }
  }
  function goBack(){
    if(qnum>0){ setQnum(qnum-1); setInput(answers[qi][qnum-1]); }
    else if(qi>0){ setQi(qi-1); const pn=TOTALS[qi-1]-1; setQnum(pn); setInput(answers[qi-1][pn]); }
    else{ setPhase("welcome"); }
  }
  function startFresh(){ SS.clear(); setSavedSession(null); setAnswers([Array(4).fill(""),Array(4).fill(""),Array(3).fill(""),Array(4).fill("")]); setQi(0); setQnum(0); setInput(""); setPhase("q"); }
  function restoreSession(){ const s=SS.load(); if(!s) return; setAnswers(s.answers); setQi(s.qi); setQnum(s.qnum); setInput(s.answers[s.qi]?.[s.qnum]||""); setPhase("q"); }

  async function handleGateSubmit(em){
    setEmail(em); setPhase("generating");
    const blocks=t.ql.map((ql,i)=>
      `[${ql.label.toUpperCase()}]\n`+t.q[i].map((q,j)=>`Q: ${q}\nA: ${answers[i][j]||"(no answer)"}`).join("\n\n")
    ).join("\n\n");
    const prompt=`You are an executive coach. Analyze this IKIGAI discovery interview.\n\n${blocks}\n\nRespond ONLY with a valid JSON object (no markdown, no code fences):\n{\n"ikigai_statement":"One precise sentence about this person's unique reason for being (max 25 words)",\n"love_essence":"Core insight for LOVE quadrant (max 12 words)",\n"skill_essence":"Core insight for SKILL quadrant (max 12 words)",\n"world_essence":"Core insight for WORLD quadrant (max 12 words)",\n"value_essence":"Core insight for VALUE quadrant (max 12 words)",\n"core_angle":"Strongest business positioning and who the customer is (2-3 sentences)",\n"opportunity":"Most overlooked untapped opportunity from their skills (2-3 sentences)",\n"first_move":"One concrete 30-day action to generate income (2-3 sentences)",\n"warning":"The #1 risk or blind spot that could undermine their success (2-3 sentences)"\n}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=(data.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(text);
      setAnalysis(parsed);
    }catch(e){ setAnalysis({ikigai_statement:"Analysis unavailable.",core_angle:"",opportunity:"",first_move:"",warning:""}); }
    SS.clear();
    setPhase("results");
  }

  async function handleDownload(){
    setDownloading(true);
    try{ await buildPDF(answers,analysis,email,t); }catch(e){ alert("PDF generation failed. Please try again."); }
    setDownloading(false);
  }

  function restart(){ setSavedSession(null); setAnswers([Array(4).fill(""),Array(4).fill(""),Array(3).fill(""),Array(4).fill("")]); setQi(0); setQnum(0); setInput(""); setEmail(""); setAnalysis(null); setPhase("welcome"); }

  const shared={t,th,lang,setLang,themeMode,setThemeMode};

  if(phase==="welcome")    return <Welcome {...shared} savedSession={savedSession} onStart={startFresh} onRestore={restoreSession}/>;
  if(phase==="q")         return <QuestionScreen {...shared} qi={qi} qnum={qnum} doneQ={doneQ} input={input} onChange={setInput} onNext={saveAndNext} onBack={goBack} justSaved={justSaved}/>;
  if(phase==="gate")      return <GateScreen {...shared} onSubmit={handleGateSubmit}/>;
  if(phase==="generating")return <GeneratingScreen t={t} th={th}/>;
  if(phase==="results")   return <ResultsScreen {...shared} answers={answers} analysis={analysis} email={email} onRestart={restart} onDownload={handleDownload} downloading={downloading}/>;
}

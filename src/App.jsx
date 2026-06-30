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
  doc.setFont("helvetica","bold"); doc.setFont
  

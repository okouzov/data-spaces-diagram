export const iconPaths = {
  shield: "M12 2 5 5v6c0 5 3.4 9 7 11 3.6-2 7-6 7-11V5l-7-3Zm-3 10 2 2 4-5",
  database: "M4 7c0-2 3.6-4 8-4s8 2 8 4-3.6 4-8 4-8-2-8-4Zm0 0v5c0 2 3.6 4 8 4s8-2 8-4V7M4 12v5c0 2 3.6 4 8 4s8-2 8-4v-5",
  search: "M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm5.3-2.2L21 21",
  handshake: "M8 12l2-2 3 3 1-1c1.5-1.5 3.5-1.5 5 0l1 1M3 12l3-3 4 4-3 3-4-4Zm18 0-3-3-4 4 3 3 4-4ZM7 16l2 2c1.5 1.5 4.5 1.5 6 0l2-2",
  key: "M15 7a4 4 0 1 1-1.1 2.8L3 20v-4h4v-4h4l1.2-1.2A4 4 0 0 1 15 7Z",
  network: "M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm14 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-7-5v3l-5 3m5-3 5 3",
  file: "M6 2h8l4 4v16H6V2Zm8 0v5h5M9 14l2 2 4-5",
  activity: "M3 12h4l2-7 4 14 2-7h6",
  layers: "M12 2 3 7l9 5 9-5-9-5ZM3 12l9 5 9-5M3 17l9 5 9-5",
  users: "M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9m-2-11a4 4 0 0 1 0 7.8",
  sparkles: "M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm7 12 .9 2.6L22 18l-2.1 1.4L19 22l-.9-2.6L16 18l2.1-1.4L19 14ZM5 14l.9 2.6L8 18l-2.1 1.4L5 22l-.9-2.6L2 18l2.1-1.4L5 14Z",
  chevron: "M9 18l6-6-6-6",
  play: "M8 5v14l11-7-11-7Z",
  pause: "M7 5h4v14H7V5Zm6 0h4v14h-4V5Z",
  languages: "M3 5h12M9 3v2m1.6 0c-.6 3.4-3 6.2-6.6 8m2.8-5c1.1 2 2.7 3.6 4.9 4.8M13 19l4-9 4 9m-1.1-2.5h-5.8",
};

export const nodeBlueprints = {
  provider: { icon: "database", x: 15, y: 52 },
  consumer: { icon: "users", x: 85, y: 52 },
  catalog: { icon: "search", x: 50, y: 22 },
  identity: { icon: "key", x: 28, y: 20 },
  policy: { icon: "handshake", x: 72, y: 20 },
  exchange: { icon: "network", x: 50, y: 52 },
  audit: { icon: "file", x: 50, y: 78 },
  apps: { icon: "sparkles", x: 85, y: 78 },
  governance: { icon: "shield", x: 15, y: 78 },
};

export const connections = [
  ["provider", "catalog", "metadata"],
  ["consumer", "catalog", "search"],
  ["provider", "identity", "credentials"],
  ["consumer", "identity", "credentials"],
  ["provider", "policy", "offer"],
  ["consumer", "policy", "agreement"],
  ["provider", "exchange", "data/API"],
  ["exchange", "consumer", "secure data flow"],
  ["policy", "audit", "rules"],
  ["exchange", "audit", "logs"],
  ["consumer", "apps", "insights"],
  ["governance", "provider", "rules"],
  ["governance", "consumer", "rules"],
];

export const copy = {
  en: {
    languageName: "English",
    languageToggle: "BG",
    languageToggleAria: "Switch language to Bulgarian",
    badge: "Interactive diagram for multimedia presentation",
    title: "How Data Spaces Work",
    tagline:
      "A data space connects organizations through shared governance, trusted services, interoperable technology, and machine-readable usage rules.",
    diagramBadge: "Federated data ecosystem, not one central database",
    stepEyebrow: "Current step",
    play: "Play",
    pause: "Pause",
    views: {
      journey: "Data journey",
      layers: "Building blocks",
      roles: "Roles & trust",
    },
    layersEyebrow: "Layered architecture",
    layersTitle: "Data spaces are socio-technical systems",
    layersIntro:
      "The technology only works when the ecosystem has a shared operating model, legal clarity, trust services, and interoperable standards.",
    rolesTitle: "Click a role or service",
    rolesIntro:
      "Each participant keeps autonomy, while common services make the ecosystem discoverable, secure, interoperable, and auditable.",
    presenterNoteLabel: "Presenter note",
    presenterNote:
      "Emphasize sovereignty: the provider does not simply upload everything to a platform. Data is shared under controlled conditions, with trust and usage rules built into the exchange.",
    steps: [
      {
        id: 0,
        title: "1. Publish metadata",
        actor: "Provider -> Catalog",
        short: "Data stays at the source. Only metadata, quality signals, and access terms are listed.",
        detail:
          "A data provider makes datasets discoverable without centralizing everything. The catalog or broker indexes what exists, who owns it, and under which conditions it may be used.",
        icon: "search",
        accent: "from-cyan-400 to-blue-500",
        focus: ["provider", "catalog"],
      },
      {
        id: 1,
        title: "2. Discover and request",
        actor: "Consumer -> Catalog",
        short: "A participant searches for suitable data products and sends an access request.",
        detail:
          "The consumer compares available data products, checks vocabulary, quality, provenance, and usage conditions, then requests access through a connector or marketplace interface.",
        icon: "database",
        accent: "from-violet-400 to-indigo-500",
        focus: ["consumer", "catalog"],
      },
      {
        id: 2,
        title: "3. Verify trust",
        actor: "Identity, credentials, compliance",
        short: "Participants prove who they are and whether they satisfy the data space rules.",
        detail:
          "Trust services verify identities, roles, certifications, credentials, and compliance requirements before data can move between organizations.",
        icon: "key",
        accent: "from-amber-300 to-orange-500",
        focus: ["identity", "provider", "consumer"],
      },
      {
        id: 3,
        title: "4. Negotiate contract",
        actor: "Policies -> Usage contract",
        short: "Access, purpose, retention, geography, price, and onward-sharing limits are agreed.",
        detail:
          "A data usage policy becomes a machine-readable agreement. It can define who may use the data, for what purpose, for how long, and with what obligations.",
        icon: "handshake",
        accent: "from-emerald-300 to-teal-500",
        focus: ["policy", "provider", "consumer"],
      },
      {
        id: 4,
        title: "5. Exchange securely",
        actor: "Connector <-> Connector",
        short: "Data flows peer-to-peer through trusted connectors, APIs, or processing environments.",
        detail:
          "The data space does not need one giant central database. Connectors enforce security, interoperability, logging, and policy checks at the edge of each participant's system.",
        icon: "network",
        accent: "from-sky-400 to-cyan-500",
        focus: ["provider", "consumer", "exchange"],
      },
      {
        id: 5,
        title: "6. Enforce usage and audit",
        actor: "Usage control plus logs",
        short: "Rules travel with the data; activity is logged for accountability.",
        detail:
          "Usage control and audit services help ensure that the consumer follows the agreed contract after access is granted, including retention, aggregation, sharing, and deletion rules.",
        icon: "file",
        accent: "from-rose-300 to-pink-500",
        focus: ["audit", "policy", "consumer"],
      },
      {
        id: 6,
        title: "7. Create value",
        actor: "Apps, AI, services, dashboards",
        short: "Participants combine trusted data into products, insights, and new services.",
        detail:
          "The outcome is not just data transfer. It is a trusted ecosystem where organizations can build analytics, AI, digital twins, public services, and cross-sector innovation.",
        icon: "sparkles",
        accent: "from-fuchsia-400 to-purple-600",
        focus: ["apps", "consumer", "provider"],
      },
    ],
    nodes: {
      provider: { label: "Data Provider", subtitle: "owns or supplies data" },
      consumer: { label: "Data Consumer", subtitle: "uses data under terms" },
      catalog: { label: "Catalog / Broker", subtitle: "metadata discovery" },
      identity: { label: "Identity and Trust", subtitle: "credentials, certification" },
      policy: { label: "Policy and Contract", subtitle: "usage rules plus obligations" },
      exchange: { label: "Secure Exchange", subtitle: "connector to connector" },
      audit: { label: "Usage Control and Audit", subtitle: "logs, enforcement, proof" },
      apps: { label: "Value Creation", subtitle: "AI, dashboards, services" },
      governance: { label: "Governance Framework", subtitle: "shared rules, standards, roles" },
    },
    roleDescriptions: {
      provider:
        "Publishes data products, defines usage policies, keeps custody of source systems, and grants access under agreed terms.",
      consumer:
        "Discovers data, proves eligibility, accepts obligations, and uses data for approved purposes such as analytics, AI, or service delivery.",
      catalog:
        "Makes datasets findable by storing metadata, vocabularies, quality information, policy summaries, and provider contacts.",
      identity:
        "Verifies participants, roles, credentials, certifications, and trust marks before sensitive data or services are accessed.",
      policy:
        "Turns human agreements into enforceable, machine-readable rules about purpose, retention, access, sharing, price, and obligations.",
      exchange:
        "Moves data or computation securely between participants through connectors, APIs, secure processing environments, or controlled data services.",
      audit:
        "Records activity, checks compliance, supports dispute resolution, and provides evidence that rules were followed.",
      apps:
        "Transforms trusted data into services, dashboards, AI models, decision support, digital twins, and cross-sector innovation.",
      governance:
        "Defines ecosystem rules: participation, standards, roles, legal basis, operating procedures, security levels, and escalation paths.",
    },
    layers: [
      {
        title: "Business and ecosystem",
        text: "Value propositions, incentives, roles, operating model, participation rules.",
        icon: "users",
      },
      {
        title: "Governance, legal and trust",
        text: "Data rights, contracts, consent, compliance, certification, accountability.",
        icon: "shield",
      },
      {
        title: "Functional services",
        text: "Catalogs, identity, policy negotiation, billing, audit, consent, marketplaces.",
        icon: "layers",
      },
      {
        title: "Technical interoperability",
        text: "Connectors, APIs, vocabularies, semantic models, secure exchange, monitoring.",
        icon: "network",
      },
    ],
    buildingBlocks: [
      ["Governance envelope", "Shared rules define who can join, what is allowed, and how disputes or misuse are handled."],
      ["Federated services", "Catalog, identity, policy, consent, logging, billing, and monitoring services coordinate the ecosystem."],
      ["Participant edge", "Each participant keeps control of its own systems and uses connectors/APIs to interact with others."],
      ["Data products", "Datasets are packaged with metadata, semantics, quality, provenance, and usage policies."],
    ],
  },
  bg: {
    languageName: "Български",
    languageToggle: "EN",
    languageToggleAria: "Превключване на езика към английски",
    badge: "Интерактивна диаграма за мултимедийна презентация",
    title: "Как работят пространствата за данни",
    tagline:
      "Пространството за данни свързва организации чрез общо управление, услуги на доверие, оперативна съвместимост и машинно четими правила за използване.",
    diagramBadge: "Федеративна екосистема от данни, не една централна база",
    stepEyebrow: "Текуща стъпка",
    play: "Пускане",
    pause: "Пауза",
    views: {
      journey: "Движение на данните",
      layers: "Градивни елементи",
      roles: "Роли и доверие",
    },
    layersEyebrow: "Слоеста архитектура",
    layersTitle: "Пространствата за данни са социално-технически системи",
    layersIntro:
      "Технологията работи добре само когато екосистемата има общ модел на работа, правна яснота, услуги на доверие и съвместими стандарти.",
    rolesTitle: "Изберете роля или услуга",
    rolesIntro:
      "Всеки участник запазва автономия, а общите услуги правят екосистемата откриваема, сигурна, съвместима и проверима.",
    presenterNoteLabel: "Бележка за презентатора",
    presenterNote:
      "Подчертайте суверенитета: доставчикът не качва всичко в една платформа. Данните се споделят при контролирани условия, с доверие и правила за използване, вградени в обмена.",
    steps: [
      {
        id: 0,
        title: "1. Публикуване на метаданни",
        actor: "Доставчик -> Каталог",
        short: "Данните остават при източника. Публикуват се само метаданни, качество и условия за достъп.",
        detail:
          "Доставчикът прави наборите от данни откриваеми, без да ги централизира. Каталогът или брокерът индексира какво съществува, кой го притежава и при какви условия може да се използва.",
        icon: "search",
        accent: "from-cyan-400 to-blue-500",
        focus: ["provider", "catalog"],
      },
      {
        id: 1,
        title: "2. Откриване и заявка",
        actor: "Потребител -> Каталог",
        short: "Участник търси подходящи продукти от данни и изпраща заявка за достъп.",
        detail:
          "Потребителят сравнява наличните продукти от данни, проверява речници, качество, произход и условия за използване, след което заявява достъп чрез конектор или пазарен интерфейс.",
        icon: "database",
        accent: "from-violet-400 to-indigo-500",
        focus: ["consumer", "catalog"],
      },
      {
        id: 2,
        title: "3. Валидация на доверителността",
        actor: "Идентичност, удостоверения, съответствие",
        short: "Участниците доказват кои са и дали покриват правилата на пространството за данни.",
        detail:
          "Услугите на доверие проверяват идентичност, роли, сертификати, удостоверения и изисквания за съответствие, преди данните да се движат между организации.",
        icon: "key",
        accent: "from-amber-300 to-orange-500",
        focus: ["identity", "provider", "consumer"],
      },
      {
        id: 3,
        title: "4. Процес на договаряне",
        actor: "Политики -> Договор за използване",
        short: "Договарят се достъп, цел, срок, география, цена и ограничения за последващо споделяне.",
        detail:
          "Политиката за използване на данни се превръща в машинно четимо споразумение. То може да определя кой, за каква цел, колко дълго и при какви задължения използва данните.",
        icon: "handshake",
        accent: "from-emerald-300 to-teal-500",
        focus: ["policy", "provider", "consumer"],
      },
      {
        id: 4,
        title: "5. Сигурен обмен",
        actor: "Конектор <-> Конектор",
        short: "Данните текат директно през доверени конектори, API или контролирани среди за обработка.",
        detail:
          "Пространството за данни не изисква една огромна централна база. Конекторите прилагат сигурност, съвместимост, логване и проверки на политиките в края на системата на всеки участник.",
        icon: "network",
        accent: "from-sky-400 to-cyan-500",
        focus: ["provider", "consumer", "exchange"],
      },
      {
        id: 5,
        title: "6. Контрол и одит",
        actor: "Контрол на използването плюс логове",
        short: "Правилата пътуват с данните, а действията се логват за отчетност.",
        detail:
          "Контролът на използването и одитните услуги помагат да се гарантира, че потребителят спазва договора след предоставяне на достъп, включително правила за срок, агрегиране, споделяне и изтриване.",
        icon: "file",
        accent: "from-rose-300 to-pink-500",
        focus: ["audit", "policy", "consumer"],
      },
      {
        id: 6,
        title: "7. Създаване на стойност",
        actor: "Приложения, AI, услуги, табла",
        short: "Участниците комбинират доверени данни в продукти, прозрения и нови услуги.",
        detail:
          "Резултатът не е просто прехвърляне на данни. Това е доверена екосистема, в която организациите изграждат анализи, AI, дигитални двойници, публични услуги и междусекторни иновации.",
        icon: "sparkles",
        accent: "from-fuchsia-400 to-purple-600",
        focus: ["apps", "consumer", "provider"],
      },
    ],
    nodes: {
      provider: { label: "Доставчик на данни", subtitle: "притежава или предоставя данни" },
      consumer: { label: "Потребител на данни", subtitle: "използва данни при условия" },
      catalog: { label: "Каталог / Брокер", subtitle: "откриване чрез метаданни" },
      identity: { label: "Идентичност и доверие", subtitle: "удостоверения, сертификация" },
      policy: { label: "Политики и договори", subtitle: "правила плюс задължения" },
      exchange: { label: "Сигурен обмен", subtitle: "конектор към конектор" },
      audit: { label: "Контрол и одит", subtitle: "логове, изпълнение, доказателства" },
      apps: { label: "Създаване на стойност", subtitle: "AI, табла, услуги" },
      governance: { label: "Рамка за управление", subtitle: "общи правила, стандарти, роли" },
    },
    roleDescriptions: {
      provider:
        "Публикува продукти от данни, задава политики за използване, пази контрола върху източниците и дава достъп при договорени условия.",
      consumer:
        "Открива данни, доказва право на достъп, приема задължения и използва данните за одобрени цели като анализи, AI или услуги.",
      catalog:
        "Прави наборите от данни откриваеми чрез метаданни, речници, информация за качество, резюмета на политики и контакти на доставчици.",
      identity:
        "Проверява участници, роли, удостоверения, сертификати и знаци на доверие преди достъп до чувствителни данни или услуги.",
      policy:
        "Превръща човешките договорки в изпълними машинно четими правила за цел, срок, достъп, споделяне, цена и задължения.",
      exchange:
        "Премества данни или изчисления сигурно между участници чрез конектори, API, защитени среди за обработка или контролирани услуги.",
      audit:
        "Записва активност, проверява съответствие, подпомага разрешаване на спорове и предоставя доказателства, че правилата са спазени.",
      apps:
        "Превръща доверени данни в услуги, табла, AI модели, подкрепа за решения, дигитални двойници и междусекторни иновации.",
      governance:
        "Определя правилата на екосистемата: участие, стандарти, роли, правно основание, процедури, нива на сигурност и ескалация.",
    },
    layers: [
      {
        title: "Бизнес и екосистема",
        text: "Стойностни предложения, стимули, роли, модел на работа, правила за участие.",
        icon: "users",
      },
      {
        title: "Управление, право и доверие",
        text: "Права върху данни, договори, съгласие, съответствие, сертификация, отчетност.",
        icon: "shield",
      },
      {
        title: "Функционални услуги",
        text: "Каталози, идентичност, договаряне на политики, плащания, одит, съгласие, пазари.",
        icon: "layers",
      },
      {
        title: "Техническа съвместимост",
        text: "Конектори, API, речници, семантични модели, сигурен обмен, мониторинг.",
        icon: "network",
      },
    ],
    buildingBlocks: [
      ["Управленска рамка", "Общите правила определят кой може да участва, какво е позволено и как се решават спорове или злоупотреби."],
      ["Федеративни услуги", "Каталог, идентичност, политики, съгласие, логване, плащания и мониторинг координират екосистемата."],
      ["Граница на участника", "Всеки участник контролира собствените си системи и използва конектори или API за взаимодействие с други."],
      ["Продукти от данни", "Наборите от данни се пакетират с метаданни, семантика, качество, произход и политики за използване."],
    ],
  },
};

export function getNodes(language) {
  return Object.fromEntries(
    Object.entries(nodeBlueprints).map(([key, blueprint]) => [
      key,
      {
        ...blueprint,
        ...copy[language].nodes[key],
      },
    ])
  );
}

export function assertDiagramData() {
  const nodeKeys = new Set(Object.keys(nodeBlueprints));
  for (const language of Object.keys(copy)) {
    const languageCopy = copy[language];
    console.assert(languageCopy.steps.length === 7, `Expected seven journey steps for ${language}.`);
    console.assert(
      languageCopy.steps.every((step) => Array.isArray(step.focus) && step.focus.length > 0),
      `Every step must focus at least one node for ${language}.`
    );
    console.assert(
      languageCopy.steps.every((step) => step.focus.every((key) => nodeKeys.has(key))),
      `Every focused node must exist for ${language}.`
    );
    console.assert(languageCopy.layers.length >= 4, `Expected at least four architecture layers for ${language}.`);
  }

  console.assert(
    connections.every(([from, to]) => nodeKeys.has(from) && nodeKeys.has(to)),
    "Every connection endpoint must exist in nodes."
  );
}

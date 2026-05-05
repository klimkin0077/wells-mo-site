export type ServiceItem = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  intro: string;
  description: string;
  price: string;
  image: string;
  highlights: string[];
  includes: string[];
  steps: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};

export type ServiceGalleryItem = {
  id: string;
  serviceSlug: ServiceItem["slug"];
  title: string;
  location: string;
  result: string;
  image: string;
};

export const siteMeta = {
  name: "WELLS-MO",
  ownerName: "WELLS-MO",
  phone: "8 (981) 666-66-70",
  phoneHref: "tel:89816666670",
  region: "Московская область",
  coverage: "Работаем по всей Московской области",
  baseLocation: "Москва, башня Федерация",
  email: "info@wells-mo.ru",
  tagline: "Чистка, ремонт и вода в доме из колодца",
  description:
    "Чистка колодцев, ремонт шахты, углубление и подводка воды в дом по всей Московской области. Реальные фото работ, понятная смета и спокойный профессиональный подход.",
} as const;

export const assets = {
  texture:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/dark-metal-water-texture-iUcpUqfm8G7AbmoCgL3vQt.webp",
  hero:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/hero-well-premium-VFi4w53A3tCJL9kUf2guKy.webp",
  cleaning:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/well-cleaning-cinematic-hYBpc8F8W9Z9oTxkboKmNW.webp",
  repair:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/well-repair-premium-TjQHxpiySMR4F2KY3nMoBA.webp",
  waterSupply:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/water-supply-house-fiuQm5sukfvefyF9WamyAo.webp",
  galleryCleaningDetail:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/gallery-cleaning-02_cc0ec886.jpeg",
  galleryRepairDetail:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/gallery-repair-02_677faca1.png",
  galleryDeepeningDetail:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/gallery-deepening-02_32aeaf84.jpeg",
  galleryWaterSupplyDetail:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663042042500/htP6tJcWEMcp6qhKGuYmV6/gallery-water-02_bdc20feb.jpg",
  userReviews: "https://wellservices-htp6tjcw.manus.space/manus-storage/reviews-real_b8f4aaf4.png",
  userBottomShield: "https://wellservices-htp6tjcw.manus.space/manus-storage/bottom-shield-installation_63fdd0fd.png",
  userAfterWashing: "https://wellservices-htp6tjcw.manus.space/manus-storage/after-washing_c921d0c4.png",
  userLogo: "https://wellservices-htp6tjcw.manus.space/manus-storage/site-logo-round_8fff2fa5.png",
  userGravelBackfill: "https://wellservices-htp6tjcw.manus.space/manus-storage/gravel-washing-backfill_8ab3f108.png",
  userCurrentJointProblem: "https://wellservices-htp6tjcw.manus.space/manus-storage/current-joint-problem_4ced24f1.png",
  userShiftedRingRepair: "https://wellservices-htp6tjcw.manus.space/manus-storage/shifted-ring-repair_67c5034b.png",
  userShaftWashing: "https://wellservices-htp6tjcw.manus.space/manus-storage/shaft-washing_a169e4ad.png",
  userFinishedWell: "https://wellservices-htp6tjcw.manus.space/manus-storage/finished-well_7b5c4ebe.png",
  userJointWaterproofing: "https://wellservices-htp6tjcw.manus.space/manus-storage/joint-waterproofing_5d4e4f5b.png",
  userWellCleaningMain: "https://wellservices-htp6tjcw.manus.space/manus-storage/well-cleaning-main_539a53ac.png",
  userShaftDiagnostics: "https://wellservices-htp6tjcw.manus.space/manus-storage/shaft-diagnostics_66073b34.png",
  userAvitoDmitriy: "https://wellservices-htp6tjcw.manus.space/manus-storage/dmitriy-avito-review_dae62156.png",
  userAvitoOlesya: "https://wellservices-htp6tjcw.manus.space/manus-storage/olesya-avito-review_f94ec4e3.png",
  userAvitoLyubov: "https://wellservices-htp6tjcw.manus.space/manus-storage/lyubov-avito-review_6d32f7af.png",
  userAvitoUser: "https://wellservices-htp6tjcw.manus.space/manus-storage/user-avito-review_44604ce7.png",
} as const;

export const navigation = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/chistka-kolodcev", label: "Чистка" },
  { href: "/remont-kolodcev", label: "Ремонт" },
  { href: "/vodosnabzhenie-iz-kolodca-v-dom", label: "Водоснабжение" },
  { href: "/ceny", label: "Цены" },
  { href: "/nashi-raboty", label: "Работы" },
  { href: "/kontakty", label: "Контакты" },
] as const;

export const trustMetrics = [
  { value: "01", label: "Работаем по всей Московской области" },
  { value: "02", label: "Понятная смета до начала работ" },
  { value: "03", label: "Реальные фото объектов и реальные отзывы" },
  { value: "04", label: "От чистки и ремонта до воды в доме" },
] as const;

export const services: ServiceItem[] = [
  {
    slug: "chistka-kolodcev",
    eyebrow: "Обслуживание источника",
    title: "Чистка колодцев",
    shortTitle: "Чистка",
    intro:
      "Полноценная очистка шахты, удаление ила и загрязнений, проверка состояния стенок, дна и внутренних узлов.",
    description:
      "Если вода стала мутной, появился запах или на дне скопились отложения, колодцу нужна не просто откачка, а комплексная чистка. Мы приводим шахту в рабочее состояние и даём понятную картину её реального состояния.",
    price: "от 16 000 ₽",
    image: assets.userWellCleaningMain,
    highlights: [
      "Удаление ила, песка и органических отложений",
      "Очистка стенок и внутренних поверхностей",
      "Оценка швов, дна и общего состояния шахты",
      "Дезинфекция и донный фильтр по необходимости",
    ],
    includes: [
      "Осмотр перед началом работ",
      "Откачка воды и подготовка шахты",
      "Очистка стенок и дна",
      "Проверка проблемных участков и рекомендации",
    ],
    steps: [
      {
        title: "Диагностика",
        text: "Оцениваем состояние воды, шахты, швов и дна, чтобы понять реальный объём работ.",
      },
      {
        title: "Подготовка",
        text: "Откачиваем воду, подготавливаем оборудование и обеспечиваем безопасный доступ к рабочей зоне.",
      },
      {
        title: "Очистка",
        text: "Удаляем загрязнения, отложения и налёт со стенок и дна, приводим шахту в рабочее состояние.",
      },
      {
        title: "Контроль результата",
        text: "Проверяем, не нужны ли дополнительные работы, и объясняем, что важно для дальнейшей эксплуатации.",
      },
    ],
    faq: [
      {
        question: "Как понять, что колодец пора чистить?",
        answer:
          "Обычно это видно по мутности воды, запаху, осадку на дне, налёту на стенках и общему ухудшению качества воды.",
      },
      {
        question: "Можно ли ограничиться только откачкой воды?",
        answer:
          "Нет, простая откачка не устраняет загрязнения на стенках и дне, поэтому эффект будет краткосрочным.",
      },
      {
        question: "Сколько времени занимает чистка?",
        answer:
          "Срок зависит от глубины и состояния шахты. Обычно точная оценка даётся после осмотра объекта.",
      },
    ],
  },
  {
    slug: "remont-kolodcev",
    eyebrow: "Восстановление конструкции",
    title: "Ремонт колодцев",
    shortTitle: "Ремонт",
    intro:
      "Герметизация швов, укрепление колец, устранение течей и восстановление нормальной работы шахты.",
    description:
      "Когда в колодец попадает верховодка, швы расходятся, а кольца смещаются, важно не маскировать проблему, а устранить её причину. Мы выполняем ремонт аккуратно и по реальному состоянию конструкции.",
    price: "от 3 000 ₽ за шов",
    image: assets.userShiftedRingRepair,
    highlights: [
      "Герметизация и восстановление швов",
      "Скобирование и укрепление колец",
      "Устранение течей и локальных повреждений",
      "Понятная логика работ без лишних услуг",
    ],
    includes: [
      "Осмотр шахты и проблемных зон",
      "Подбор технологии восстановления",
      "Герметизация или усиление конструкции",
      "Проверка стабильности и рекомендации",
    ],
    steps: [
      {
        title: "Оценка проблемы",
        text: "Находим источник течи, деформации или смещения и определяем, какие работы действительно нужны.",
      },
      {
        title: "Подготовка зоны",
        text: "Очищаем рабочие участки, подготавливаем шахту и обеспечиваем доступ к повреждённым зонам.",
      },
      {
        title: "Ремонт",
        text: "Герметизируем швы, усиливаем конструкцию, устраняем локальные дефекты и укрепляем слабые места.",
      },
      {
        title: "Финальная проверка",
        text: "Проверяем состояние узлов после ремонта и объясняем, что важно контролировать дальше.",
      },
    ],
    faq: [
      {
        question: "Когда нужен ремонт, а не просто чистка?",
        answer:
          "Когда есть течи, смещение колец, повреждение швов и другие признаки конструктивной проблемы.",
      },
      {
        question: "Можно ли отремонтировать старый колодец?",
        answer:
          "Во многих случаях да. Всё зависит от состояния шахты и характера повреждений.",
      },
      {
        question: "Делаете ли вы герметизацию отдельно?",
        answer:
          "Да, если проблема локальная и не требует комплексного восстановления всей конструкции.",
      },
    ],
  },
  {
    slug: "uglublenie-kolodcev",
    eyebrow: "Возврат рабочего объёма",
    title: "Углубление колодцев",
    shortTitle: "Углубление",
    intro:
      "Оцениваем возможность безопасного углубления и помогаем вернуть рабочий объём воды без поспешных решений.",
    description:
      "Если уровень воды снизился, это не всегда означает, что нужен новый колодец. Мы сначала оцениваем шахту и только после этого предлагаем целесообразный вариант углубления.",
    price: "по результатам осмотра",
    image: assets.userBottomShield,
    highlights: [
      "Оценка состояния существующей шахты",
      "Подбор безопасного решения под конкретный объект",
      "Честный подход без обещаний до осмотра",
      "Работа с учётом грунта и конструкции",
    ],
    includes: [
      "Осмотр и анализ текущего состояния",
      "Определение целесообразности работ",
      "Согласование технологии углубления",
      "Контроль состояния после выполнения",
    ],
    steps: [
      {
        title: "Осмотр",
        text: "Изучаем конструкцию, уровень воды, сезонность проблемы и состояние шахты.",
      },
      {
        title: "Решение",
        text: "Объясняем, подходит ли углубление для объекта и какие ограничения нужно учитывать.",
      },
      {
        title: "Выполнение",
        text: "Проводим работы по согласованной технологии и контролируем безопасность конструкции.",
      },
      {
        title: "Результат",
        text: "Фиксируем итог, даём рекомендации и объясняем, как эксплуатировать колодец дальше.",
      },
    ],
    faq: [
      {
        question: "Всегда ли можно углубить колодец?",
        answer:
          "Нет, решение зависит от состояния шахты, типа грунта и общего состояния конструкции.",
      },
      {
        question: "Можно ли понять необходимость углубления без осмотра?",
        answer:
          "Нет, без оценки объекта нельзя честно определить, будет ли это решение правильным.",
      },
      {
        question: "Что если углубление не подходит?",
        answer:
          "Мы предложим другой разумный вариант, исходя из состояния объекта и вашей задачи.",
      },
    ],
  },
  {
    slug: "vodosnabzhenie-iz-kolodca-v-dom",
    eyebrow: "Инженерная система для дома",
    title: "Водоснабжение из колодца в дом",
    shortTitle: "Водоснабжение",
    intro:
      "Подбор оборудования, прокладка магистрали, ввод в дом, подключение и запуск системы подачи воды.",
    description:
      "Организуем стабильную подачу воды из колодца в частный дом или дачу. Услуга подаётся как полноценное инженерное решение: от подбора схемы до запуска и проверки системы.",
    price: "по смете",
    image: assets.waterSupply,
    highlights: [
      "Подбор схемы под дом и режим проживания",
      "Насос, автоматика, фильтрация и ввод в дом",
      "Аккуратный монтаж и понятный результат",
      "Решение для дачи и постоянного проживания",
    ],
    includes: [
      "Оценка объекта и сценария использования",
      "Подбор оборудования и конфигурации",
      "Прокладка трассы и ввод в дом",
      "Подключение, настройка и проверка системы",
    ],
    steps: [
      {
        title: "Проектирование решения",
        text: "Определяем, какая схема подходит именно вашему колодцу, дому и сценарию использования.",
      },
      {
        title: "Подбор оборудования",
        text: "Подбираем насос, автоматику, защиту и дополнительные узлы под рабочую задачу.",
      },
      {
        title: "Монтаж",
        text: "Прокладываем магистраль, выполняем ввод в дом и собираем систему как единое решение.",
      },
      {
        title: "Пуск и объяснение",
        text: "Проверяем работу системы и объясняем владельцу основные правила эксплуатации.",
      },
    ],
    faq: [
      {
        question: "Можно ли провести воду в дом из уже существующего колодца?",
        answer:
          "Да, если колодец в рабочем состоянии и его объём позволяет организовать стабильную подачу воды.",
      },
      {
        question: "Подходит ли такая система для круглогодичного проживания?",
        answer:
          "Да, если решение изначально собирается под постоянную эксплуатацию и условия объекта.",
      },
      {
        question: "Можно ли заказать только часть работ?",
        answer:
          "Да, но максимальная надёжность достигается, когда система собирается как единое инженерное решение.",
      },
    ],
  },
];

export const serviceOrder = services.map((service) => service.slug);

export const whyChooseUs = [
  {
    title: "Сначала разбираемся в проблеме",
    text: "Оцениваем состояние колодца, объясняем, что действительно нужно делать, и не раздуваем объём работ без причины.",
  },
  {
    title: "Реальные объекты вместо пустых обещаний",
    text: "Показываем настоящие процессы, готовые результаты и отзывы клиентов, чтобы решение опиралось на факты, а не на громкие слова.",
  },
  {
    title: "Закрываем задачу комплексно",
    text: "Берём в работу чистку, ремонт, углубление и подводку воды в дом, если объект требует нескольких этапов сразу.",
  },
  {
    title: "Выезд по всей Московской области",
    text: "Работаем по всей области, а базируемся в Москве, поэтому удобно выезжаем на объекты в разных направлениях региона.",
  },
] as const;

export const pricing = [
  {
    service: "Комплексная чистка колодца",
    price: "от 16 000 ₽",
    note: "Глубина шахты, состояние дна, объём загрязнений и необходимость дезинфекции",
  },
  {
    service: "Герметизация шва",
    price: "от 3 000 ₽",
    note: "Характер течи, глубина проблемного участка и объём подготовительных работ",
  },
  {
    service: "Скобирование колец",
    price: "от 1 500 ₽",
    note: "Количество точек усиления и доступ к рабочей зоне внутри шахты",
  },
  {
    service: "Донный фильтр",
    price: "от 4 000 ₽",
    note: "Материалы, толщина слоя и фактическое состояние нижней части колодца",
  },
  {
    service: "Углубление колодца",
    price: "по результатам осмотра",
    note: "После оценки конструкции, уровня воды и целесообразности работ именно на вашем объекте",
  },
  {
    service: "Подводка воды в дом",
    price: "по смете",
    note: "Длина трассы, набор оборудования, автоматика и особенности участка или дома",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Сначала разбираемся в задаче",
    text: "Вы описываете проблему, а мы уточняем симптомы, состояние колодца и формат объекта.",
  },
  {
    number: "02",
    title: "Осматриваем и объясняем решение",
    text: "После оценки объекта становится понятно, что действительно нужно делать и как формируется смета.",
  },
  {
    number: "03",
    title: "Выполняем работы аккуратно и последовательно",
    text: "От очистки и ремонта до монтажа системы воды в доме — без лишних действий и визуального хаоса.",
  },
  {
    number: "04",
    title: "Фиксируем результат",
    text: "Показываем, что сделано, и даём рекомендации по дальнейшей эксплуатации и обслуживанию.",
  },
] as const;

export const cases = [
  {
    title: "Чистка колодца после полной мойки шахты",
    location: "Истринский район",
    result: "Промыли ствол, убрали загрязнения и вернули колодцу аккуратный рабочий вид после комплексной чистки.",
    image: assets.userAfterWashing,
  },
  {
    title: "Гидроизоляция швов после локального ремонта",
    location: "Одинцовский район",
    result: "Разобрали проблемные участки, выполнили герметизацию и восстановили надёжность шахты без лишних работ.",
    image: assets.userJointWaterproofing,
  },
  {
    title: "Готовый колодец после восстановительных работ",
    location: "Раменский район",
    result: "Провели этапы очистки и доработки конструкции, после чего вывели объект в стабильное эксплуатационное состояние.",
    image: assets.userFinishedWell,
  },
] as const;

export const serviceGalleryItems: ServiceGalleryItem[] = [
  {
    id: "cleaning-01",
    serviceSlug: "chistka-kolodcev",
    title: "Основная чистка колодца перед обслуживанием",
    location: "Истринский район",
    result: "Провели ключевой этап очистки шахты и подготовили колодец к дальнейшей промывке и диагностике.",
    image: assets.userWellCleaningMain,
  },
  {
    id: "cleaning-02",
    serviceSlug: "chistka-kolodcev",
    title: "Диагностика ствола перед началом работ",
    location: "Дмитровский округ",
    result: "Проверили состояние стенок, дна и проблемных зон, чтобы собрать точный объём работ до чистки.",
    image: assets.userShaftDiagnostics,
  },
  {
    id: "cleaning-03",
    serviceSlug: "chistka-kolodcev",
    title: "Мойка шахты после откачки воды",
    location: "Солнечногорск",
    result: "Промыли внутренние поверхности и убрали остаточные загрязнения по всей рабочей высоте ствола.",
    image: assets.userShaftWashing,
  },
  {
    id: "cleaning-04",
    serviceSlug: "chistka-kolodcev",
    title: "Колодец после полной мойки и очистки",
    location: "Истра",
    result: "После завершения мойки шахта приобрела аккуратный вид, а состояние объекта стало понятным для дальнейшей эксплуатации.",
    image: assets.userAfterWashing,
  },
  {
    id: "repair-01",
    serviceSlug: "remont-kolodcev",
    title: "Проблемный шов до начала ремонта",
    location: "Одинцово",
    result: "Зафиксировали зону дефекта и локализовали источник проблемы перед герметизацией и усилением конструкции.",
    image: assets.userCurrentJointProblem,
  },
  {
    id: "repair-02",
    serviceSlug: "remont-kolodcev",
    title: "Ремонт смещённого кольца в шахте",
    location: "Красногорск",
    result: "Восстановили геометрию ствола и устранили последствия смещения без лишней переделки всего колодца.",
    image: assets.userShiftedRingRepair,
  },
  {
    id: "repair-03",
    serviceSlug: "remont-kolodcev",
    title: "Гидроизоляция швов после восстановления",
    location: "Химки",
    result: "Загерметизировали проблемные участки и снизили риск повторного поступления верховодки в шахту.",
    image: assets.userJointWaterproofing,
  },
  {
    id: "deepening-01",
    serviceSlug: "uglublenie-kolodcev",
    title: "Спуск донного щита на рабочую глубину",
    location: "Раменский округ",
    result: "Подготовили нижнюю часть шахты и выполнили этап работ, важный для дальнейшего восстановления источника.",
    image: assets.userBottomShield,
  },
  {
    id: "deepening-02",
    serviceSlug: "uglublenie-kolodcev",
    title: "Промывка щебёнки и обратная засыпка",
    location: "Чехов",
    result: "Привели в порядок нижний слой, обновили рабочую зону и собрали устойчивое основание после вмешательства.",
    image: assets.userGravelBackfill,
  },
  {
    id: "deepening-03",
    serviceSlug: "uglublenie-kolodcev",
    title: "Готовый колодец после восстановительных этапов",
    location: "Сергиев Посад",
    result: "Зафиксировали итоговое состояние объекта после комплекса работ по стволу и нижней части шахты.",
    image: assets.userFinishedWell,
  },
  {
    id: "water-01",
    serviceSlug: "vodosnabzhenie-iz-kolodca-v-dom",
    title: "Подводка воды в дом с настройкой автоматики",
    location: "Домодедово",
    result: "Собрали линию подачи воды из колодца и подключили дом к стабильной инженерной системе.",
    image: assets.waterSupply,
  },
  {
    id: "water-02",
    serviceSlug: "vodosnabzhenie-iz-kolodca-v-dom",
    title: "Монтаж гидробака и узла давления для частного дома",
    location: "Мытищи",
    result: "Смонтировали оборудование в помещении и добились ровной подачи воды для бытовых сценариев.",
    image: assets.galleryWaterSupplyDetail,
  },
];

export const testimonials = [
  {
    quote:
      "На сайте показаны реальные отзывы и переписки клиентов после чистки, ремонта и восстановления колодцев без рекламных приукрашиваний.",
    author: "Подтверждённая обратная связь по объектам",
    image: assets.userReviews,
    alt: "Скриншот реальных отзывов клиентов WELLS-MO",
  },
  {
    quote:
      "Клиент подробно описал сложный объект с песком, течами, смещением колец и нарушенной герметизацией. В отзыве отдельно отмечены донный щит, гидроизоляция швов, обратная засыпка щебнем и очень аккуратная работа бригады.",
    author: "Дмитрий · отзыв с Avito",
    image: assets.userAvitoDmitriy,
    alt: "Отзыв Дмитрия с Avito о чистке и ремонте колодца",
  },
  {
    quote:
      "В отзыве отмечены быстрый ответ, выезд уже на следующее утро, чёткое обсуждение фронта работ, чистка колодца с дезинфекцией и аккуратная промазка текущего шва.",
    author: "Олеся · отзыв с Avito",
    image: assets.userAvitoOlesya,
    alt: "Отзыв Олеси с Avito о чистке колодца и герметизации шва",
  },
  {
    quote:
      "Клиентка позвонила поздно вечером, а на следующий день бригада уже приступила к работе. В отзыве отдельно отмечены диагностика треснувших швов, чистка с дезинфекцией, скобирование, герметизация и гарантия на выполненные работы.",
    author: "Пользователь · отзыв с Avito",
    image: assets.userAvitoUser,
    alt: "Отзыв пользователя с Avito о чистке колодца и ремонте швов",
  },
  {
    quote:
      "Нужно было не просто почистить колодец, а понять, почему вода снова быстро мутнела. Получили нормальное объяснение и понятный результат без лишних работ.",
    author: "Частный дом, Московская область",
  },
  {
    quote:
      "По ремонту всё объяснили спокойно и по делу. Видно было, что речь идёт не о продаже услуг, а о реальном состоянии шахты и нормальном решении проблемы.",
    author: "Собственник участка, Подмосковье",
  },
] as const;

export const globalFaq = [
  {
    question: "Где вы работаете и как быстро можно договориться о выезде?",
    answer:
      "Работаем по всей Московской области. Базируемся в Москве, в башне Федерация, поэтому берём заявки по разным направлениям региона и согласовываем выезд под конкретную задачу.",
  },
  {
    question: "Можно ли назвать точную цену по телефону?",
    answer:
      "Можно назвать ориентир, но точная стоимость зависит от состояния объекта, глубины, материалов и состава работ.",
  },
  {
    question: "Что лучше: чистка, ремонт или углубление?",
    answer:
      "Это определяется не по названию проблемы, а по реальному состоянию шахты. Поэтому сначала важен осмотр и диагностика.",
  },
  {
    question: "Делаете ли вы работы под ключ?",
    answer:
      "Да, можно закрыть задачу комплексно: от обслуживания и ремонта колодца до организации воды в доме.",
  },
] as const;

export type LocalSeoLocation = {
  slug: string;
  name: string;
  officialName: string;
  type: "city" | "district";
  asset: string;
  focus: string;
};

const translitMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ы: "y",
  э: "e",
  ю: "yu",
  я: "ya",
  ь: "",
  ъ: "",
};

const slugifyLocation = (value: string) =>
  value
    .toLowerCase()
    .split("")
    .map((char) => translitMap[char] ?? char)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const locationFocusPool = [
  "Выезжаем по направлению, спокойно оцениваем состояние колодца и подбираем работы под реальную ситуацию на участке.",
  "Берём в работу чистку, ремонт, восстановление конструкции и воду в доме без навязывания лишних этапов.",
  "По каждой локации сохраняем один подход: понятная смета, аккуратная работа и реальный результат по объекту.",
  "Помогаем с обслуживанием колодцев, ремонтом, углублением и монтажом водоснабжения для домов и дач.",
] as const;

const buildLocation = (
  name: string,
  officialName: string,
  type: "city" | "district",
  asset: string,
  index: number,
): LocalSeoLocation => ({
  slug: slugifyLocation(name),
  name,
  officialName,
  type,
  asset,
  focus: locationFocusPool[index % locationFocusPool.length],
});

export const citySeoLocations: LocalSeoLocation[] = [
  ["Балашиха", "Городской округ Балашиха"],
  ["Ногинск", "Богородский городской округ"],
  ["Бронницы", "Городской округ Бронницы"],
  ["Власиха", "Городской округ Власиха"],
  ["Воскресенск", "Городской округ Воскресенск"],
  ["Восход", "Городской округ Восход"],
  ["Долгопрудный", "Городской округ Долгопрудный"],
  ["Домодедово", "Городской округ Домодедово"],
  ["Дубна", "Городской округ Дубна"],
  ["Жуковский", "Городской округ Жуковский"],
  ["Звёздный городок", "Городской округ Звёздный городок"],
  ["Кашира", "Городской округ Кашира"],
  ["Клин", "Городской округ Клин"],
  ["Коломна", "Городской округ Коломна"],
  ["Королёв", "Городской округ Королёв"],
  ["Котельники", "Городской округ Котельники"],
  ["Красногорск", "Городской округ Красногорск"],
  ["Краснознаменск", "Городской округ Краснознаменск"],
  ["Видное", "Ленинский городской округ"],
  ["Лобня", "Городской округ Лобня"],
  ["Лосино-Петровский", "Городской округ Лосино-Петровский"],
  ["Лыткарино", "Городской округ Лыткарино"],
  ["Люберцы", "Городской округ Люберцы"],
  ["Молодёжный", "Городской округ Молодёжный"],
  ["Мытищи", "Городской округ Мытищи"],
  ["Наро-Фоминск", "Наро-Фоминский городской округ"],
  ["Одинцово", "Одинцовский городской округ"],
  ["Орехово-Зуево", "Орехово-Зуевский городской округ"],
  ["Павловский Посад", "Павлово-Посадский городской округ"],
  ["Подольск", "Городской округ Подольск"],
  ["Пушкино", "Городской округ Пушкинский"],
  ["Реутов", "Городской округ Реутов"],
  ["Сергиев Посад", "Сергиево-Посадский городской округ"],
  ["Серпухов", "Городской округ Серпухов"],
  ["Солнечногорск", "Городской округ Солнечногорск"],
  ["Ступино", "Городской округ Ступино"],
  ["Талдом", "Талдомский городской округ"],
  ["Фрязино", "Городской округ Фрязино"],
  ["Химки", "Городской округ Химки"],
  ["Черноголовка", "Городской округ Черноголовка"],
  ["Щёлково", "Городской округ Щёлково"],
  ["Электросталь", "Городской округ Электросталь"],
].map(([name, officialName], index) =>
  buildLocation(name, officialName, "city", index % 3 === 0 ? assets.cleaning : index % 3 === 1 ? assets.repair : assets.waterSupply, index),
);

export const districtSeoLocations: LocalSeoLocation[] = [
  ["Волоколамск", "Волоколамский муниципальный округ"],
  ["Дмитров", "Дмитровский муниципальный округ"],
  ["Егорьевск", "Муниципальный округ Егорьевск"],
  ["Зарайск", "Муниципальный округ Зарайск"],
  ["Истра", "Муниципальный округ Истра"],
  ["Лотошино", "Муниципальный округ Лотошино"],
  ["Луховицы", "Муниципальный округ Луховицы"],
  ["Можайск", "Можайский муниципальный округ"],
  ["Раменское", "Раменский муниципальный округ"],
  ["Руза", "Рузский муниципальный округ"],
  ["Серебряные Пруды", "Муниципальный округ Серебряные Пруды"],
  ["Чехов", "Муниципальный округ Чехов"],
  ["Шатура", "Муниципальный округ Шатура"],
  ["Шаховская", "Муниципальный округ Шаховская"],
].map(([name, officialName], index) =>
  buildLocation(name, officialName, "district", index % 2 === 0 ? assets.hero : assets.waterSupply, index),
);

export const featuredSeoLocations = [
  "odincovo",
  "krasnogorsk",
  "podolsk",
  "himki",
  "mytischi",
  "domodedovo",
  "istra",
  "ramenskoe",
  "dmitrov",
  "chehov",
].map((slug) => [...citySeoLocations, ...districtSeoLocations].find((item) => item.slug === slug)).filter(Boolean) as LocalSeoLocation[];

export const allSeoLocations = [...citySeoLocations, ...districtSeoLocations];

export type PriorityServiceCityPage = {
  serviceSlug: string;
  citySlug: string;
  path: string;
  title: string;
  description: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  badge: string;
  focus: string;
};

const priorityCitySlugSet = new Set([
  "odincovo",
  "krasnogorsk",
  "podolsk",
  "himki",
  "mytischi",
  "domodedovo",
]);

export const priorityServiceCities = citySeoLocations.filter((item) => priorityCitySlugSet.has(item.slug));

const cityNameInMap: Record<string, string> = {
  odincovo: "Одинцово",
  krasnogorsk: "Красногорске",
  podolsk: "Подольске",
  himki: "Химках",
  mytischi: "Мытищах",
  domodedovo: "Домодедово",
};

const getCityNameIn = (city: LocalSeoLocation) => cityNameInMap[city.slug] ?? city.name;

const serviceCityLeadMap: Record<string, string> = {
  "chistka-kolodcev": "Чистка колодцев с акцентом на состояние воды, обслуживание шахты и аккуратный выезд по объекту.",
  "remont-kolodcev": "Ремонт колодцев с фокусом на герметизацию швов, укрепление колец и спокойное объяснение технического решения.",
  "uglublenie-kolodcev": "Углубление колодцев, где важны диагностика, оценка конструкции и взвешенный подход без поспешных обещаний.",
  "vodosnabzhenie-iz-kolodca-v-dom": "Подводка воды из колодца в дом с подбором схемы и аккуратным монтажом системы.",
};

const serviceCityFocusMap: Record<string, string> = {
  "chistka-kolodcev": "Актуально, когда вода помутнела, появился запах, накопились отложения или колодцу давно не делали нормальное обслуживание.",
  "remont-kolodcev": "Нужно, когда появляются течи, расходятся швы, смещаются кольца или шахта начинает работать нестабильно.",
  "uglublenie-kolodcev": "Подходит для объектов, где упал уровень воды, изменился приток и требуется аккуратно оценить возможность углубления.",
  "vodosnabzhenie-iz-kolodca-v-dom": "Подходит владельцам домов и дач, которым нужна стабильная и понятная система подачи воды из колодца в дом.",
};

const buildPriorityServiceCityPage = (
  service: ServiceItem,
  city: LocalSeoLocation,
): PriorityServiceCityPage => {
  const cityNameIn = getCityNameIn(city);

  return {
    serviceSlug: service.slug,
    citySlug: city.slug,
    path: `/goroda/${city.slug}/${service.slug}`,
    title: `${service.title} в ${cityNameIn}`,
    description: `${service.title} в ${cityNameIn}, Московская область. ${service.intro}`,
    lead: serviceCityLeadMap[service.slug] ?? service.intro,
    seoTitle: `${service.title} в ${cityNameIn} | ${siteMeta.name}`,
    seoDescription: `${service.title} в ${cityNameIn}, Московская область. ${service.description}`,
    badge: `${city.name} · ${service.price}`,
    focus: serviceCityFocusMap[service.slug] ?? city.focus,
  };
};

export const priorityServiceCityPages = priorityServiceCities.flatMap((city) =>
  services.map((service) => buildPriorityServiceCityPage(service, city)),
);

export const featuredPriorityServiceCityPages = priorityServiceCityPages.filter(
  (page) =>
    (page.citySlug === "odincovo" && page.serviceSlug === "chistka-kolodcev") ||
    (page.citySlug === "krasnogorsk" && page.serviceSlug === "remont-kolodcev") ||
    (page.citySlug === "podolsk" && page.serviceSlug === "vodosnabzhenie-iz-kolodca-v-dom") ||
    (page.citySlug === "himki" && page.serviceSlug === "uglublenie-kolodcev"),
);

export const findPriorityServiceCityPage = (citySlug: string, serviceSlug: string) =>
  priorityServiceCityPages.find(
    (page) => page.citySlug === citySlug && page.serviceSlug === serviceSlug,
  );
